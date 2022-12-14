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

const HTML_BR_STRING = `<br />`;

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

  const handleCopyClick = () => {
    updateClipboard({
      what,
      criterias,
      techGuidance,
      dependencies,
      featureFlag: FF,
      impactedProjects: getValues(impactedProj),
      requiredEditions: getValues(edition),
    });
  };

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
      {/* TODO -> break into reusable components? */}
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
                      <strong>{idx === 0 ? "Then " : "And "}</strong>
                      {w.value}
                    </Typography>
                  </li>
                </ul>
              ))}
              {ti.then.map((t, idx) => (
                <ul key={t.id} className="preview-list">
                  <li>
                    <Typography>
                      <strong>{idx === 0 ? "When " : "And "}</strong>
                      {t.value}
                    </Typography>
                  </li>
                </ul>
              ))}
            </>
          ))}
        </>
      )}
      <Typography
        variant="subtitle1"
        style={{ marginTop: 16, color: LIGHT_GRAY }}
      >
        {"REQUIRES AUTOMATION - "}
        <strong style={{ color: DARK_GREY }}>
          {automation ? "YES" : "NO"}
        </strong>
      </Typography>
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

// TODO -> move this to a utils file
function updateClipboard({
  what,
  criterias,
  techGuidance,
  dependencies,
  featureFlag,
  impactedProjects,
  requiredEditions,
  testingScenarios,
  automation,
}) {
  const criteriaValues = getValues(criterias);
  const depValues = getValues(dependencies);

  const cc = new ClipboardContent();

  cc.addHeading({ content: "What:", color: LIGHT_GRAY })
    .addParagraph({ content: what })
    .addHeading({ content: "Acceptance Criteria:", color: PURPLE })
    .addList(criteriaValues);

  // TODO -> trim and capitalize?
  if (techGuidance) {
    cc.addHeading({
      content: "Technical Guidance:",
      color: GREEN,
    }).addParagraph({
      content: techGuidance,
    });
  }

  if (dependencies.length > 0) {
    cc.addHeading({ content: "Dependencies:", color: BLUE }).addList(depValues);
  }

  if (featureFlag) {
    cc.addHeading({ content: "Feature Flag:", color: ORANGE }).addParagraph({
      content: featureFlag,
    });
  }

  cc.addHeading({ content: "Impacted Projects:", color: DARK_RED }).addList(
    impactedProjects
  );

  if (requiredEditions.length > 0) {
    cc.addHeading({ content: "Required Editions:", color: RED }).addList(
      requiredEditions
    );
  }

  const content = cc.getContent();

  console.log("content", content);

  const type = "text/html";
  const blob = new Blob([content], { type });
  const data = [new ClipboardItem({ [type]: blob })];

  return navigator.clipboard.write(data);
}

function getValues(objects = []) {
  return objects.map((o) => o.value);
}

class ClipboardContent {
  // TODO -> turn content into array?
  constructor() {
    this.content = "";
  }

  _private_addHtmlTagString({ tag, content, color }) {
    // TODO -> tag should be limited to certain strings
    const style = color ? `style="color:${color};"` : "";

    this.content += `<${tag} ${style}>${content}</${tag}>`;
  }

  addHeading({ content, color }) {
    this._private_addHtmlTagString({ tag: "h4", content, color });
    return this;
  }

  addParagraph({ content }) {
    this._private_addHtmlTagString({ tag: "p", content });
    return this;
  }

  addList(values = []) {
    const list = buildHtmlListString(values);
    this.content += list;
    return this;
  }

  // TODO -> add possibility to indent?
  getContent() {
    return this.content;
  }
}

function buildHtmlListString(values = []) {
  let result = `<ul>`;
  values.forEach((val) => {
    result += `<li>${val}</li>`;
  });
  result += `</ul>`;
  return result;
}
