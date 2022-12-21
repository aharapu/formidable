import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { getValues, updateClipboard } from '../components/FeaturePreview/utils';
import {
    featureACs,
    featureDeps,
    featureFlag,
    featureImpactedProj,
    featureRequireAutomationTest,
    featureRequireEdition,
    featureTechGuide,
    featureTestInstruct,
} from '../constants';
import { whatAtom } from '../recoil/what-atom';

export function useClipboard() {
    const what = useRecoilValue(whatAtom);
    const criterias = useRecoilValue(featureACs);
    const techGuidance = useRecoilValue(featureTechGuide);
    const dependencies = useRecoilValue(featureDeps);
    const FF = useRecoilValue(featureFlag);
    const impactedProj = useRecoilValue(featureImpactedProj);
    const edition = useRecoilValue(featureRequireEdition);
    const featureTestInstructions = useRecoilValue(featureTestInstruct);
    const automation = useRecoilValue(featureRequireAutomationTest);

    const copyFeature = useCallback(() => {
        updateClipboard({
            what,
            criterias,
            techGuidance,
            dependencies,
            featureFlag: FF,
            impactedProjects: getValues(impactedProj),
            requiredEditions: getValues(edition),
            testingScenarios: featureTestInstructions,
            requiresAutomation: automation,
        });
    }, [what, criterias, techGuidance, dependencies, FF, impactedProj, edition, featureTestInstructions, automation]);

    return { copyFeature };
}
