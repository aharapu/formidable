import { randomStringGenerator } from '../../../../../../../classes/RandomStringGenerator';

export function validateScenarioName(name) {
    const charNumber = name.length;
    if (charNumber === 0) {
        return randomStringGenerator.getScenarionNameError();
    }

    if (charNumber < 7) {
        return randomStringGenerator.getShortInputError(charNumber);
    }

    return '';
}
