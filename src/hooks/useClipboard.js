import { useRecoilCallback } from 'recoil';
import { HtmlContentBuilder } from '../classes/HtmlContentBuilder';
import { getValues, updateClipboard } from '../components/FeaturePreview/utils';
import { LIGHT_GRAY, PURPLE, GREEN, BLUE, ORANGE, DARK_RED, RED, DARK_TEAL, DARK_GREY } from '../constants';

import {
    featureACs,
    featureTechGuide,
    featureDeps,
    featureFlagAtom,
    featureImpactedProj,
    featureRequireEdition,
    featureRequireAutomationTest,
} from '../constants';
import { testScenariosSelector } from '../recoil/scenarios';
import { whatAtom } from '../recoil/atoms/what';

export function useClipboard() {
    const buildContent = useRecoilCallback(
        ({ snapshot }) =>
            () => {
                const what = snapshot.getLoadable(whatAtom).contents;
                const criterias = snapshot.getLoadable(featureACs).contents;
                const techGuidance = snapshot.getLoadable(featureTechGuide).contents;
                const dependencies = snapshot.getLoadable(featureDeps).contents;
                const featureFlag = snapshot.getLoadable(featureFlagAtom).contents;
                const impactedProjects = snapshot.getLoadable(featureImpactedProj).contents;
                const requiredEditions = snapshot.getLoadable(featureRequireEdition).contents;
                const testingScenarios = snapshot.getLoadable(testScenariosSelector).contents;
                const requiresAutomation = snapshot.getLoadable(featureRequireAutomationTest).contents;

                const criteriaValues = getValues(criterias);
                const depValues = getValues(dependencies);

                const contentBuilder = new HtmlContentBuilder();

                contentBuilder
                    .addHeading({ content: 'What:', color: LIGHT_GRAY })
                    .addParagraph({ content: what.value })
                    .addHeading({ content: 'Acceptance Criteria:', color: PURPLE })
                    .addList(criteriaValues);

                if (techGuidance) {
                    contentBuilder
                        .addHeading({
                            content: 'Technical Guidance:',
                            color: GREEN,
                        })
                        .addParagraph({
                            content: techGuidance,
                        });
                }

                if (dependencies.length > 0) {
                    contentBuilder.addHeading({ content: 'Dependencies:', color: BLUE }).addList(depValues);
                }

                if (featureFlag) {
                    contentBuilder.addHeading({ content: 'Feature Flag:', color: ORANGE }).addParagraph({
                        content: featureFlag,
                    });
                }

                contentBuilder
                    .addHeading({ content: 'Impacted Projects:', color: DARK_RED })
                    .addList(getValues(impactedProjects));

                if (requiredEditions.length > 0) {
                    contentBuilder
                        .addHeading({ content: 'Required Editions:', color: RED })
                        .addList(getValues(requiredEditions));
                }

                if (testingScenarios.length > 0) {
                    contentBuilder
                        .addHeading({
                            content: 'Testing Scenarios:',
                            color: DARK_TEAL,
                        })
                        .addTestScenarios(testingScenarios);
                }

                const automationContent =
                    'Requires Automation -> ' +
                    `<span style="color: ${requiresAutomation ? DARK_RED : DARK_GREY};">` +
                    `${requiresAutomation ? 'YES' : 'NO'}` +
                    '</span>';
                contentBuilder.addHeading({
                    content: automationContent,
                    color: LIGHT_GRAY,
                });

                return contentBuilder.getContent();
            },
        [],
    );

    const copyFeature = () => {
        const content = buildContent();

        updateClipboard(content);
    };

    return { buildContent, copyFeature };
}
