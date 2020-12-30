import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../store/actions/session'

//Components
// import { AuthContext } from '../context/Context';
// import LoginForm from './Header/LoginForm';
// import SignupForm from './Header/SignupForm';
// import NavBar from './Header/NavBar'

//Mui
import { makeStyles, Typography, IconButton, Button } from '@material-ui/core';
// import Dialog from '@material-ui/core/Dialog';

//Icons
// import PersonIcon from '@material-ui/icons/Person';
// import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
// import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  navBar_icon: {
    minWidth: '1.5rem',
    maxWidth: '3rem',
  },
  iconButton: {
    '&.MuiIconButton-root': {
      borderRadius: '.5rem',
      padding: '.5rem'
    }
  },
  dialog: {
    width: 'auto',
    height: 'auto',
  }
}));


const Header = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [user, setUser] = useState({})
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    // setAuthDialog(false);
  }

  const handleNavClick = (path) => {
    history.push(path)
  }

  const handleMenuClick = (path) => {
    history.push(path)
    // user ? history.push(path) : history.push('/login')
    handleMenuClose()
  }

  const handleLogout = () => {
    console.log('logging out')
    dispatch(sessionActions.logoutUser)
    history.push('/')
  }

  // const handleMenuClick = (path) => {
  //   setWhichDialog(path)
  //   setAuthDialog(true)
  // }

  useEffect(() => {
    setUser(props.user)
    setIsLoaded(true)
  }, [])

  return isLoaded && (
    <>
      <div className={'navBar_root'}>

        {/* LEFT */}
        <div className={'navBar_left'}>
          {/* TODO: history.push('/home') */}
          <Button onClick={() => handleMenuClick('/home')}>
            <Typography color='primary' >Catch Me If You Can</Typography>
          </Button>
        </div>

        {/* MIDDLE */}
        <div className={'navBar_middle'}>
          <div className={'navBar_iconContainer'}>
            <Button>
              <Typography>Home</Typography>
            </Button>
          </div>
        </div>

        {/* RIGHT */}
        <div className={'navBar_right'}>
          {user ? (
            <>
              <Typography>{user ? user.first_name : 'Guest'}</Typography>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </>
          ) : (
              <Button onClick={() => handleMenuClick('/login')}><Typography>Login</Typography></Button>
            )}
          <div className={'navBar_iconContainer'}>
            <IconButton
              className={classes.iconButton}
              title={'settings'}
              onClick={() => handleMenuClick('settings')}
            >
              <SettingsIcon color='primary' />
            </IconButton>
          </div>
        </div>
      </div >
      {/* <Dialog open={authDialog} onClose={handleClose} className={classes.dialog} aria-labelledby="form-dialog-title">
        {renderDialog(whichDialog)}
      </Dialog> */}
    </>
  )
}

export default Header
