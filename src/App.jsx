import { Grid, Paper, Typography } from "@mui/material";
import { Button } from "@mui/material";
import FeatureForm from "./components/FeatureForm";
import BugForm from "./components/BugForm";
import { useRecoilValue } from "recoil";

import React from "react";
import Preview from "./components/Preview";
import LayoutHome from "./components/LayoutHome/LayoutHome";
import { LayoutForm } from "./components/LayoutForm/LayoutForm";

import { BUG_PAGE, currentPage, FEATURE_PAGE, HOME_PAGE } from "./constants";

import "./index.css";

function App() {
  const pageName = useRecoilValue(currentPage);

  return (
    <>
      {pageName === HOME_PAGE && <LayoutHome />}
      {pageName === FEATURE_PAGE && <LayoutForm form={<FeatureForm />} />}
      {pageName === BUG_PAGE && <LayoutForm form={<BugForm />} />}
    </>
  );
}

export default App;
