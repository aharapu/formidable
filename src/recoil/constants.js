// TODO -> place all keys here
export const RECOIL_KEY = {
    input: {
        atom: {
            prefix: 'input-atom-',
        },
    },
    feature: {
        what: {
            atom: 'feature-what-atom',
            selector: 'feature-what-selector',
        },
    },
    scenario: {
        atom: {
            prefix: 'scenario-atom-',
            testScenarios: 'test-scenarios-atom',
        },
        selector: {
            testScenarios: 'test-scenarios-selector',
        },
    },
};

export const SCENARIO_SECTION = {
    GIVEN: 'given',
    WHEN: 'when',
    THEN: 'then',
};

export const SCENARIO_SECTIONS = Object.values(SCENARIO_SECTION);
