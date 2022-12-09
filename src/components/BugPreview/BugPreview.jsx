import React from "react";
import {useRecoilState, useRecoilValue} from "recoil";

import {Button, Typography} from "@mui/material";

import {
    bugSummary,
    bugEnv,
    bugSteps,
    bugExpectedResult,
    bugActualResult,
    bugReproducible,
    bugIncludeScreenshots,
} from "../../constants";

export default function BugPreview() {
  const summary = useRecoilValue(bugSummary);
  const env = useRecoilValue(bugEnv);
  const steps = useRecoilValue(bugSteps);
  const expectedResult = useRecoilValue(bugExpectedResult);
  const actualResult = useRecoilValue(bugActualResult);
  const reproducible = useRecoilValue(bugReproducible);
  const includeScreenshots = useRecoilValue(bugIncludeScreenshots);

  const handleCopyClick = (evt) => {
    var type = "text/html";
    var blob = new Blob([clipboardContent], { type });
    var data = [new ClipboardItem({ [type]: blob })];

    navigator.clipboard.write(data).then(
      function () {
        /* success */
        alert("o mers");
      },
      function () {
        alert("we have buba");
        /* failure */
      }
    );
  };

  const arrayToUL = (arr) => {
    const ul = document.createElement("ul");
    ul.append(
      ...arr.map((value) => {
        if (Array.isArray(value)) return arrayToUL(value);
        const li = document.createElement("li");
        li.textContent = value;
        li.style = " margin: 10px 0;";
        return li;
      })
    );
    return ul;
  };

    const stepsList = steps.length > 0 ? arrayToUL(
    steps.map((step) => step.value)
  ).innerHTML : '';

    const isReproducible = reproducible ? `YES - ${reproducible}` : " NO ";
    const includeSS = includeScreenshots ? " YES " : " NO ";

  let clipboardContent = `
        <span style="color:#97A0AF; display: inline-block;margin: 10px 0">
           <strong>Summary:</strong>
        </span>
        ${summary}
        </br>
        <span style="color:#6554C0; display: inline-block;margin: 10px 0">
           <strong>Environment & Account(s): </strong>
        </span>
        ${env}
        </br>        
        <span style="color:#36B37E; display: inline-block;margin: 10px 0">
           <strong>Steps to Reproduce:</strong>
        </span>
       ${stepsList}
       </br>
            <span style="color:#4C9AFF; display: inline-block;margin: 10px 0">
           <strong>Expected Result:</strong>
        </span>
        ${expectedResult}
        </br>
             <span style="color:#FF991F; display: inline-block;margin: 10px 0">
           <strong>Actual Result:</strong>
        </span>
        ${actualResult}
        </br>
        <span style="color:#BF2600; display: inline-block;margin: 10px 0">
           <strong>Reproducible (Y/N/Sometimes): :</strong>
        </span>
       <span style="color: #97A0AF; display: inline-block;margin: 10px 0">
            <strong> ${isReproducible}</strong>
       </span>
      <br/>
               <span style="color:#008DA6; display: inline-block;margin: 10px 0">
           <strong><italic>Include screenshots and/or video</italic></strong>
        </span>
       <span style="color: #97A0AF">
            <strong> ${includeSS}</strong>
       </span>
        `;

  // TODO -> use state to create an elaborate preview with colors and such
  return (
    <>
        <Typography align="center" variant="h5">PREVIEW</Typography>
        <div dangerouslySetInnerHTML={{ __html: clipboardContent }}></div>
        <Button variant="contained" style={{backgroundColor: "#172F4D", width: "190px", height: "42px"}} onClick={handleCopyClick}>Copy to clipboard</Button>
    </>
  );
}
