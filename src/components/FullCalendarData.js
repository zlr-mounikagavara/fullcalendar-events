import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import { Container, Dialog, DialogActions, Button, TextField, DialogContent, DialogTitle, Typography, Card, Toolbar, List, CardContent, IconButton } from "@mui/material";
import { collection, addDoc, query, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from "../firebase";
import "./Sidebar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const FullCalendarData = () => {

    const [open, setOpen] = useState(false);
    const [eventsOpen, setEventsOpen] = useState(false);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [enteredDescription, setEnteredDescription] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedStartTime, setSelectedStartTime] = useState("");
    const [selectedEndTime, setSelectedEndTime] = useState("");
    const [selectedEvent, setSelectedEvent] = useState("");
    const [enteredEvents, setEnteredEvents] = useState("")
    const [eventsData, setEventsData] = useState([]);


    const handleOpen = (val) => {
        setSelectedDate(val.startStr);
        setSelectedStartTime(val.start.toLocaleTimeString())
        setSelectedEndTime(val.end.toLocaleTimeString())
        setOpen(true);
    }
    console.log(selectedStartTime, "selected start time")
    console.log(selectedEndTime, "selected end time")
    console.log(selectedDate, "datttteee")

    const handleClose = () => {
        setOpen(false);
    }
    const addDescription = (event) => {
        setEnteredDescription(event.target.value)
    }
    const addStartTime = (event) => {
        setStartTime(event.target.value);

    }
    const addEndTime = (event) => {
        setEndTime(event.target.value)
    }
    const addEvents = (event) => {
        setEnteredEvents(event.target.value);
    }
    const eventCloseHandler = () => {
        setEventsOpen(false);
    }

    useEffect(() => {

        const q = query(collection(db, 'events'));

        const unsub = onSnapshot(q, (querySnapshot) => {
            let eventList = [];
            querySnapshot.forEach((doc) => {
                eventList.push({ ...doc.data(), id: doc.id });
            });
            setEventsData(eventList);
            console.log(eventList, "llll");
        });
        return () => unsub();

    }, []);


    const createEventsHandler = async () => {
        const newStartTime = new Date(`${selectedDate}T${startTime}:00`).toISOString();
        const newEndTime = new Date(`${selectedDate}T${endTime}:00`).toISOString();
        await addDoc(collection(db, 'events'), {
            title: enteredEvents,
            description: enteredDescription,
            start: newStartTime,
            end: newEndTime
        });
        setOpen(false);
        setEnteredEvents("");
        setEnteredDescription("");
        setStartTime("");
        setEndTime("");
    };

    console.log(selectedStartTime, "SSSSSS")


    const eventOpenHandler = (info) => {
        var eventObj = info.event;
        if (eventObj.title) {
            setSelectedEvent(eventObj.title)
            setEnteredDescription(info.event.extendedProps.description)
        }
        setEventsOpen(true);
    }
    console.log(eventsData, "ddddd")

    const successMessage = () => {
        toast.success("you've added event successfully")
    }

    const deleteEventHandler = async (id) => {
        await deleteDoc(doc(db, "events", id));
    };


    return (
        <div>
            <Container style={{ marginTop: 80, marginLeft: 200, width: 1080, height: 1000 }}>
                <Card
                    sx={{ width: 1000, height: 300, textAlign: "left", marginBottom: 5 }} elevation={8}>
                    <Toolbar style={{ backgroundColor: "#1F3B4D" }}>
                        <Typography style={{ color: "white" }}>
                            <strong>Monthly Events</strong>
                        </Typography>
                    </Toolbar>

                    <CardContent className="card">
                        {eventsData.map((l) => (
                            <div>
                                <List style={{ marginLeft: 20, backgroundColor: "#ffef96" }} >{l.title}</List>
                                <li style={{ marginLeft: 20 }}>{new Date(l.start).toDateString()}
                                    <IconButton >
                                        <DeleteIcon onClick={() => deleteEventHandler(l.id)}
                                            style={{ marginLeft: 10 }} />
                                    </IconButton>
                                </li>
                            </div>

                        ))}
                    </CardContent>
                </Card>
                <FullCalendar
                    editable
                    selectable
                    events={eventsData}
                    select={handleOpen}
                    eventClick={eventOpenHandler}
                    headerToolbar={{
                        left: "prev,next",
                        center: "title",
                        right: "dayGridMonth, timeGridWeek, timeGridDay,listWeek"
                    }}
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                    views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}>
                </FullCalendar>
            </Container>
            <Dialog
                open={open}
                onClose={handleClose}>

                <DialogTitle style={{ cursor: 'move' }}>
                    <strong>Add new Event and Time</strong>
                </DialogTitle><br />
                <DialogContent>
                    <TextField
                        variant="filled"
                        label="Enter Event"
                        value={enteredEvents}
                        onChange={addEvents} />
                </DialogContent>
                <DialogContent>
                    <TextField
                        variant="filled"
                        label="Enter Description"
                        value={enteredDescription}
                        onChange={addDescription} />
                </DialogContent>
                <DialogContent>
                    <TextField
                        variant="filled"
                        type="time"
                        value={startTime}
                        onChange={addStartTime}
                        label="Start Time"
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </DialogContent>
                <DialogContent>
                    <TextField
                        variant="filled"
                        type="time"
                        value={endTime}
                        onChange={addEndTime}
                        label="End Time"
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </DialogContent>
                <DialogActions className="button">
                    <Button
                        style={{ color: "white", marginRight: 130 }}
                        onClick={handleClose}
                    >Cancel
                    </Button>
                    <Button
                        style={{ color: "white" }}
                        className="button"
                        onClick={() => [createEventsHandler(), successMessage()]}
                    >Add
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
            <Dialog
                open={eventsOpen}
                onClose={eventCloseHandler}>
                <DialogTitle style={{ cursor: 'move', backgroundColor: "#1F3B4D", color: "white" }}>
                    <strong>Event Description</strong>
                </DialogTitle><br />
                <DialogContent>
                    <Typography style={{ backgroundColor: "#ffef96" }}><strong>{selectedEvent}</strong></Typography>
                    <li style={{ marginTop: 20 }}>{enteredDescription}</li>
                </DialogContent>
            </Dialog>

        </div >
    )
}

export default FullCalendarData;