import { Grid, Typography } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';

const Footer = () => {
  const location = useLocation();

  return (
    <Grid
      item
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          {' '}
          {new Date().getFullYear()}
          {
            location.pathname === '/React-Task-Tracker/' ?
              (
                <>
                  <br />
                  <Link to="/React-Task-Tracker/about"> About </Link>
                </>
              )
              :
              <>
                <br />
                <Link to="/React-Task-Tracker/">Go back</Link>
              </>
          }
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
