import React from "react";
import { useRecoilValue } from "recoil";

import { Button, Typography, Paper } from "@mui/material";

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
  DARK_GREY,
  DARK_PURPLE,
  LIGHT_GRAY,
  PURPLE,
  GREEN,
  BLUE,
  ORANGE,
  DARK_RED,
  RED,
  DARK_TEAL,
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
        alert("copied!");
      },
      function () {
        alert("error!");
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
        li.style = `font-family: 'Source Sans Pro'; padding-left: 16px; color: ${DARK_GREY}`;
        return li;
      })
    );
    return ul;
  };

  const displayTestInstructions = (testingInstructions) => {
    let displayText = "<ul>";
    testingInstructions.map((testInstruc) => {
      displayText += "<li>" + testInstruc.scenarioName;
      const givenValues = testInstruc.given.map((elem) => elem.value);
      const whenValues = testInstruc.when.map((elem) => elem.value);
      const thenValues = testInstruc.then.map((elem) => elem.value);
      displayText +=
        "<ul><li><strong> Given </strong>" +
        givenValues.join(" <strong> and </strong>") +
        "</li>";
      displayText +=
        "<li><strong> Then </strong>" +
        thenValues.join("<strong> and </strong>") +
        "</li>";
      displayText +=
        "<li><strong> When </strong>" +
        whenValues.join("<strong> and </strong>") +
        "</li></ul>";
    });
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
      : `<strong style="font-size: 20px; color: ${DARK_GREY}"> NO </strong>`;
  const testInstructions =
    featureTestInstructions.length > 0 &&
    featureTestInstructions[0].scenarioName
      ? displayTestInstructions(featureTestInstructions)
      : "";
  const requiresAutomation = automation ? " YES " : " NO ";
  let clipboardContent = `
        <span style="color:#97A0AF; width: 407px; height: 19px; left:1067px; top: 371px;font-family: 'Source Sans Pro'; display: inline-block;margin: 10px 0; font-weight:600; font-size: 16px;">
          WHAT
        </span>
        <br />
        <span style="font-family: 'Source Sans Pro'">${what}</span>
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
           FEATURE FLAG: <strong style="font-size: 20px; color: ${DARK_GREY}">${requiresFF}</strong>
        </span>
      <br/>
        <span style="color:#BF2600; width: 407px; height: 19px; left:1067px; top: 371px;font-family: 'Source Sans Pro'; display: inline-block;margin: 10px 0; font-weight:600; font-size: 16px;">
           IMPACTED PROJECTS
        </span>
       ${impactedProjects}
       </br>
        <span style="color:#FF5630; width: 407px; height: 19px; left:1067px; top: 371px;font-family: 'Source Sans Pro'; display: inline-block;margin: 10px 0; font-weight:600; font-size: 16px;">
          REQUIRES AN EDITION: ${requiresEdition}
        </span>
       </br>
        <span style="color:#008DA6; width: 407px; height: 19px; left:1067px; top: 371px;font-family: 'Source Sans Pro'; display: inline-block;margin: 10px 0; font-weight:600; font-size: 16px;">
           TESTING SCENARIOS
        </span>
       ${testInstructions}
       </br>
       <span style="color:#97A0AF; width: 407px; height: 19px; left:1067px; top: 371px;font-family: 'Source Sans Pro'; display: inline-block;margin: 10px 0; font-weight:600; font-size: 16px;">
           REQUIRES AUTOMATION TESTING: <strong style="font-size: 20px; color: ${DARK_GREY}"> ${requiresAutomation}</strong>
        </span>
        `;

  // TODO -> use state to create an elaborate preview with colors and such
  return (
    <Paper
      style={{
        padding: "24px",
        maxWidth: "420px",
        maxHeight: "calc(100vh - 92px)",
        overflow: "scroll",
      }}
      elevation={3}
    >
      <Typography variant="h2" style={{ marginBottom: 24 }}>
        Feature Form Preview
      </Typography>
      <Typography
        variant="subtitle1"
        style={{ marginTop: 16, color: LIGHT_GRAY }}
      >
        WHAT
      </Typography>
      <Typography variant="body1" color="text.primary">
        {what}
      </Typography>
      <Typography variant="subtitle1" style={{ marginTop: 16, color: PURPLE }}>
        ACCEPTANCE CRITERIA
      </Typography>
      <ul className="preview-list">
        {criterias.map((c) => (
          <li>
            <Typography variant="body1">{c.value}</Typography>
          </li>
        ))}
      </ul>
      {techGuidance && (
        <>
          <Typography
            variant="subtitle1"
            style={{ marginTop: 16, color: GREEN }}
          >
            TECHNICAL GUIDANCE
          </Typography>
          <ul className="preview-list">
            <li>
              <Typography variant="body1">{techGuidance}</Typography>
            </li>
          </ul>
        </>
      )}
      {dependencies.length > 0 && (
        <>
          <Typography
            variant="subtitle1"
            style={{ marginTop: 16, color: BLUE }}
          >
            DEPENDENCIES
          </Typography>
          <ul className="preview-list">
            {dependencies.map((d) => (
              <li key={d.id}>
                <Typography variant="body1">{d.value}</Typography>
              </li>
            ))}
          </ul>
        </>
      )}
      {FF && (
        <>
          <Typography
            variant="subtitle1"
            style={{ marginTop: 16, color: ORANGE }}
          >
            FEATURE FLAG
          </Typography>
          <ul className="preview-list">
            <li>
              <Typography variant="body1">{FF}</Typography>
            </li>
          </ul>
        </>
      )}
      {impactedProj.length > 0 && (
        <>
          <Typography
            variant="subtitle1"
            style={{ marginTop: 16, color: DARK_RED }}
          >
            IMPACTED PROJECT
          </Typography>
          <ul className="preview-list">
            {impactedProj.map((proj) => (
              <li key={proj.id}>
                <Typography variant="body1">{proj.value}</Typography>
              </li>
            ))}
          </ul>
        </>
      )}
      {/* TODO -> add plural only when applicable */}
      {edition.length > 0 && (
        <>
          <Typography variant="subtitle1" style={{ marginTop: 16, color: RED }}>
            REQUIRES EDITIONS
          </Typography>
          <ul className="preview-list">
            {edition.map((ed) => (
              <li key={ed.id}>
                <Typography variant="body1">{ed.value}</Typography>
              </li>
            ))}
          </ul>
        </>
      )}
      {featureTestInstructions.length > 0 && (
        <>
          <Typography
            variant="subtitle1"
            style={{ marginTop: 16, color: DARK_TEAL }}
          >
            TESTING SCENARIOS
          </Typography>
          {featureTestInstructions.map((ti) => (
            <>
              <Typography>{ti.scenarioName}</Typography>
              {ti.given.map((g, idx) => (
                <ul key={g.id} className="preview-list">
                  <li>
                    <Typography>
                      <strong>{idx === 0 ? "Given " : "And "}</strong>
                      {g.value}
                    </Typography>
                  </li>
                </ul>
              ))}
              {ti.when.map((w, idx) => (
                <ul key={w.id} className="preview-list">
                  <li>
                    <Typography>
                      <strong>{idx === 0 ? "Given " : "And "}</strong>
                      {w.value}
                    </Typography>
                  </li>
                </ul>
              ))}
              {ti.then.map((t, idx) => (
                <ul key={t.id} className="preview-list">
                  <li>
                    <Typography>
                      <strong>{idx === 0 ? "Given " : "And "}</strong>
                      {t.value}
                    </Typography>
                  </li>
                </ul>
              ))}
            </>
          ))}
        </>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "36px",
        }}
      >
        <Button
          variant="contained"
          onClick={handleCopyClick}
          style={{ backgroundColor: "#172F4D", width: "190px", height: "42px" }}
        >
          Copy to clipboard
        </Button>
      </div>
    </Paper>
  );
}
