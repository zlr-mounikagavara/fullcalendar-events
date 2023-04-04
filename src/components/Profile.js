import { Typography, TextField, Button, Card, CardContent, Grid } from "@mui/material"
import "./Profile.css"

const Profile = () => {
    return (
        <div>
            <Typography
                variant="h5"
                style={{ marginTop: 100, textAlign: "left", marginLeft: 250 }}>
                <strong>Edit Profile</strong>
            </Typography>
            <Grid>
                <Card
                    variant="outlined"
                    style={{ width: 800, height: 500, marginLeft: 400 }}>
                    <div className="typography" style={{ marginTop: 50 }}>
                        <Typography>First Name</Typography>
                        <Typography style={{ marginLeft: 280 }}>ContactNo</Typography>
                    </div>
                    <CardContent className="textfield" >
                        <TextField
                            variant="filled"
                            type="text"
                        />
                        <TextField
                            variant="filled"
                            type="number"
                        />
                    </CardContent>
                    <div className="typography">
                        <Typography>Last Name</Typography>
                        <Typography style={{ marginLeft: 260 }}>Email</Typography>
                    </div>
                    <CardContent className="textfield">
                        <TextField
                            variant="filled"
                            type="text" />
                        <TextField
                            variant="filled"
                            type="email"
                        />
                    </CardContent>
                    <div className="typography">
                        <Typography>Address1</Typography>
                        <Typography style={{ marginLeft: 280 }}>Address2</Typography>
                    </div>
                    <CardContent className="textfield">
                        <TextField
                            variant="filled"
                            type="text" />
                        <TextField
                            variant="filled"
                            type="text"
                        />
                    </CardContent>
                    <Button
                        variant="contained"
                        style={{ marginTop: 50, backgroundColor: "#1F3B4D" }}>Submit
                    </Button>
                </Card>
            </Grid>
        </div>

    )
}

export default Profile;