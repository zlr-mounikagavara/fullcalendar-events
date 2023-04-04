import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import 'react-calendar/dist/Calendar.css';
import { Typography } from "@mui/material";


const CalendarC = () => {
    const [newDate, setNewDate] = useState(new Date());

    const changeDate = (e) => {
        setNewDate(e)
    }

    return (
        <div>
            <Typography
                variant="h5"
                style={{ marginTop: 100, textAlign: "left", marginLeft: 250 }}>
                <strong>Calendar</strong>
            </Typography>
            <h3 style={{ marginTop: 100 }}><b>{moment(newDate).format('Do MMMM YYYY')}</b></h3>
            <div style={{ marginTop: 10, marginLeft: 500 }}>
                <Calendar
                    value={newDate}
                    onChange={changeDate}>
                </Calendar>
            </div>
        </div>
    )
}
export default CalendarC;