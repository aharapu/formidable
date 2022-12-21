import { useRecoilCallback } from 'recoil';
import { getValues, updateClipboard } from '../components/FeaturePreview/utils';
import {
    featureACs,
    featureTechGuide,
    featureDeps,
    featureFlag,
    featureImpactedProj,
    featureRequireEdition,
    featureTestInstruct,
    featureRequireAutomationTest,
} from '../constants';
import { whatAtom } from '../recoil/what-atom';

export function useClipboard() {
    const copyFeature = useRecoilCallback(({ snapshot }) => () => {
        const what = snapshot.getLoadable(whatAtom).contents;
        const criterias = snapshot.getLoadable(featureACs).contents;
        const techGuidance = snapshot.getLoadable(featureTechGuide).contents;
        const dependencies = snapshot.getLoadable(featureDeps).contents;
        const FF = snapshot.getLoadable(featureFlag).contents;
        const impactedProj = snapshot.getLoadable(featureImpactedProj).contents;
        const edition = snapshot.getLoadable(featureRequireEdition).contents;
        const featureTestInstructions = snapshot.getLoadable(featureTestInstruct).contents;
        const automation = snapshot.getLoadable(featureRequireAutomationTest).contents;

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
    });

    return { copyFeature };
}
