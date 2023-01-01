import { getRandomIndex } from './utils';

const ACCEPTANCE_CRITERIA = {
    placeholders: [
        'UI displays new shiny button',
        'Shiny button displays "Click me!"',
        'Save button is diabled while saving',
        'User without permission cannot see the button',
    ],
};

const SCENARIO_NAME = {
    placeholders: [
        'Verify that user can login',
        'Verify that user can logout',
        'Verify that user can register',
        'Verify that user can reset password',
    ],
    errors: [
        'I think you can do better than that!',
        'Scenario name is required, yo!',
        'Don\'t forget to name your scenario!',
    ],
};

const SHORT_INPUT_ERRORS = [
    'Input is too short!',
    'Input is too short, yo!',
    'Input is too short, bro!',
    'Input is too short, dude!',
];

export const FORM_SECTION = {
    technicalGuidance: 'Technical Guidance',
};

const STRINGS = {
    [FORM_SECTION.technicalGuidance]: {
        placeholders: [
            'There is an existing backend endpoint that can be updated to provide what we need.',
            'Make sure the the database migrations are promoted to all environments.',
            'The UI is already built, so we just need to update the API to return the new data.',
        ],
    },
};

class RandomStringGenerator {
    getShortInputError(charCount) {
        const randomIndex = getRandomIndex(SHORT_INPUT_ERRORS.length);
        return `${charCount} characters? ` + SHORT_INPUT_ERRORS[randomIndex];
    }

    getAcceptanceCriteriaPlaceholder() {
        const randomIndex = getRandomIndex(ACCEPTANCE_CRITERIA.placeholders.length);
        return ACCEPTANCE_CRITERIA.placeholders[randomIndex];
    }

    getScenarioNamePlaceholder() {
        const randomIndex = getRandomIndex(SCENARIO_NAME.placeholders.length);
        return SCENARIO_NAME.placeholders[randomIndex];
    }

    getScenarionNameError() {
        const randomIndex = getRandomIndex(SCENARIO_NAME.errors.length);
        return SCENARIO_NAME.errors[randomIndex];
    }

    getPlaceholder(key) {
        if (!STRINGS[key]) {
            throw new Error(`Key not found: ${key}`);
        }

        if (!STRINGS[key].placeholders) {
            throw new Error(`No placeholder found for key: ${key}`);
        }

        const options = STRINGS[key].placeholders;

        const randomIndex = getRandomIndex(options.length);
        return options[randomIndex];
    }
}

export const randomStringGenerator = new RandomStringGenerator();
