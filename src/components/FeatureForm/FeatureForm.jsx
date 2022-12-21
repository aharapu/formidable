import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { v4 as createId } from 'uuid';
import { Box, Grid, Typography } from '@mui/material';

import {
    featureImpactedProj,
    featureRequireAutomationTest,
    featureRequireEdition,
    featureTestInstruct,
} from '../../constants';

import { InputList } from '../InputList';
import {
    getInputListAdder, getInputListDeleter, getInputListValueUpdater,
} from '../InputList/utils';

import { FormCheckbox } from '../FormCheckbox';
import { TestingInstructions } from '../TestingInstructions';
import { FormSwitchButton } from '../FormSwitchButton';
import { FormDelimiterLine } from '../form/FormDelimiterLine';

import { LABLES, PLACEHOLDERS } from './featureFormConstants';
import {
    addScenario, addTestInstructionsInput, deleteScenario, deleteTestInstructionsInput,
    updateScenarioName, updateTestInstructionsInput,
} from '../../state-utils/scenarios';
import { InputWhat } from './components/InputWhat/InputWhat';
import { InputListCriteria } from './components/InputListCriteria/InputListCriteria';
import { TechnicalGuidance } from './components/TechnicalGuidance/TechnicalGuidance';
import { Dependencies } from './components/Dependencies/Dependencies';
import { FeatureFlag } from './components/FeatureFlag/FeatureFlag';

export default function FeatureForm() {
    const [impactProjs, setImpactProjs] = useRecoilState(featureImpactedProj);
    const [editions, setEditions] = useRecoilState(featureRequireEdition);
    const [testIntructions, setTestInstructions] =
    useRecoilState(featureTestInstruct);
    const [requireAutomation, setRequireAutomation] = useRecoilState(
        featureRequireAutomationTest,
    );

    const [showEditions, setShowEditions] = useState(false);

    const cachedEditions = useRef(editions);

    const addProject = getInputListAdder(setImpactProjs);
    const updateProject = getInputListValueUpdater(setImpactProjs);
    const deleteProject = getInputListDeleter(setImpactProjs);

    const addEdition = getInputListAdder(setEditions);
    const updateEdition = getInputListValueUpdater(setEditions);
    const deleteEdition = getInputListDeleter(setEditions);



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
        const scenarioName = data?.scenarioName;
        const sectionType = data?.sectionType;
        const inputValue = data?.inputValue;
        const inputId = data?.inputId;

        switch (changeType) {
        case 'add-scenario':
            setTestInstructions(addScenario(testIntructions));
            break;
        case 'delete-scenario':
            setTestInstructions(deleteScenario(testIntructions, scenarioId));
            break;
        case 'edit-scenario-name':
            setTestInstructions(updateScenarioName(testIntructions, scenarioId, scenarioName));
            break;
        case 'edit-input-value':
            setTestInstructions(
                updateTestInstructionsInput(testIntructions, scenarioId, sectionType, inputId, inputValue),
            );
            break;
        case 'add-input':
            setTestInstructions(addTestInstructionsInput(testIntructions, scenarioId, sectionType));
            break;
        case 'delete-input':
            setTestInstructions(
                deleteTestInstructionsInput(testIntructions, scenarioId, sectionType, inputId),
            );
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
                <InputWhat />
                <FormDelimiterLine />
                <InputListCriteria />
                <FormDelimiterLine />
                <TechnicalGuidance />
                <Dependencies />
                <FeatureFlag />
                <InputList
                    title={LABLES.imapctedProj}
                    textFieldPlaceholder={PLACEHOLDERS.imapctedProj}
                    items={impactProjs}
                    onAdd={addProject}
                    onChange={updateProject}
                    onDelete={deleteProject}
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
                    onAdd={addEdition}
                    onChange={updateEdition}
                    onDelete={deleteEdition}
                />}
                <TestingInstructions
                    scenarios={testIntructions} // TODO -> rename state to testScenarios
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
