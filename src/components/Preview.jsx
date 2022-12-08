import React from "react";
import {
  useRecoilValue,
} from "recoil";

import {
  Button,
} from "@mui/material";

import {
    featureACs,
    featureDeps,
    featureTechGuide,
    featureFlag,
    featureImpactedProj,
    featureRequireEdition,
    featureRequireAutomationTest
} from "../main";

export default function Preview() {
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
          li.style = ' margin: 10px 0;';
          return li;
        })
    );
    return ul;
  };


  const criteriasList = arrayToUL(criterias.map((criteria) => criteria.value)).innerHTML;
  const techGuide = arrayToUL([techGuidance]).innerHTML;
  const deps = dependencies.length> 0 ? arrayToUL(dependencies.map((dep) => dep.value)).innerHTML : '<span style="color: #97A0AF"><strong> NO </strong></span>';
  const requiresFF = FF? `YES - ${FF}` : ' NO ';
  const impactedProjects = arrayToUL(impactedProj.map((proj) => proj.value)).innerHTML;
  const requiresEdition = edition.length> 0 ? arrayToUL(edition.map((ed) => ed.value)).innerHTML : '<span style="color: #97A0AF"><strong> NO </strong></span>';
  const requiresAutomation = automation? ' YES ' : ' NO ';

  let clipboardContent = `
        <div>Preview</div>
        <span style="color:#6554C0">
           <strong>Acceptance Criteria:</strong>
        </span>
        ${criteriasList}
        <span style="color:#36B37E">
           <strong>Technical Guidance:</strong>
        </span>
       ${techGuide}
         <span style="color:#0747A6">
           <strong>Dependencies:</strong>
        </span>
       ${deps}
        <span style="color:#FF991F">
           <strong>Requires a Feature Flag:</strong>
        </span>
       <span style="color: #97A0AF">
            <strong> ${requiresFF}</strong>
       </span>
      <br/>
        <span style="color:#FF5630">
           <strong>Impacted Projects:</strong>
        </span>
       ${impactedProjects}
        <span style="color:#403294">
           <strong>Requires an Edition:</strong>
        </span>
       ${requiresEdition}
               <span style="color:#008DA6">
           <strong>Requires Automation Test:</strong>
        </span>
       <span style="color: #97A0AF">
            <strong> ${requiresAutomation}</strong>
       </span>
        `;

  // TODO -> use state to create an elaborate preview with colors and such
  return (
    <>
        <div dangerouslySetInnerHTML={{__html: clipboardContent}}></div>
        <Button onClick={handleCopyClick}>Copy to clipboard</Button>
    </>
  );
}
