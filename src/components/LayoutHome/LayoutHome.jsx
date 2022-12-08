import React from "react";
import { Grid, Button, Typography, Paper } from "@mui/material";
import { useRecoilState } from "recoil";

import { BUG_PAGE, currentPage, FEATURE_PAGE } from "../../constants";

export default function LayoutHome() {
  const [, setPage] = useRecoilState(currentPage);

  return (
    <>
      <div
        id="banner-container"
        style={{ height: "120px", backgroundColor: "cyan" }}
      >
        i am the banner. dana te asteptam cu ce vrei sa bagam aici
      </div>
      <div
        id="options-container"
        style={{
          height: "calc(100vh - 120px)",
          backgroundColor: "turquoise",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          style={{
            margin: "0 auto",
            maxWidth: "800px",
            padding: "20px",
            marginBottom: "60px",
          }}
          elevation={3}
        >
          <Typography align="center" variant="h5">
            What you want to add to your project?
          </Typography>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                onClick={() => setPage(FEATURE_PAGE)}
                fullWidth
              >
                Feature
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color={"error"}
                onClick={() => setPage(BUG_PAGE)}
                fullWidth
              >
                Bug
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
}
