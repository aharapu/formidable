import React from "react";
import { useRecoilValue } from "recoil";

import { Button, Typography } from "@mui/material";

import {
  featureACs,
  featureDeps,
  featureTechGuide,
  featureFlag,
  featureImpactedProj,
  featureRequireEdition,
  featureRequireAutomationTest,
  featureWhat,
} from "../../constants";

export default function FeaturePreview() {
  const what = useRecoilValue(featureWhat);
  const criterias = useRecoilValue(featureACs);
  const techGuidance = useRecoilValue(featureTechGuide);
  const dependencies = useRecoilValue(featureDeps);
  const FF = useRecoilValue(featureFlag);
  const impactedProj = useRecoilValue(featureImpactedProj);
  const edition = useRecoilValue(featureRequireEdition);
  const automation = useRecoilValue(featureRequireAutomationTest);

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

  const criteriasList =
    criterias.length > 0
      ? arrayToUL(criterias.map((criteria) => criteria.value)).innerHTML
      : "";
  const techGuide =
    techGuidance.length > 0 ? arrayToUL([techGuidance]).innerHTML : "";
  const deps =
    dependencies.length > 0
      ? arrayToUL(dependencies.map((dep) => dep.value)).innerHTML
      : '<span style="color: #97A0AF"><strong> NO </strong></span>';
  const requiresFF = FF ? `YES - ${FF}` : " NO ";
  const impactedProjects = arrayToUL(
    impactedProj.map((proj) => proj.value)
  ).innerHTML;
  const requiresEdition =
    edition.length > 0
      ? arrayToUL(edition.map((ed) => ed.value)).innerHTML
      : '<span style="color: #97A0AF"><strong> NO </strong></span>';
  const requiresAutomation = automation ? " YES " : " NO ";

  let clipboardContent = `
       <span style="display: inline-block;margin: 10px 0">
           <strong>What:</strong>
        </span>
       ${what}
       </br>
        <span style="color:#6554C0; display: inline-block;margin: 10px 0">
           <strong>Acceptance Criteria:</strong>
        </span>
        ${criteriasList}
        </br>
        <span style="color:#36B37E; display: inline-block;margin: 10px 0">
           <strong>Technical Guidance:</strong>
        </span>
       ${techGuide}
       </br>
         <span style="color:#0747A6; display: inline-block;margin: 10px 0">
           <strong>Dependencies:</strong>
        </span>
       ${deps}
       </br>
        <span style="color:#FF991F; display: inline-block;margin: 10px 0">
           <strong>Requires a Feature Flag:</strong>
        </span>
       <span style="color: #97A0AF; display: inline-block;margin: 10px 0">
            <strong> ${requiresFF}</strong>
       </span>
      <br/>
        <span style="color:#FF5630; display: inline-block;margin: 10px 0">
           <strong>Impacted Projects:</strong>
        </span>
       ${impactedProjects}
       </br>
        <span style="color:#403294; display: inline-block;margin: 10px 0">
           <strong>Requires an Edition:</strong>
        </span>
       ${requiresEdition}
       </br>
               <span style="color:#008DA6; display: inline-block;margin: 10px 0">
           <strong>Requires Automation Test:</strong>
        </span>
       <span style="color: #97A0AF">
            <strong> ${requiresAutomation}</strong>
       </span>
        `;

  // TODO -> use state to create an elaborate preview with colors and such
  return (
    <>
      <Typography align="center" variant="h5">
        PREVIEW
      </Typography>
      <div dangerouslySetInnerHTML={{ __html: clipboardContent }}></div>
      <Button variant="contained" color={"success"} onClick={handleCopyClick}>
        Copy to clipboard
      </Button>
    </>
  );
}
