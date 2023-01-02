import { randomStringGenerator, RANDOM_STRING_KEY, RANDOM_STRING_TYPE } from '../../classes/RandomStringGenerator';

const noWhatContentErr = 'It\'s not so clear what this ticket is about. Try to describe your intent in a few words.';

export function validateWhat(what = '') {
    const prefix = randomStringGenerator.get(RANDOM_STRING_KEY.exclamation, RANDOM_STRING_TYPE.default);

    if (!what || typeof what !== 'string') {
        return prefix + ' ' + noWhatContentErr;
    }

    const trimmedWhat = what.trim();
    if (!trimmedWhat) {
        return prefix + ' ' + noWhatContentErr;
    }

    const nrOfWords = trimmedWhat.split(' ').length;
    if (nrOfWords < 5) {
        const suffix = nrOfWords === 1 ? ' word is' : ' words are';
        return (
            prefix +
            ` I'm not convinced ${
                nrOfWords.toString(10) + suffix
            } enough for a clear message. Five words should be enough.`
        );
    }

    return null;
}
