import React from 'react';
import { useRecoilValue } from 'recoil';
import { featureFlagAtom, ORANGE } from '../../../../constants';
import { PreviewText } from '../PreviewText/PreviewText';

export function FeatureFlag() {
    const featureFlag = useRecoilValue(featureFlagAtom);

    if (!featureFlag) return null;

    return (
        <PreviewText
            title="FEATURE FLAG"
            content={featureFlag}
            titleColor={ORANGE}
        />
    );
}
