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
    featureTestInstruct,
} from "../../constants";

export default function FeaturePreview() {
  const what = useRecoilValue(featureWhat);
  const criterias = useRecoilValue(featureACs);
  const techGuidance = useRecoilValue(featureTechGuide);
  const dependencies = useRecoilValue(featureDeps);
  const FF = useRecoilValue(featureFlag);
  const impactedProj = useRecoilValue(featureImpactedProj);
  const edition = useRecoilValue(featureRequireEdition);
  const featureTestInstructions = useRecoilValue(featureTestInstruct);
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


    const displayTestInstructions = (testingInstructions) => {
        let displayText = "<ul>";
        testingInstructions.map((testInstruc) => {
            displayText += "<li>"+testInstruc.scenarioName;
            const givenValues = testInstruc.given.map((elem) => elem.value);
            const whenValues = testInstruc.given.map((elem) => elem.value);
            const thenValues = testInstruc.given.map((elem) => elem.value);
            displayText += "<ul><li><strong> Given </strong>" +givenValues.join(" <strong> and </strong>")+"</li>";
            displayText +=   "<li><strong> Then </strong>" +thenValues.join("<strong> and </strong>")+"</li>";
            displayText += "<li><strong> When </strong>" +whenValues.join("<strong> and </strong>")+"</li></ul>";
        })
        displayText += "</ul>";
        return displayText;
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
  const testInstructions= featureTestInstructions.length > 0 ? displayTestInstructions(featureTestInstructions) : '';
  const requiresAutomation = automation ? " YES " : " NO ";
  let clipboardContent = `
        <span style="color:#97A0AF; width: 407px; height: 19px; left:1067px; top: 371px;font-family: 'Source Sans Pro'; display: inline-block;margin: 10px 0; font-weight:600; font-size: 16px;">
          WHAT
        </span>
       ${what}
       </br>
        <span style="color:#6554C0; width: 407px; height: 19px; left:1067px; top: 371px;font-family: 'Source Sans Pro'; display: inline-block;margin: 10px 0; font-weight:600; font-size: 16px;">
           ACCEPTANCE CRITERIA
        </span>
        ${criteriasList}
        </br>
        <span style="color:#36B37E; width: 407px; height: 19px; left:1067px; top: 371px;font-family: 'Source Sans Pro'; display: inline-block;margin: 10px 0; font-weight:600; font-size: 16px;">
           TECHNICAL GUIDANCE
        </span>
       ${techGuide}
       </br>
         <span style="color:#4C9AFF; width: 407px; height: 19px; left:1067px; top: 371px;font-family: 'Source Sans Pro'; display: inline-block;margin: 10px 0; font-weight:600; font-size: 16px;">
           DEPENDENCIES
        </span>
       ${deps}
       </br>
        <span style="color:#FF991F; width: 407px; height: 19px; left:1067px; top: 371px;font-family: 'Source Sans Pro'; display: inline-block;margin: 10px 0; font-weight:600; font-size: 16px;">
           FEATURE FLAG
        </span>
       <span style="color: #97A0AF; width: 407px; height: 19px; left:1067px; top: 371px;font-family: 'Source Sans Pro'; display: inline-block;margin: 10px 0; font-weight:600; font-size: 16px;">
            ${requiresFF}
       </span>
      <br/>
        <span style="color:#BF2600; width: 407px; height: 19px; left:1067px; top: 371px;font-family: 'Source Sans Pro'; display: inline-block;margin: 10px 0; font-weight:600; font-size: 16px;">
           IMPACTED PROJECTS
        </span>
       ${impactedProjects}
       </br>
        <span style="color:#FF5630; width: 407px; height: 19px; left:1067px; top: 371px;font-family: 'Source Sans Pro'; display: inline-block;margin: 10px 0; font-weight:600; font-size: 16px;">
          REQUIRES AN EDITION
        </span>
       ${requiresEdition}
       </br>
        <span style="color:#008DA6; width: 407px; height: 19px; left:1067px; top: 371px;font-family: 'Source Sans Pro'; display: inline-block;margin: 10px 0; font-weight:600; font-size: 16px;">
           TESTING SCENARIOS
        </span>
       ${testInstructions}
       </br>
       <span style="color:#97A0AF; width: 407px; height: 19px; left:1067px; top: 371px;font-family: 'Source Sans Pro'; display: inline-block;margin: 10px 0; font-weight:600; font-size: 16px;">
           REQUIRES AUTOMATION TESTING
        </span>
       <span style="color: #97A0AF">
            <strong> ${requiresAutomation}</strong>
       </span>
        `;

  // TODO -> use state to create an elaborate preview with colors and such
  return (
    <>
      <Typography align="center" variant="h4" color="#172F4D" fontFamily="Source Sans Pro">
        Feature Form Preview
      </Typography>
      <div dangerouslySetInnerHTML={{ __html: clipboardContent }}></div>
      <Button variant="contained" onClick={handleCopyClick}
              style={{backgroundColor: "#172F4D", width: "190px", height: "42px"}}
      >
        Copy to clipboard
      </Button>
    </>
  );
}
