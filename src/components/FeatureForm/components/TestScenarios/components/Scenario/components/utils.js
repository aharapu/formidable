import { randomStringGenerator, RANDOM_STRING_KEY } from '../../../../../../../classes/RandomStringGenerator';

export function validateScenarioName(name) {
    const charNumber = name.trim().length;
    if (charNumber === 0) {
        return randomStringGenerator.getError(RANDOM_STRING_KEY.scenarioName);
    }

    if (charNumber < 7) {
        return randomStringGenerator.getShortInputError(charNumber);
    }

    return '';
}
