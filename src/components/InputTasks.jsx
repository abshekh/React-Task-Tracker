import { Button, Checkbox, FormControlLabel, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';


const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export const InputTasks = ({ onAdd }) => {
  const classes = useStyles();

  const [text, setText] = useState('');
  const [day, setDay] = useState(
    new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]
  );
  const [reminder, setReminder] = useState(false);



  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert('Please add a Task');
    }
    else {
      onAdd({ text, day, reminder });

      setText("");
      setDay(new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]);
      setReminder(false);
    }
  };

  return (
    <Grid container item>
      <form className={classes.form} noValidate onSubmit={onSubmit}>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="task"
          label="Task"
          name="task"
          autoFocus
          helperText="Please add a task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="daytime"
          label="Day & Time"
          InputLabelProps={{ shrink: true, required: true }}

          type="datetime-local"
          id="daytime"

          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={reminder}
              value={reminder}
              onChange={(e) => setReminder(e.currentTarget.checked)}
            />}

          label="Set Reminder"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Save Task
        </Button>
      </form>
    </Grid>
  );
};

export default InputTasks;