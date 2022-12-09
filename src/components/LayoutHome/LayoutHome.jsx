import React from "react";
import { Grid, Button, Typography, Paper } from "@mui/material";
import { useRecoilState } from "recoil";

import { FormidableLogo } from "../../assets/FormidableLogo";

import { BUG_PAGE, currentPage, FEATURE_PAGE } from "../../constants";
import { BrivoLogo } from "../../assets/BrivoLogo";

export default function LayoutHome() {
  const [, setPage] = useRecoilState(currentPage);

  return (
    <>
      <div
        id="banner-container"
        style={{
          height: "68px",
          backgroundColor: "#F3F5F6",
          boxShadow: "0 3px 5px rgba(0, 0, 0, 0.1)",
        }}
      ></div>
      <div
        id="options-container"
        style={{
          height: "calc(100vh - 120px)",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <FormidableLogo style={{ padding: "96px 0" }} />
        <Paper
          style={{
            width: "472px",
            minHeight: "200px",
          }}
          elevation={3}
        >
          <Typography
            display="flex"
            alignItems="center"
            justifyContent="center"
            variant="h5"
            style={{ height: "60px", backgroundColor: "#F3F5F6" }}
          >
            What do you want to do?
          </Typography>
          <div
            style={{
              display: "flex",
              height: "140px",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "#172F4D",
                width: "190px",
                height: "42px",
              }}
              onClick={() => setPage(FEATURE_PAGE)}
              fullWidth
            >
              CREATE A FEATURE
            </Button>
            <Button
              variant="contained"
              color={"error"}
              style={{
                backgroundColor: "#ED6C02",
                width: "190px",
                height: "42px",
              }}
              onClick={() => setPage(BUG_PAGE)}
              fullWidth
            >
              REPORT A BUG
            </Button>
          </div>
        </Paper>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "50vw",
          transform: "translateX(-50%)",
          paddingBottom: "68px",
        }}
      >
        <div
          style={{
            postion: "fixed",
            bottom: "50px",
            left: "50vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Powered by</Typography>
          <BrivoLogo style={{ padding: "16px" }} />
          <Typography variant="h4">Science Fair 2022</Typography>
        </div>
      </div>
    </>
  );
}
