import { useRecoilState } from "recoil";
import { v4 as createId } from "uuid";
import { Paper, Grid } from "@mui/material";

import {
  featureACs,
  featureDeps,
  featureFlag,
  featureImpactedProj,
  featureRequireAutomationTest,
  featureRequireEdition,
  featureTechGuide,
  featureWhat,
} from "../../constants";

import { BulletContent } from "../BulletContent";
import { LABLES, PLACEHOLDERS } from "./featureFormConstants";
import { FormTextField } from "../FormTextField";
import { FormCheckbox } from "../FormCheckbox";

export default function FeatureForm() {
  const [what, setWhat] = useRecoilState(featureWhat);
  const [ACs, setACs] = useRecoilState(featureACs);
  const [techGuide, setTechGuide] = useRecoilState(featureTechGuide);
  const [deps, setDeps] = useRecoilState(featureDeps);
  const [flag, setFlag] = useRecoilState(featureFlag);
  const [impactProjs, setImpactProjs] = useRecoilState(featureImpactedProj);
  const [editions, setEditions] = useRecoilState(featureRequireEdition);
  const [requireAutomation, setRequireAutomation] = useRecoilState(
    featureRequireAutomationTest
  );

  // TODO -> get DRY?
  const handleAddCriteria = (criteria) => {
    setACs((prev) => [...prev, { id: createId(), value: criteria }]);
  };

  const handleDelCriteria = (critId) => {
    setACs((prevACs) => prevACs.filter((ac) => ac.id !== critId));
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

  const handleRequireAutoChange = (isRequired) => {
    setRequireAutomation(isRequired);
  };

  return (
    <Paper
      style={{ margin: "0 auto", maxWidth: "800px", padding: "20px" }}
      elevation={3}
    >
      <Grid container spacing={3}>
        <FormTextField
          label={LABLES.what}
          placeholder={PLACEHOLDERS.what}
          multiline
          value={what}
          onChange={(e) => setWhat(e.target.value)}
        />
        <BulletContent
          textFieldLabel={LABLES.acceptCritInput}
          textFieldPlaceholder={PLACEHOLDERS.acceptCritInput}
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
        <FormCheckbox
          label={LABLES.requiresAutomation}
          value={requireAutomation}
          onChange={handleRequireAutoChange}
        />
      </Grid>
    </Paper>
  );
}
