import { ClipboardContent } from '../../classes/ClipboardContent';

import { LIGHT_GRAY, PURPLE, GREEN, BLUE, ORANGE, DARK_RED, RED, DARK_TEAL, DARK_GREY } from '../../constants';

export function updateClipboard({
    what,
    criterias,
    techGuidance,
    dependencies,
    featureFlag,
    impactedProjects,
    requiredEditions,
    testingScenarios,
    requiresAutomation,
}) {
    const criteriaValues = getValues(criterias);
    const depValues = getValues(dependencies);

    const cc = new ClipboardContent();

    cc.addHeading({ content: 'What:', color: LIGHT_GRAY })
        .addParagraph({ content: what })
        .addHeading({ content: 'Acceptance Criteria:', color: PURPLE })
        .addList(criteriaValues);

    // TODO -> trim and capitalize?
    if (techGuidance) {
        cc.addHeading({
            content: 'Technical Guidance:',
            color: GREEN,
        }).addParagraph({
            content: techGuidance,
        });
    }

    if (dependencies.length > 0) {
        cc.addHeading({ content: 'Dependencies:', color: BLUE }).addList(depValues);
    }

    if (featureFlag) {
        cc.addHeading({ content: 'Feature Flag:', color: ORANGE }).addParagraph({
            content: featureFlag,
        });
    }

    cc.addHeading({ content: 'Impacted Projects:', color: DARK_RED }).addList(impactedProjects);

    if (requiredEditions.length > 0) {
        cc.addHeading({ content: 'Required Editions:', color: RED }).addList(requiredEditions);
    }

    if (testingScenarios.length > 0) {
        cc.addHeading({
            content: 'Testing Scenarios:',
            color: DARK_TEAL,
        }).addTestScenarios(testingScenarios);
    }

    const automationContent =
        'Requires Automation -> ' +
        `<span style="color: ${requiresAutomation ? DARK_RED : DARK_GREY};">` +
        `${requiresAutomation ? 'YES' : 'NO'}` +
        '</span>';
    cc.addHeading({
        content: automationContent,
        color: LIGHT_GRAY,
    });

    const content = cc.getContent();

    console.log('content', content);

    const type = 'text/html';
    const blob = new Blob([content], { type });
    const data = [new ClipboardItem({ [type]: blob })];

    return navigator.clipboard.write(data);
}

export function getValues(objects = []) {
    return objects.map((o) => o.value);
}

// TODO -> check use cases
export function buildHtmlTagString({ tag, content, color }) {
    // TODO -> tag should be limited to certain strings
    const style = color ? `style="color:${color};"` : '';

    return `<${tag} ${style}>${content}</${tag}>`;
}
