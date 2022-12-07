import {Grid, Paper, Typography} from "@mui/material";
import { Button } from '@mui/material';
import FeatureForm from "./components/FeatureForm";
import {useState} from "react";
import BugForm from "./components/BugForm";


function App() {
    const [displayButtons, setDisplayButtons] = useState(true);
    const [displayFeatureForm, setDisplayFeatureForm] = useState(false);
    const [displayBugForm, setDisplayBugForm] = useState(false);

    const handleFeatureButtonClick = () => {
        setDisplayFeatureForm(true);
        setDisplayBugForm(false);
        setDisplayButtons(false);
    };

    const handleBugButtonClick = () => {
        setDisplayBugForm(true);
        setDisplayFeatureForm(false);
        setDisplayButtons(false);
    };


    return (
        <Paper
            style={{ margin: "0 auto", maxWidth: "800px", padding: "20px" }}
            elevation={3}
        >
            <Typography align="center" variant="h5">
                What you want to add to your project?
            </Typography>
            <br/>
            {displayButtons?
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Button variant="contained" onClick={handleFeatureButtonClick} fullWidth > Feature </Button>

                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color={"error"} onClick={handleBugButtonClick} fullWidth> Bug </Button>
                    </Grid>
                </Grid>
            : null}
            {displayFeatureForm? <FeatureForm/> : displayBugForm? <BugForm/> : null}
        </Paper>
    );
}

export default App;
