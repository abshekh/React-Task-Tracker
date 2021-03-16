import { Grid, Typography } from '@material-ui/core';
import React from 'react';


const About = () => {
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
          Version 1.0.0
        </Typography>
      </Grid>
    </Grid>
  );
};

export default About;
