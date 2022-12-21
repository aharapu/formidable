import React from 'react';
import { useRecoilState } from 'recoil';
import { featureTestInstruct } from '../../../../constants';
import {
    addScenario, addTestInstructionsInput, deleteScenario, deleteTestInstructionsInput,
    updateScenarioName, updateTestInstructionsInput,
} from '../../../../state-utils/scenarios';
import { TestingInstructions } from '../../../TestingInstructions';

// TODO -> need to somehow only rerender a segment at a time
//         when a change is made to the state
//         (e.g. when a new scenario is added, only the new scenario should rerender)
//         (e.g. when a new input is added, only the new input should rerender)

export function TestScenarios() {
    const [testIntructions, setTestInstructions] = useRecoilState(featureTestInstruct);

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

    // TODO -> move testing instructions content here?
    return (
        <TestingInstructions
            scenarios={testIntructions} // TODO -> rename state to testScenarios
            onChange={handleTestInstructionsChange}
        />
    );
}
