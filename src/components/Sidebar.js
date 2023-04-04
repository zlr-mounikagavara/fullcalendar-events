import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Drawer, IconButton, ListItemButton, List, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import { NavLink } from "react-router-dom";
import { auth } from "../firebase";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from "@mui/material/AvatarGroup"
import animatedboy from "../images/animatedboy.jpg"
//import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import "./Sidebar.css";


const sidebarList = [
    {
        text: "Profile",
        icon: <PersonIcon />,
        path: "/profile"

    },
    {
        text: "FullCalendarDatabase",
        icon: <EventIcon />,
        path: "/data"
    },
    {
        text: "FullCalendar",
        icon: <EventIcon />,
        path: "/full"

    }, {
        text: "Tasks",
        icon: <TaskOutlinedIcon />,
        path: "/tasks"
    }, {
        text: "Calendar",
        icon: <EventIcon />,
        path: "/calendar"
    }
]


const Sidebar = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const openHandler = () => {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <div>
            <AppBar className="appbar"
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar className="appbar">
                    <IconButton>
                        <MenuIcon style={{ color: "white" }}
                            onClick={openHandler}>
                        </MenuIcon>
                    </IconButton>
                    <Typography variant="h6" >App</Typography>

                    {/* <NotificationsNoneIcon
                        style={{ marginLeft: 1050, color: "white" }}
                    /> */}

                    <Button style={{ marginLeft: 5, color: "white", backgroundColor: "#1F3B4D" }}
                        variant="contained"
                        onClick={() => auth.signOut()}>
                        <Avatar style={{ marginLeft: 1070 }}>M</Avatar>
                    </Button>
                </Toolbar>
            </AppBar>
            {sidebarOpen ? <Drawer
                sx={{
                    width: 280,
                    '& .MuiDrawer-paper': {
                        width: 200,

                    },
                }}
                variant="persistent"
                anchor="left"
                open={sidebarOpen}>
                <div className="drawer" >
                    <AvatarGroup style={{ marginTop: 80, marginRight: 50 }}>
                        <Avatar
                            sx={{ width: 100, height: 100 }}
                            src={animatedboy}
                        />
                    </ AvatarGroup>
                    <List>
                        {sidebarList.map((li) => (
                            <NavLink style={{ textDecoration: "none", color: "black" }} to={li.path}>
                                <IconButton
                                    color="primary"
                                    style={{ marginTop: 40, color: "white" }}>
                                    {li.icon}</IconButton>
                                <ListItemButton
                                    style={{ justifyContent: "center", color: "white" }}>
                                    {li.text}
                                </ListItemButton>
                            </NavLink>
                        ))}
                    </List>
                </div>
            </Drawer> : <></>}
            <main>{children}</main>
        </div>
    )
}
export default Sidebar;