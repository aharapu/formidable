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
        acceptanceCriterias: {
            atom: 'feature-acceptance-criterias-atom',
        },
    },
    loading: {
        atom: 'loading-atom',
    },
    navigation: {
        atom: 'navigation-atom',
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
    user: {
        atom: 'user-atom',
    },
};

export const SCENARIO_SECTION = {
    GIVEN: 'given',
    WHEN: 'when',
    THEN: 'then',
};

export const SCENARIO_SECTIONS = Object.values(SCENARIO_SECTION);
