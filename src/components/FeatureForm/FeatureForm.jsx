import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { v4 as createId } from 'uuid';
import { Box, Grid, Typography } from '@mui/material';

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
} from '../../constants';

import { InputList } from '../InputList';
import { FormTextField } from '../FormTextField';
import { FormCheckbox } from '../FormCheckbox';
import { TestingInstructions } from '../TestingInstructions';
import { FormSwitchButton } from '../FormSwitchButton';
import { FormDelimiterLine } from '../form/FormDelimiterLine';

import { LABLES, PLACEHOLDERS } from './featureFormConstants';
import { validateWhat } from './utils';

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
        featureRequireAutomationTest,
    );
    const [validErr, setValidErr] = useRecoilState(formValidationErrors);

    const [whatErr, setWhatErr] = useState(null);
    const [showDependencies, setShowDependencies] = useState(false);
    const [showEditions, setShowEditions] = useState(false);
    const [showFeatureFlag, setShowFeatureFlag] = useState(false);

    const cachedDeps = useRef(deps);
    const cachedEditions = useRef(editions);

    const handleWhatChange = (e) => {
        setWhat(e.target.value);
        if (whatErr) {
            setWhatErr(null);
            setValidErr((prev) => prev.filter((err) => err !== 'feature-what'));
        }
    };

    const handleWhatBlur = () => {
        const err = validateWhat(what);
        if (err) {
            setWhatErr(err);
            if (!validErr.includes('feature-what')) {
                setValidErr((prev) => [...prev, 'feature-what']);
            }
        }
    };

    // TODO -> get DRY?
    const handleAddCriteria = () => {
        setACs((prev) => [...prev, { id: createId(), value: '', error: '' }]);
    };

    // TODO -> criteriaChange or changeCriteria? decide on one!
    const handleCriteriaChange = (critId, value) => {
        setACs((prevACs) =>
            prevACs.map((ac) => {
                if (ac.id === critId) {
                    return { ...ac, value, error: '' };
                }
                return ac;
            }),
        );
    };

    const handleDelCriteria = (critId) => {
        setACs((prevACs) => prevACs.filter((ac) => ac.id !== critId));
    };

    const handleACsBlur = (id, error) => {
        setACs((prevACs) =>
            prevACs.map((ac) => {
                if (ac.id === id) {
                    return { ...ac, error };
                }
                return ac;
            }),
        );
    };

    const handleAddDeps = () => {
        setDeps((prev) => [...prev, { id: createId(), value: '', error: '' }]);
    };

    const handleDepsChange = (depId, value) => {
        setDeps((prevDeps) =>
            prevDeps.map((dep) => {
                if (dep.id === depId) {
                    return { ...dep, value, error: '' };
                }
                return dep;
            }),
        );
    };

    const handleDelDeps = (depId) => {
        setDeps((prevDeps) => prevDeps.filter((dep) => dep.id !== depId));
    };

    const handleAddProj = () => {
        setImpactProjs((prev) => [...prev, { id: createId(), value: '', error: '' }]);
    };

    const handleProjChange = (projId, value) => {
        setImpactProjs((prevProjs) =>
            prevProjs.map((pr) => {
                if (pr.id === projId) {
                    return { ...pr, value, error: '' };
                }
                return pr;
            }),
        );
    };

    const handleDelProj = (projId) => {
        setImpactProjs((prevProjs) => prevProjs.filter((pr) => pr.id !== projId));
    };

    const handleAddEdition = () => {
        setEditions((prev) => [...prev, { id: createId(), value: '', error: '' }]);
    };

    const handleEditionChange = (editionId, value) => {
        setEditions((prevEditions) =>
            prevEditions.map((edition) => {
                if (edition.id === editionId) {
                    return { ...edition, value, error: '' };
                }
                return edition;
            }),
        );
    };

    const handleDelEdition = (editionId) => {
        setEditions((prevEditions) =>
            prevEditions.filter((edition) => edition.id !== editionId),
        );
    };

    const handleDepsToggle = () => {
        const isHiding = showDependencies;

        if(isHiding) {
            cachedDeps.current = deps;
        }

        const depsToSet = isHiding ? [] :
            cachedDeps.current.length ? cachedDeps.current
                : [{ id: createId(), value: '', error: '' }];

        setDeps(depsToSet);
        setShowDependencies((prev) => !prev);
    };

    const handleToggleFlag = () => {
        setShowFeatureFlag((prev) => !prev);
        // TODO -> else restore previous state ("keep in ref")
    };

    const handleToggleEditions = () => {
        const isHiding = showEditions;

        if(isHiding) {
            cachedEditions.current = editions;
        }

        const editionsToSet = isHiding ? [] :
            cachedEditions.current.length ? cachedEditions.current
                : [{ id: createId(), value: '', error: '' }];

        setEditions(editionsToSet);
        setShowEditions((prev) => !prev);
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
        let name;
        switch (changeType) {
        case 'add-test':
            setTestInstructions((prev) => [
                ...prev,
                {
                    scenarioName: '',
                    scenarioId: createId(),
                    given: [{ id: createId(), value: '' }],
                    when: [{ id: createId(), value: '' }],
                    then: [{ id: createId(), value: '' }],
                },
            ]);
            break;
        case 'delete-test':
            setTestInstructions((prev) =>
                prev.filter((t) => t.scenarioId !== scenarioId),
            );
            break;
        case 'edit-scenario-name':
            name = data.scenarioName;
            existingScenario = testIntructions.find(
                (t) => t.scenarioId === scenarioId,
            );
            updatedScenario = { ...existingScenario, scenarioName: name };
            updatedInstructions = testIntructions.map((t) =>
                t.scenarioId === scenarioId ? updatedScenario : t,
            );
            setTestInstructions(updatedInstructions);
            break;
        case 'edit-given-value':
            existingScenario = testIntructions.find(
                (t) => t.scenarioId === scenarioId,
            );
            existingInput = existingScenario.given.find((g) => g.id === givenId);
            updatedInput = { ...existingInput, value };
            updatedInputArray = existingScenario.given.map((g) =>
                g.id === givenId ? updatedInput : g,
            );
            updatedScenario = { ...existingScenario, given: updatedInputArray };
            updatedInstructions = testIntructions.map((t) =>
                t.scenarioId === scenarioId ? updatedScenario : t,
            );
            setTestInstructions(updatedInstructions);
            break;
        case 'edit-when-value':
            existingScenario = testIntructions.find(
                (t) => t.scenarioId === scenarioId,
            );
            existingInput = existingScenario.when.find((w) => w.id === whenId);
            updatedInput = { ...existingInput, value };
            updatedInputArray = existingScenario.when.map((w) =>
                w.id === whenId ? updatedInput : w,
            );
            updatedScenario = { ...existingScenario, when: updatedInputArray };
            updatedInstructions = testIntructions.map((t) =>
                t.scenarioId === scenarioId ? updatedScenario : t,
            );
            setTestInstructions(updatedInstructions);
            break;
        case 'edit-then-value':
            existingScenario = testIntructions.find(
                (t) => t.scenarioId === scenarioId,
            );
            existingInput = existingScenario.then.find((t) => t.id === thenId);
            updatedInput = { ...existingInput, value };
            updatedInputArray = existingScenario.then.map((t) =>
                t.id === thenId ? updatedInput : t,
            );
            updatedScenario = { ...existingScenario, then: updatedInputArray };
            updatedInstructions = testIntructions.map((t) =>
                t.scenarioId === scenarioId ? updatedScenario : t,
            );
            setTestInstructions(updatedInstructions);
            break;
        case 'add-given':
            existingScenario = testIntructions.find(
                (t) => t.scenarioId === scenarioId,
            );
            updatedInputArray = [
                ...existingScenario.given,
                {
                    id: createId(),
                    value: '',
                },
            ];
            updatedScenario = { ...existingScenario, given: updatedInputArray };
            updatedInstructions = testIntructions.map((t) =>
                t.scenarioId === scenarioId ? updatedScenario : t,
            );
            setTestInstructions(updatedInstructions);
            break;
        case 'add-when':
            existingScenario = testIntructions.find(
                (t) => t.scenarioId === scenarioId,
            );
            updatedInputArray = [
                ...existingScenario.when,
                {
                    id: createId(),
                    value: '',
                },
            ];
            updatedScenario = { ...existingScenario, when: updatedInputArray };
            updatedInstructions = testIntructions.map((t) =>
                t.scenarioId === scenarioId ? updatedScenario : t,
            );
            setTestInstructions(updatedInstructions);
            break;
        case 'add-then':
            existingScenario = testIntructions.find(
                (t) => t.scenarioId === scenarioId,
            );
            updatedInputArray = [
                ...existingScenario.then,
                {
                    id: createId(),
                    value: '',
                },
            ];
            updatedScenario = { ...existingScenario, then: updatedInputArray };
            updatedInstructions = testIntructions.map((t) =>
                t.scenarioId === scenarioId ? updatedScenario : t,
            );
            setTestInstructions(updatedInstructions);
            break;
        case 'delete-given':
            existingScenario = testIntructions.find(
                (t) => t.scenarioId === scenarioId,
            );
            (updatedInputArray = existingScenario.given.filter(
                (g) => g.id !== givenId,
            )),
            (updatedScenario = { ...existingScenario, given: updatedInputArray });
            updatedInstructions = testIntructions.map((t) =>
                t.scenarioId === scenarioId ? updatedScenario : t,
            );
            setTestInstructions(updatedInstructions);
            break;
        case 'delete-when':
            existingScenario = testIntructions.find(
                (t) => t.scenarioId === scenarioId,
            );
            (updatedInputArray = existingScenario.when.filter(
                (w) => w.id !== whenId,
            )),
            (updatedScenario = { ...existingScenario, when: updatedInputArray });
            updatedInstructions = testIntructions.map((t) =>
                t.scenarioId === scenarioId ? updatedScenario : t,
            );
            setTestInstructions(updatedInstructions);
            break;
        case 'delete-then':
            existingScenario = testIntructions.find(
                (t) => t.scenarioId === scenarioId,
            );
            (updatedInputArray = existingScenario.then.filter(
                (t) => t.id !== thenId,
            )),
            (updatedScenario = { ...existingScenario, then: updatedInputArray });
            updatedInstructions = testIntructions.map((t) =>
                t.scenarioId === scenarioId ? updatedScenario : t,
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
    // TODO -> when last input is focused and empty, and ESC is pressed
    //         delete the input and focus on next element in form

    return (
        <Box
            style={{
                margin: '0 auto',
                maxWidth: '800px',
                padding: '0 20px',
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
                <FormDelimiterLine />
                <InputList
                    title={LABLES.acceptanceCriteriaTitle}
                    textFieldLabel={LABLES.acceptCritInput}
                    textFieldPlaceholder={PLACEHOLDERS.acceptCritInput}
                    textFieldOnBlur={handleACsBlur}
                    items={ACs}
                    // TODO -> use an array and provide pseudorandom placeholders
                    // TODO -> if this is a function, it will auto switch to new random placeholder
                    onAdd={handleAddCriteria}
                    onChange={handleCriteriaChange}
                    onDelete={handleDelCriteria}
                />
                <FormDelimiterLine />
                <FormTextField
                    label={LABLES.techGuide}
                    placeholder={PLACEHOLDERS.techGuide}
                    multiline
                    value={techGuide}
                    onChange={(e) => setTechGuide(e.target.value)}
                />
                <FormSwitchButton
                    label={LABLES.depsToggle}
                    value={showDependencies}
                    onChange={handleDepsToggle}
                />
                {showDependencies && (
                    <>
                        <InputList
                            title={LABLES.depsInput}
                            textFieldPlaceholder={PLACEHOLDERS.depsInput}
                            toggleLabel={LABLES.depsToggle}
                            items={deps}
                            onAdd={handleAddDeps}
                            onChange={handleDepsChange}
                            onDelete={handleDelDeps}
                        />
                        <FormDelimiterLine />
                    </>
                )}
                <FormSwitchButton
                    label={LABLES.flagToggle}
                    value={showFeatureFlag}
                    onChange={handleToggleFlag}
                />
                {
                    showFeatureFlag && (
                        <FormTextField
                            label={LABLES.flagInput}
                            placeholder={PLACEHOLDERS.flagInput}
                            value={flag}
                            onChange={(e) => setFlag(e.target.value)}
                            showToggle
                            toggleLabel={LABLES.flagToggle}
                            topGap="tiny"
                        />
                    )
                }
                <FormDelimiterLine isVisible={showFeatureFlag} bottomGap={showFeatureFlag ? 'huge' : 'tiny'} />
                <InputList
                    title={LABLES.imapctedProj}
                    textFieldPlaceholder={PLACEHOLDERS.imapctedProj}
                    items={impactProjs}
                    onAdd={handleAddProj}
                    onChange={handleProjChange}
                    onDelete={handleDelProj}
                />
                <FormSwitchButton
                    label={LABLES.editionToggle}
                    value={showEditions}
                    onChange={handleToggleEditions}
                />
                {showEditions && <InputList
                    title={LABLES.editionInput}
                    textFieldPlaceholder={PLACEHOLDERS.editionInput}
                    items={editions}
                    onAdd={handleAddEdition}
                    onChange={handleEditionChange}
                    onDelete={handleDelEdition}
                />}
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
