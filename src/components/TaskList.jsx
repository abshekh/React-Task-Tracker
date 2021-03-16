import { Avatar, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles } from '@material-ui/core';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import AlarmOffIcon from '@material-ui/icons/AlarmOff';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%"
  },

}));






const TaskList = ({ tasks, onDelete, onToggle }) => {
  const classes = useStyles();

  const generateList = (task) => {
    return (
      <ListItem key={task.id} button onClick={() => onToggle(task.id)}>
        <ListItemAvatar>
          <Avatar>
            {task.reminder ? <AlarmOnIcon color="primary" /> : <AlarmOffIcon color="primary" />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={task.text}
          secondary={(new Date(task.day)).toLocaleString()}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={() => onDelete(task.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>

      </ListItem>
    );
  };

  return (

    <Grid container item>
      <List className={classes.list}>
        {
          (tasks.length > 0) ? tasks.map(task => generateList(task)) : <ListItem>
            <ListItemText primary="No Tasks to show..." />
          </ListItem>
        }
      </List>
    </Grid>
  );
};

export default TaskList;
