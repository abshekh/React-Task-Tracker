import { createMuiTheme, CssBaseline, Grid, makeStyles, Paper, ThemeProvider } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import InputTasks from './components/InputTasks';
import TaskList from './components/TaskList';
import About from './components/About';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000",
      light: "#00026"
    },
    secondary: {
      main: "#d32f2f",
      light: "#d32f2f26"
    },
    background: {
      default: "#f4f5fd"
    }
  }
});

const useStyles = makeStyles(theme => ({
  appMain: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(2),
  },
  mainItem: {
    width: "100%",
    height: "100%"
  },
  paper: {
    width: "auto",
    display: "block",
    padding: theme.spacing(2)
  }
}));

function App () {
  const classes = useStyles();

  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('https://my-json-server.typicode.com/abshekh/typicode-demo/tasks');
    const data = await res.json();

    return data;
  };

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`https://my-json-server.typicode.com/abshekh/typicode-demo/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);


  // Delete task
  const deleteTask = async (id) => {
    await fetch(`https://my-json-server.typicode.com/abshekh/typicode-demo/tasks/${id}`, {
      method: 'DELETE'
    });

    setTasks(tasks.filter((tasks) => tasks.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`https://my-json-server.typicode.com/abshekh/typicode-demo/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    });

    const data = await res.json();

    setTasks(tasks.map(task => task.id === id ? { ...task, reminder: data.reminder } : task));
  };

  // Add Tasks
  const addTask = async (newTask) => {
    // newTask.id = Date.now();
    // setTasks([newTask, ...tasks]);

    const res = await fetch(`https://my-json-server.typicode.com/abshekh/typicode-demo/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newTask)
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  return (
    <Router>

      <ThemeProvider theme={theme}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.appMain}
        >
          <Grid item sm={10} md={6} lg={4} className={classes.mainItem} >
            <Paper className={classes.paper}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
              >
                <Header title="Task Tracker" toggleShowAddTask={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask} />

                <Route path="/React-Task-Tracker/" exact render={(props) => (
                  <>
                    {showAddTask && <InputTasks onAdd={addTask} />}
                    <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
                  </>
                )} />
                <Route path="/React-Task-Tracker/about" exact component={About} />

                <Footer />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <CssBaseline />
      </ThemeProvider >
    </Router>

  );
}

export default App;
