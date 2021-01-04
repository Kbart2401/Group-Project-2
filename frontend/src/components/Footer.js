import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  footer_container: {
    width: '100vw',
    backgroundColor: 'rgb(30, 33, 30)',
    display: 'flex',
    justifyContent: 'center',
    height: '125px'
  },
  footer_root: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateAreas: '\'left middle right\'',
    justifyContent: 'space-between',
    padding: '0.5rem',
    position: 'relative',
    width: '1000px',
    color: 'white',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif;',
    fontWeight: '400'
  },
  footer_left: {
    display: 'flex',
    gridArea: 'left',
    maxWidth: '25rem',
    flexDirection: 'column',
    alignItems: 'center',
  },
  footer_middle: {
    display: 'flex',
    gridArea: 'middle',
    maxWidth: '25rem',
    flexDirection: 'column',
    alignItems: 'center',
  },
  footer_right: {
    display: 'flex',
    gridArea: 'right',
    maxWidth: '25rem',
    flexDirection: 'column',
    alignItems: 'center',
  },
  footer_link: {
    backgroundImage: 'url("github.png")',
    height: '20px',
    width: '30px'
  },
  footer_navContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  footer_icon: {
    minWidth: '1.5rem',
    maxWidth: '3rem',
  },
  footer_iconContainer: {
    display: 'grid',
    gridAutoColumns: 'column',
    // gap: '.5rem',
    maxWidth: 'fit-content',
    justifyContent: 'center',
  },
  footer_iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '.5rem',
    // cursor: 'pointer',
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
  },
  text: {
    fontSize: '14px',
    color: '#9DA0A2'
  },
  linkText: {
    fontSize: '14px',
    color: '#3f51b5',
    textDecoration: 'none'
  },
  contact: {
    display: 'flex',
    alignItems: 'center'
  },
  contactContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    height: '80px',
    width: '250px',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const Footer = () => {
  const classes = useStyles()
  return (
    <div className={classes.footer_container}>
      <div className={classes.footer_root}>
        <div className={classes.footer_left}>
          <span>Follow</span>
          <Typography className={classes.text}>View this project on Github</Typography>
          <a className={classes.linkText} href='https://github.com/Kbart2401/Catch-me-if-you-can' target='_blank'>
            <GitHubIcon />
          </a>
        </div>
        <div className={classes.footer_middle}>
          <span>About Us</span>
          <Typography className={classes.text}>Creators</Typography>
          <div className={classes.contactContainer}>
            <div className={classes.contact}>
              <a className={classes.linkText} href='https://www.linkedin.com/in/aaron-hanson-brb/'>Aaron Hanson</a> &nbsp;
            <a className={classes.linkText} href='https://github.com/Kbart2401/Catch-me-if-you-can' target='_blank'>
                <GitHubIcon />
              </a>
            </div>
            <div className={classes.contact}>
              <a className={classes.linkText} href='https://www.linkedin.com/in/kyle-barthelmes-a5120b51/'>Kyle Barthelmes</a> &nbsp;
            <a className={classes.linkText} href='https://github.com/Kbart2401/Catch-me-if-you-can' target='_blank'>
                <GitHubIcon />
              </a>
            </div>
            <div className={classes.contact}>
              <a className={classes.linkText} href='https://www.linkedin.com/in/nicholas-richard-77a9a066/'>Nick Richard</a> &nbsp;
            <a className={classes.linkText} href='https://github.com/Kbart2401/Catch-me-if-you-can' target='_blank'>
                <GitHubIcon />
              </a>
            </div>
            <div className={classes.contact}>
              <a className={classes.linkText} href='https://www.linkedin.com/in/kyle-barthelmes-a5120b51/'>Rhys Previte</a> &nbsp;
            <a className={classes.linkText} href='https://github.com/Kbart2401/Catch-me-if-you-can' target='_blank'>
                <GitHubIcon />
              </a>
            </div>
          </div>
        </div>
        <div className={classes.footer_right}>
          <span>Inspired By</span>
          <div className={classes.contactContainer}>
          <a className={classes.linkText} href='https://www.mapmyrun.com/'>MapMyRun</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer