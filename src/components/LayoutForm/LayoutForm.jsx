import { Button } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { currentPage, HOME_PAGE } from "../../constants";

export function LayoutForm({ form, preview }) {
  const [, setPage] = useRecoilState(currentPage);

  return (
    <>
      <div
        id="banner-container"
        style={{ height: "80px", backgroundColor: "cyan" }}
      >
        i am the TINY banner. dana te asteptam cu ce vrei sa bagam aici
      </div>
      <div
        id="menu-container"
        style={{
          width: "10vw",
          height: "200px",
          position: "fixed",
          top: "80px",
          left: "0px",
          backgroundColor: "lightgray",
        }}
      >
        <Button onClick={() => setPage(HOME_PAGE)}>Back</Button>
      </div>
      <div
        id="content-container"
        style={{
          marginLeft: "11vw",
          width: "48vw",
          backgroundColor: "magenta",
        }}
      >
        {form}
      </div>
      <div
        id="preview-container"
        style={{
          width: "38vw",
          minHeight: "550px",
          position: "fixed",
          top: "80px",
          right: "0px",
          backgroundColor: "lightpink",
        }}
      >
          {preview}
      </div>
    </>
  );
}
