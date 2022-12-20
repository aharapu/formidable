// TODO -> in this file, replace testInstructions with scenarios
import { v4 as createId } from 'uuid';

export const SECTION_TYPE = {
    GIVEN: 'given',
    WHEN: 'when',
    THEN: 'then',
};

export const SECTION_TYPES = Object.values(SECTION_TYPE);

export const newScenario = () => ({
    id: createId(),
    name: '',
    [SECTION_TYPE.GIVEN]: [{ id: createId(), value: '' }],
    [SECTION_TYPE.WHEN]: [{ id: createId(), value: '' }],
    [SECTION_TYPE.THEN]: [{ id: createId(), value: '' }],
});

export const updateScenarioInput = (scenario, sectionType, inputId, value) => ({
    ...scenario,
    [sectionType]: scenario[sectionType].map((input) => {
        if (input.id === inputId) {
            return { ...input, value };
        }
        return input;
    }),
});

export const deleteScenarioInput = (scenario, sectionType, inputId) => ({
    ...scenario,
    [sectionType]: scenario[sectionType].filter((input) => input.id !== inputId),
});

// testInstructions is an array of scenario objects
export const newTestInstructions = () => [];

export const addScenario = (testInstructions) => [...testInstructions, newScenario()];

export const addTestInstructionsInput = (testInstructions, scenarioId, sectionType) => {
    return testInstructions.map((scenario) => {
        if (scenario.id === scenarioId) {
            return {
                ...scenario,
                [sectionType]: [...scenario[sectionType], { id: createId(), value: '' }],
            };
        }
        return scenario;
    });
};

export const deleteTestInstructionsInput = (testInstructions, scenarioId, sectionType, inputId) => {
    return testInstructions.map((scenario) => {
        if (scenario.id === scenarioId) {
            return deleteScenarioInput(scenario, sectionType, inputId);
        }
        return scenario;
    });
};

export const updateScenarioName = (testInstructions, scenarioId, name) => {
    return testInstructions.map((scenario) => {
        if (scenario.id === scenarioId) {
            return { ...scenario, name };
        }
        return scenario;
    });
};

export const updateTestInstructionsInput = (testInstructions, scenarioId, sectionType, inputId, value) => {
    return testInstructions.map((scenario) => {
        if (scenario.id === scenarioId) {
            return updateScenarioInput(scenario, sectionType, inputId, value);
        }
        return scenario;
    });
};

export const deleteScenario = (testInstructions, scenarioId) => {
    return testInstructions.filter((scenario) => scenario.id !== scenarioId);
};
