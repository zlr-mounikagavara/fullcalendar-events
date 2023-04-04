import { TextField, Button, Typography, Card, Toolbar, List, ListItemText, IconButton } from "@mui/material";
import { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";


const toDo = [
    {
        id: "k1",
        task: "Meeting"
    },
    {
        id: "k2",
        task: "Presentation"
    },
    {
        id: "k3",
        task: "Conference"
    }
]

const Tasks = () => {
    const [enteredTask, setEnteredTask] = useState('');
    const [tasks, setTasks] = useState(toDo);

    const addTaskHandler = (enteredtasks) => {
        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks];
            updatedTasks.unshift({ task: enteredtasks, id: Math.random().toString() })
            return updatedTasks;
        })
    }
    const deleteTaskHandler = (id) => {
        const updatedTasks = tasks.filter(tasklist => tasklist.id !== id)
        setTasks(updatedTasks);
    }

    const taskChangeHandler = (event) => {
        setEnteredTask(event.target.value);
    }
    const taskSubmitHandler = (event) => {
        event.preventDefault();
        addTaskHandler(enteredTask);
        setEnteredTask("");
    }

    return (
        <div style={{ marginTop: 100 }}>
            <form onSubmit={taskSubmitHandler}>
                <Typography variant="h5"
                    style={{ marginTop: 10, textAlign: "left", marginLeft: 250 }}>
                    <strong>Tasks</strong>
                </Typography>
                <div>
                    <TextField
                        type="text"
                        value={enteredTask}
                        onChange={taskChangeHandler}></TextField>
                    <Button style={{ width: 105, height: 50, backgroundColor: "#1F3B4D" }}
                        variant="contained" type="submit">Add Task</Button>
                </div>
            </form>
            <Card
                sx={{ width: 300, height: 300, justifyItem: "center", marginLeft: 60, marginTop: 10 }}
                elevation={8}>
                <Toolbar style={{ backgroundColor: "#1F3B4D" }}>
                    <Typography style={{ color: "white" }}>Tasks</Typography>
                </Toolbar>
                <div>
                    <List style={{ paddingLeft: 10 }}>
                        <div >
                            {tasks.map((tasklist) => (
                                <ListItemText style={{ textAlign: "left" }} key={tasklist.id}>
                                    {tasklist.task}
                                    <IconButton>
                                        <CloseOutlinedIcon
                                            style={{ position: "static" }}
                                            onClick={() => deleteTaskHandler(tasklist.id)} />
                                    </IconButton>
                                </ListItemText>

                            ))}

                        </div>

                    </List>
                </div>
            </Card>
        </div>
    )
}
export default Tasks;