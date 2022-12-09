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
        style={{ height: "120px", backgroundColor: "cyan"}}
      >
          <div style={{left: "0", right: "41.82%", top: "0%", bottom: "36.56%"}}>
          <span style={{color: "#172F4D"}}>
              Form
          </span>
              <span style={{color: "#FF991F"}}>
              idable
          </span>
              <span style={{color:"#919EAB"}}>
                  features&bugs
              </span>
          </div>

      </div>
      <div
        id="options-container"
        style={{
          height: "calc(100vh - 120px)",
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
            What do you want to do?
          </Typography>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                style={{backgroundColor: "#172F4D", width: "190px", height: "42px"}}
                onClick={() => setPage(FEATURE_PAGE)}
                fullWidth
              >
                CREATE A FEATURE
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color={"error"}
                style={{backgroundColor: "#ED6C02", width: "190px", height: "42px"}}
                onClick={() => setPage(BUG_PAGE)}
                fullWidth
              >
                REPORT A BUG
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
}
