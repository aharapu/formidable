import { getRandomIndex } from './utils';

export const RANDOM_STRING_KEY = {
    acceptanceCriteria: 'Acceptance Criteria',
    scenarioName: 'Scenario Name',
    shortInput: 'Short Input',
    technicalGuidance: 'Technical Guidance',
};

const RANDOM_STRINGS = {
    [RANDOM_STRING_KEY.acceptanceCriteria]: {
        placeholders: [
            'UI displays new shiny button',
            'Shiny button displays "Click me!"',
            'Save button is diabled while saving',
            'User without permission cannot see the button',
        ],
    },
    [RANDOM_STRING_KEY.scenarioName]: {
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
    },
    [RANDOM_STRING_KEY.shortInput]: {
        errors: [
            'Input is too short!',
            'Input is too short, yo!',
            'Input is too short, bro!',
            'Input is too short, dude!',
        ],
    },
    [RANDOM_STRING_KEY.technicalGuidance]: {
        placeholders: [
            'There is an existing backend endpoint that can be updated to provide what we need.',
            'Make sure the the database migrations are promoted to all environments.',
            'The UI is already built, so we just need to update the API to return the new data.',
        ],
    },
};

class RandomStringGenerator {
    getShortInputError(charCount) {
        const prefix = `${charCount} character${charCount > 1 ? 's' : ''}? `;

        return prefix + this.getError(RANDOM_STRING_KEY.shortInput);
    }

    getPlaceholder(key) {
        if (!RANDOM_STRINGS[key]) {
            throw new Error(`Key not found: ${key}`);
        }

        if (!RANDOM_STRINGS[key].placeholders) {
            throw new Error(`No placeholder found for key: ${key}`);
        }

        const options = RANDOM_STRINGS[key].placeholders;

        const randomIndex = getRandomIndex(options.length);
        return options[randomIndex];
    }

    getError(key) {
        if (!RANDOM_STRINGS[key]) {
            throw new Error(`Key not found: ${key}`);
        }

        if (!RANDOM_STRINGS[key].errors) {
            throw new Error(`No error found for key: ${key}`);
        }

        const options = RANDOM_STRINGS[key].errors;

        const randomIndex = getRandomIndex(options.length);
        return options[randomIndex];
    }
}

export const randomStringGenerator = new RandomStringGenerator();
