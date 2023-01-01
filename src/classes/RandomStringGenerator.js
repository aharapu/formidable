import { getRandomIndex } from './utils';

export const RANDOM_STRING_KEY = {
    acceptanceCriteria: 'Acceptance Criteria',
    exclamation: 'Exclamation',
    scenarioName: 'Scenario Name',
    shortInput: 'Short Input',
    technicalGuidance: 'Technical Guidance',
};

export const RANDOM_STRING_TYPE = {
    default: 'default',
    error: 'error',
    placeholder: 'placeholder',
};

const RANDOM_STRINGS = {
    [RANDOM_STRING_KEY.acceptanceCriteria]: {
        [RANDOM_STRING_TYPE.placeholder]: [
            'UI displays new shiny button',
            'Shiny button displays "Click me!"',
            'Save button is diabled while saving',
            'User without permission cannot see the button',
        ],
    },
    [RANDOM_STRING_KEY.exclamation]: {
        [RANDOM_STRING_TYPE.default]: ['Whoops!', 'Oops!', 'Oh no!', 'Oh snap!', 'Oh dear!', 'Oh my!'],
    },
    [RANDOM_STRING_KEY.scenarioName]: {
        [RANDOM_STRING_TYPE.placeholder]: [
            'Verify that user can login',
            'Verify that user can logout',
            'Verify that user can register',
            'Verify that user can reset password',
        ],
        [RANDOM_STRING_TYPE.error]: [
            'I think you can do better than that!',
            'Scenario name is required, yo!',
            'Don\'t forget to name your scenario!',
        ],
    },
    [RANDOM_STRING_KEY.shortInput]: {
        [RANDOM_STRING_TYPE.error]: [
            'Input is too short!',
            'Input is too short, yo!',
            'Input is too short, bro!',
            'Input is too short, dude!',
        ],
    },
    [RANDOM_STRING_KEY.technicalGuidance]: {
        [RANDOM_STRING_TYPE.placeholder]: [
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

        if (!RANDOM_STRINGS[key].placeholder) {
            throw new Error(`No placeholder found for key: ${key}`);
        }

        const options = RANDOM_STRINGS[key].placeholder;

        const randomIndex = getRandomIndex(options.length);
        return options[randomIndex];
    }

    getError(key) {
        if (!RANDOM_STRINGS[key]) {
            throw new Error(`Key not found: ${key}`);
        }

        if (!RANDOM_STRINGS[key].error) {
            throw new Error(`No error found for key: ${key}`);
        }

        const options = RANDOM_STRINGS[key].error;

        const randomIndex = getRandomIndex(options.length);
        return options[randomIndex];
    }

    getString(key, type) {
        if (!RANDOM_STRINGS[key]) {
            throw new Error(`Key not found: ${key}`);
        }

        if (!RANDOM_STRINGS[key][type]) {
            throw new Error(`No ${type} found for key: ${key}`);
        }

        const options = RANDOM_STRINGS[key][type];

        const randomIndex = getRandomIndex(options.length);
        return options[randomIndex];
    }

    get(key, type) {
        if (type === RANDOM_STRING_TYPE.error) {
            return this.getError(key);
        }

        if (type === RANDOM_STRING_TYPE.placeholder) {
            return this.getPlaceholder(key);
        }

        if (type === RANDOM_STRING_TYPE.default) {
            return this.getString(key, type);
        }

        throw new Error(`Invalid type: ${type}`);
    }
}

export const randomStringGenerator = new RandomStringGenerator();
