import { useState } from "react";
import { useRecoilState } from "recoil";
import { v4 as createId, validate } from "uuid";
import { Box, Paper, Grid, Typography } from "@mui/material";

import {
  featureACs,
  featureDeps,
  featureFlag,
  featureImpactedProj,
  featureRequireAutomationTest,
  featureRequireEdition,
  featureTechGuide,
  featureTestInstruct,
  featureWhat,
  formValidationErrors,
} from "../../constants";

import { BulletContent } from "../BulletContent";
import { FormTextField } from "../FormTextField";
import { FormCheckbox } from "../FormCheckbox";
import { TestingInstructions } from "../TestingInstructions";

import { LABLES, PLACEHOLDERS } from "./featureFormConstants";
import { validateACs, validateWhat } from "./utils";

export default function FeatureForm() {
  const [what, setWhat] = useRecoilState(featureWhat);
  const [ACs, setACs] = useRecoilState(featureACs);
  const [techGuide, setTechGuide] = useRecoilState(featureTechGuide);
  const [deps, setDeps] = useRecoilState(featureDeps);
  const [flag, setFlag] = useRecoilState(featureFlag);
  const [impactProjs, setImpactProjs] = useRecoilState(featureImpactedProj);
  const [editions, setEditions] = useRecoilState(featureRequireEdition);
  const [testIntructions, setTestInstructions] =
    useRecoilState(featureTestInstruct);
  const [requireAutomation, setRequireAutomation] = useRecoilState(
    featureRequireAutomationTest
  );
  const [validErr, setValidErr] = useRecoilState(formValidationErrors);

  const [whatErr, setWhatErr] = useState(null);
  const [ACsErr, setACsErr] = useState(null);

  const handleWhatChange = (e) => {
    setWhat(e.target.value);
    if (whatErr) {
      setWhatErr(null);
      setValidErr((prev) => prev.filter((err) => err !== "feature-what"));
    }
  };

  const handleWhatBlur = () => {
    const err = validateWhat(what);
    if (err) {
      setWhatErr(err);
      if (!validErr.includes("feature-what")) {
        setValidErr((prev) => [...prev, "feature-what"]);
      }
    }
  };

  // TODO -> get DRY?
  const handleAddCriteria = (criteria) => {
    if (ACsErr) {
      setACsErr(null);
      setValidErr((prev) => prev.filter((err) => err !== "feature-ACs"));
    }
    setACs((prev) => [...prev, { id: createId(), value: criteria }]);
  };

  const handleDelCriteria = (critId) => {
    setACs((prevACs) => prevACs.filter((ac) => ac.id !== critId));
  };

  const handleACsBlur = () => {
    const err = validateACs(ACs);

    if (err) {
      setACsErr(err);
      if (!validErr.includes("feature-ACs")) {
        setValidErr((prev) => [...prev, "feature-ACs"]);
      }
    }
  };

  const handleAddDeps = (dep) => {
    setDeps((prev) => [...prev, { id: createId(), value: dep }]);
  };

  const handleDelDeps = (depId) => {
    setDeps((prevDeps) => prevDeps.filter((dep) => dep.id !== depId));
  };

  const handleAddProj = (proj) => {
    setImpactProjs((prev) => [...prev, { id: createId(), value: proj }]);
  };

  const handleDelProj = (projId) => {
    setImpactProjs((prevProjs) => prevProjs.filter((pr) => pr.id !== projId));
  };

  const handleAddEdition = (edition) => {
    setEditions((prev) => [...prev, { id: createId(), value: edition }]);
  };

  const handleDelEdition = (editionId) => {
    setEditions((prevEditions) =>
      prevEditions.filter((edition) => edition.id !== editionId)
    );
  };

  const handleToggleDeps = (isVisible) => {
    if (!isVisible) {
      setDeps([]);
    }
    // TODO -> else restore previous state ("keep in ref")
  };

  const handleToggleFlag = (isVisible) => {
    if (!isVisible) {
      setFlag("");
    }
    // TODO -> else restore previous state ("keep in ref")
  };

  const handleToggleEditions = (isVisible) => {
    if (!isVisible) {
      setEditions([]);
    }
    // TODO -> else restore previous state ("keep in ref")
  };

  const handleTestInstructionsChange = (changeType, data) => {
    const scenarioId = data?.scenarioId;
    const givenId = data?.givenId;
    const whenId = data?.whenId;
    const thenId = data?.thenId;
    const value = data?.value;

    let updatedInstructions;
    let existingScenario;
    let updatedScenario;
    let updatedInputArray;
    let existingInput;
    let updatedInput;
    let index;
    switch (changeType) {
      case "add-test":
        setTestInstructions((prev) => [
          ...prev,
          {
            scenarioName: "",
            scenarioId: createId(),
            given: [{ id: createId(), value: "" }],
            when: [{ id: createId(), value: "" }],
            then: [{ id: createId(), value: "" }],
          },
        ]);
        break;
      case "delete-test":
        setTestInstructions((prev) =>
          prev.filter((t) => t.scenarioId !== scenarioId)
        );
        break;
      case "edit-scenario-name":
        const name = data.scenarioName;
        existingScenario = testIntructions.find(
          (t) => t.scenarioId === scenarioId
        );
        updatedScenario = { ...existingScenario, scenarioName: name };
        updatedInstructions = testIntructions.map((t) =>
          t.scenarioId === scenarioId ? updatedScenario : t
        );
        setTestInstructions(updatedInstructions);
        break;
      case "edit-given-value":
        existingScenario = testIntructions.find(
          (t) => t.scenarioId === scenarioId
        );
        existingInput = existingScenario.given.find((g) => g.id === givenId);
        updatedInput = { ...existingInput, value };
        updatedInputArray = existingScenario.given.map((g) =>
          g.id === givenId ? updatedInput : g
        );
        updatedScenario = { ...existingScenario, given: updatedInputArray };
        updatedInstructions = testIntructions.map((t) =>
          t.scenarioId === scenarioId ? updatedScenario : t
        );
        setTestInstructions(updatedInstructions);
        break;
      case "edit-when-value":
        existingScenario = testIntructions.find(
          (t) => t.scenarioId === scenarioId
        );
        existingInput = existingScenario.when.find((w) => w.id === whenId);
        updatedInput = { ...existingInput, value };
        updatedInputArray = existingScenario.when.map((w) =>
          w.id === whenId ? updatedInput : w
        );
        updatedScenario = { ...existingScenario, when: updatedInputArray };
        updatedInstructions = testIntructions.map((t) =>
          t.scenarioId === scenarioId ? updatedScenario : t
        );
        setTestInstructions(updatedInstructions);
        break;
      case "edit-then-value":
        existingScenario = testIntructions.find(
          (t) => t.scenarioId === scenarioId
        );
        existingInput = existingScenario.then.find((t) => t.id === thenId);
        updatedInput = { ...existingInput, value };
        updatedInputArray = existingScenario.then.map((t) =>
          t.id === thenId ? updatedInput : t
        );
        updatedScenario = { ...existingScenario, then: updatedInputArray };
        updatedInstructions = testIntructions.map((t) =>
          t.scenarioId === scenarioId ? updatedScenario : t
        );
        setTestInstructions(updatedInstructions);
        break;
      case "add-given":
        existingScenario = testIntructions.find(
          (t) => t.scenarioId === scenarioId
        );
        updatedInputArray = [
          ...existingScenario.given,
          {
            id: createId(),
            value: "",
          },
        ];
        updatedScenario = { ...existingScenario, given: updatedInputArray };
        updatedInstructions = testIntructions.map((t) =>
          t.scenarioId === scenarioId ? updatedScenario : t
        );
        setTestInstructions(updatedInstructions);
        break;
      case "add-when":
        existingScenario = testIntructions.find(
          (t) => t.scenarioId === scenarioId
        );
        updatedInputArray = [
          ...existingScenario.when,
          {
            id: createId(),
            value: "",
          },
        ];
        updatedScenario = { ...existingScenario, when: updatedInputArray };
        updatedInstructions = testIntructions.map((t) =>
          t.scenarioId === scenarioId ? updatedScenario : t
        );
        setTestInstructions(updatedInstructions);
        break;
      case "add-then":
        existingScenario = testIntructions.find(
          (t) => t.scenarioId === scenarioId
        );
        updatedInputArray = [
          ...existingScenario.then,
          {
            id: createId(),
            value: "",
          },
        ];
        updatedScenario = { ...existingScenario, then: updatedInputArray };
        updatedInstructions = testIntructions.map((t) =>
          t.scenarioId === scenarioId ? updatedScenario : t
        );
        setTestInstructions(updatedInstructions);
        break;
      case "delete-given":
        existingScenario = testIntructions.find(
          (t) => t.scenarioId === scenarioId
        );
        (updatedInputArray = existingScenario.given.filter(
          (g) => g.id !== givenId
        )),
          (updatedScenario = { ...existingScenario, given: updatedInputArray });
        updatedInstructions = testIntructions.map((t) =>
          t.scenarioId === scenarioId ? updatedScenario : t
        );
        setTestInstructions(updatedInstructions);
        break;
      case "delete-when":
        existingScenario = testIntructions.find(
          (t) => t.scenarioId === scenarioId
        );
        (updatedInputArray = existingScenario.when.filter(
          (w) => w.id !== whenId
        )),
          (updatedScenario = { ...existingScenario, when: updatedInputArray });
        updatedInstructions = testIntructions.map((t) =>
          t.scenarioId === scenarioId ? updatedScenario : t
        );
        setTestInstructions(updatedInstructions);
        break;
      case "delete-then":
        existingScenario = testIntructions.find(
          (t) => t.scenarioId === scenarioId
        );
        (updatedInputArray = existingScenario.then.filter(
          (t) => t.id !== thenId
        )),
          (updatedScenario = { ...existingScenario, then: updatedInputArray });
        updatedInstructions = testIntructions.map((t) =>
          t.scenarioId === scenarioId ? updatedScenario : t
        );
        setTestInstructions(updatedInstructions);
        break;
      default:
        break;
    }
  };

  const handleRequireAutoChange = (isRequired) => {
    setRequireAutomation(isRequired);
  };

  // TODO -> when focused element is close to screen edge, scroll into view

  return (
    <Box
      style={{
        margin: "0 auto",
        maxWidth: "800px",
        padding: "0 20px",
      }}
    >
      <Typography variant="h2" paddingBottom="32px">
        Feature Form
      </Typography>
      <Grid container spacing={3}>
        <FormTextField
          label={LABLES.what}
          placeholder={PLACEHOLDERS.what}
          multiline
          value={what}
          onChange={handleWhatChange}
          onBlur={handleWhatBlur}
          error={Boolean(whatErr)}
          helperText={whatErr}
        />
        <BulletContent
          textFieldLabel={LABLES.acceptCritInput}
          textFieldPlaceholder={PLACEHOLDERS.acceptCritInput}
          textFieldOnBlur={handleACsBlur}
          textFieldShowError={Boolean(ACsErr)}
          textFieldError={ACsErr}
          items={ACs}
          // TODO -> use an array and provide pseudorandom placeholders
          // TODO -> if this is a function, it will auto switch to new random placeholder
          onAdd={handleAddCriteria}
          onDelete={handleDelCriteria}
        />
        <FormTextField
          label={LABLES.techGuide}
          placeholder={PLACEHOLDERS.techGuide}
          multiline
          value={techGuide}
          onChange={(e) => setTechGuide(e.target.value)}
        />
        <BulletContent
          textFieldLabel={LABLES.depsInput}
          textFieldPlaceholder={PLACEHOLDERS.depsInput}
          showToggle
          toggleLabel={LABLES.depsToggle}
          items={deps}
          onAdd={handleAddDeps}
          onToggleChange={handleToggleDeps}
          onDelete={handleDelDeps}
        />
        <FormTextField
          label={LABLES.flagInput}
          placeholder={PLACEHOLDERS.flagInput}
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          showToggle
          toggleLabel={LABLES.flagToggle}
          onToggleChange={handleToggleFlag}
        />
        <BulletContent
          textFieldLabel={LABLES.imapctedProj}
          textFieldPlaceholder={PLACEHOLDERS.imapctedProj}
          items={impactProjs}
          onAdd={handleAddProj}
          onDelete={handleDelProj}
        />
        <BulletContent
          textFieldLabel={LABLES.editionInput}
          textFieldPlaceholder={PLACEHOLDERS.editionInput}
          showToggle
          toggleLabel={LABLES.editionToggle}
          items={editions}
          onAdd={handleAddEdition}
          onDelete={handleDelEdition}
          onToggleChange={handleToggleEditions}
        />
        <TestingInstructions
          items={testIntructions}
          onChange={handleTestInstructionsChange}
        />
        <FormCheckbox
          label={LABLES.requiresAutomation}
          value={requireAutomation}
          onChange={handleRequireAutoChange}
        />
      </Grid>
    </Box>
  );
}
