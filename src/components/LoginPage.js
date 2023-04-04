import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Grid, Card, TextField, Button } from "@mui/material";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginPage = () => {
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");

    const emailHandler = (event) => {
        setEnteredEmail(event.target.value)
    }
    const passwordHandler = (event) => {
        setEnteredPassword(event.target.value)
    }
    const signUp = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword);
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    }

    const signIn = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword);
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <AppBar>
                <Toolbar style={{ backgroundColor: "#1F3B4D" }}>
                    <Typography variant="h6"><strong>App</strong></Typography>
                </Toolbar>
            </AppBar>
            <form>
                <Grid style={{ maxWidth: 700, marginLeft: 400 }}>
                    <Card style={{ marginTop: 200, maxWidth: 400 }} elevation={8}>
                        <TextField style={{ marginTop: 20 }}
                            type="email"
                            label="Email"
                            placeHolder="EmailId"
                            value={enteredEmail}
                            onChange={emailHandler}>
                        </TextField><br /><br />
                        <TextField
                            type="password"
                            label="Password"
                            placeHolder="Password"
                            value={enteredPassword}
                            onChange={passwordHandler}
                        ></TextField><br /><br />
                        <div style={{ marginTop: 20, marginBottom: 40 }}>
                            <Button
                                style={{ backgroundColor: "#1F3B4D" }}
                                variant="contained"
                                onClick={(e) => signIn(e)}>Sign In
                            </Button>
                            <Button style={{ marginLeft: 150, backgroundColor: "#1F3B4D" }}
                                variant="contained"
                                onClick={(e) => signUp(e)}>Sign Up
                            </Button>
                        </div>
                    </Card>
                </Grid>
            </form>
        </div>
    )
}
export default LoginPage;