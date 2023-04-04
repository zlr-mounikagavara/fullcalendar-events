import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import { Container, TextField } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import "./Sidebar.css";


const events = [
    {
        title: "meeting",
        start: "2023-03-15T21:00:00",
        end: "2023-03-15T22:00:00"
    },
    {
        title: "Presentation",
        start: "2023-03-15T13:00:00",
        end: '2023-03-15T15:00:00',
    },
    {
        title: "Conference",
        start: "2023-03-15T16:00:00",
        end: "2023-03-15T18:00:00"
    },
    {
        title: "meeting",
        start: "2023-03-17T11:00:00",
        end: "2023-03-17T14:00:00",
    }
]

const FullCalendarC = () => {
    const [calEvents, setCalEvents] = useState(events);
    const [enteredEvents, setEnteredEvents] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");

    const handleOpen = (val) => {
        setSelectedDate(val.startStr);
        setOpen(true);
    }
    console.log(selectedDate, "cffdd");

    const handleClose = () => {
        setOpen(false);
    }
    const addEvents = (event) => {
        setEnteredEvents(event.target.value)
    }
    const addStartTime = (event) => {
        setStartTime(event.target.value)
    }
    const addEndTime = (event) => {
        setEndTime(event.target.value)
    }

    const handleSelect = (event) => {
        event.preventDefault();
        const newStartTime = new Date(`${selectedDate}T${startTime}:00`).toISOString();
        const newEndTime = new Date(`${selectedDate}T${endTime}:00`).toISOString();
        setCalEvents([...events, { title: enteredEvents, start: newStartTime, end: newEndTime }
        ]);
        setEnteredEvents("");
        setStartTime("");
        setEndTime("");
        setOpen(false);
    }
    return (
        <div>
            <Container className="container"
                style={{ marginTop: 100, marginLeft: 200, width: 1080, height: 1000 }}>
                <FullCalendar
                    editable
                    selectable
                    events={calEvents}
                    select={handleOpen}
                    headerToolbar={{
                        left: "prev,next",
                        center: "title",
                        right: "dayGridMonth, timeGridWeek, timeGridDay,listWeek"
                    }}
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                    views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}>
                </FullCalendar>
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
                            type="time"
                            value={startTime}
                            onChange={addStartTime}
                            label="Start Time"
                            InputLabelProps={{
                                shrink: true,
                            }} />
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
                        <Button autoFocus onClick={handleClose} style={{ color: "white", marginRight: 130 }}>
                            Cancel
                        </Button>
                        <Button onClick={handleSelect} style={{ color: "white" }}>
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </  Container>
        </div>

    )
}
export default FullCalendarC;