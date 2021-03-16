// import React from 'react'
// import PropTypes from 'prop-types';

import { Button, Grid, Typography } from "@material-ui/core";
import { useLocation } from 'react-router-dom';



const Header = ({ title, showAddTask, toggleShowAddTask }) => {

  const location = useLocation();

  return (
    <Grid
      container
      item
      justify="space-between"
      alignItems="center"
    >
      <Grid item>
        <Typography
          variant="h6"
          component="div"
        >{title}</Typography>
      </Grid>
      <Grid item>
        {
          location.pathname === '/React-Task-Tracker' && <Button
            variant="contained"
            color={showAddTask ? "secondary" : "primary"}
            onClick={toggleShowAddTask}
          >{showAddTask ? "Close" : "Add"}</Button>
        }
      </Grid>
    </Grid>
  );
};

// Header.defaultProps = {
//   title: 'Task Tracker'
// };

// Header.prototype = {
//   title: PropTypes.string
// };

export default Header;
