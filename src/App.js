import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CalendarC from "./components/CalendarC";
import Profile from "./components/Profile";
import Tasks from "./components/Tasks";
import './App.css';
import FullCalendarC from "./components/FullCalendarC";
import LoginPage from "./components/LoginPage";
import { auth } from "./firebase";
import FullCalendarData from "./components/FullCalendarData";


function App() {
  const [presentUser, setPresentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setPresentUser({
          uid: user.id,
          email: user.email
        })
      } else {
        setPresentUser(null);
      }
    })
  }, [])
  return (
    <div className="App">
      {presentUser ?
        <BrowserRouter >
          <Sidebar>
            <Routes>
              <Route path="/data" element={<FullCalendarData />} />
              <Route path="/calendar" element={<CalendarC />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/full" element={<FullCalendarC />} />
            </Routes>
          </Sidebar>
        </BrowserRouter> : <LoginPage />}
    </div>
  );
}

export default App;
