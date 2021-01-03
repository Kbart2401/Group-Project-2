import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Layer, Source, Popup } from "react-map-gl";
import Pin from './Pin';
import { useSelector } from 'react-redux';
import './Map.css';
const mbxDirections = require('@mapbox/mapbox-sdk/services/directions');
const directionsClient = mbxDirections({ accessToken: "pk.eyJ1Ijoicmh5c3A4OCIsImEiOiJja2pjMDUzYnozMzVhMzBucDAzcXBhdXdjIn0.kEXpfO6zDjp9J4QXnwzVcA" })

const CreateMap = () => {
    const [viewport, setViewport] = useState({});
    const [markers, setMarkers] = useState([])
    const [routeData, setRouteData] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const [distance, setDistance] = useState(0)
    const [selectPoint, setSelectPoint] = useState(null);
    const [names, setName] = useState([]);
    const [index, setIndex] = useState(null);
    const user = useSelector((state) => state.session.user)

    //establish viewport coordinates based on user location
    function success(pos) {
        const crd = pos.coords;
        setViewport({
            latitude: crd.latitude,
            longitude: crd.longitude,
            zoom: 13,
            width: "65vw",
            height: "65vh",
        })
    };

    function error(err) {
        alert(`ERROR(${err.code}): ${err.message}`);
    };

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(success, error);
    }, []);


    //api request to the mapbox directions with SDK JS 
    useEffect(() => {
        if (markers.length >= 2) {
            const ways = markers.map(marker => {
                return {
                    coordinates: [marker[0], marker[1]]
                }
            });
            directionsClient.getDirections({
                profile: 'walking',
                geometries: 'geojson',
                waypoints: ways
            })
                .send()
                .then(response => {
                    const route = response.body.routes[0].geometry.coordinates;
                    const dist = response.body.routes[0].distance;

                    const waypoints = response.body.waypoints;
                    let nameArr = [];
                    for (let i = 0; i < waypoints.length; i++) {
                        let name = waypoints[i].name;
                        nameArr.push(name);
                    }

                    const geojson = {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                geometry: {
                                    type: 'LineString',
                                    coordinates: route,
                                },
                            }
                        ]
                    };
                    setName(nameArr);
                    setDistance(dist);
                    setRouteData({ ...geojson });
                    setIsLoaded(true);
                });
        }
    }, [markers]);

    //click event for dropping marker on map
    function clickMarker(event) {
        setMarkers([...markers,
        [event.lngLat[0], event.lngLat[1]]
        ])
    };

    //click event for resetting routes
    function clickReset() {
        setMarkers([]);
        setRouteData({});
        setIsLoaded(false);
        setDistance(0);
        setName([]);
    }

    //submit for saving route to database 
    async function clickSubmit() {
        await fetch('/api/routes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: user.id,
                routeCoordinates: markers,
                name: 'New route',
                distance
            })
        })
    }

    return (
        <div className={"map_container"}>
            <div className={"panel"}>
                {distance}
                <button onClick={clickReset}>
                    Reset Route
                </button>
                <button onClick={clickSubmit}>
                    Submit Route
                </button>
            </div>
            <ReactMapGL {...viewport}
                mapboxApiAccessToken={"pk.eyJ1Ijoicmh5c3A4OCIsImEiOiJja2o5Yjc2M3kyY21iMnhwZGc2YXVudHVpIn0.c6TOaQ-C4NsdK9uZJABS_g"}
                mapStyle={"mapbox://styles/rhysp88/ckj950pju3y8l1aqhpb58my9d/draft"}
                onViewportChange={viewport => setViewport(viewport)} onClick={clickMarker}>
                {markers.length === 1 &&
                    <Marker latitude={markers[0][1]} longitude={markers[0][0]}>
                        <Pin />
                    </Marker>
                }
                {isLoaded &&
                    <>
                        <Source id="route-data" type="geojson" data={routeData}>
                            <Layer id="route" type="line" paint={{ 'line-color': '#3887be', 'line-width': 5, 'line-opacity': 0.75 }} />
                        </Source>
                        {markers.map((marker, i) => {
                            return (
                                <Marker longitude={marker[0]} latitude={marker[1]} >
                                    <button
                                        onClick={e => {
                                            e.preventDefault();
                                            setSelectPoint(marker);
                                            setIndex(i);
                                        }}
                                    >
                                        <Pin />
                                    </button>
                                </Marker>
                            )
                        })}

                        {selectPoint ? (
                            <Popup
                                longitude={selectPoint[0]}
                                latitude={selectPoint[1]}
                                onClose={() => {
                                    setSelectPoint(null);
                                }}
                            >
                                <div>
                                    {names[index]}
                                longitude: {selectPoint[0]}
                                latitude: {selectPoint[1]}
                                </div>
                            </Popup>
                        ) : null}
                    </>
                }
            </ReactMapGL>
        </div>
    )
}

export default CreateMap; 
