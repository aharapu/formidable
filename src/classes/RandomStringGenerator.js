const ACCEPTANCE_CRITERIA = {
    placeholders: [
        'UI displays new shiny button',
        'Shiny button displays "Click me!"',
        'Save button is diabled while saving',
        'User without permission cannot see the button',
    ],
};

function getRandomIndex(maxIndex) {
    return Math.floor(Math.random() * maxIndex);
}

class RandomStringGenerator {
    getAcceptanceCriteriaPlaceholder() {
        const randomIndex = getRandomIndex(ACCEPTANCE_CRITERIA.placeholders.length);
        return ACCEPTANCE_CRITERIA.placeholders[randomIndex];
    }
}

export const randomStringGenerator = new RandomStringGenerator();
