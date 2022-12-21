import React from 'react';
import { useRecoilValue } from 'recoil';
import { featureTechGuide, GREEN } from '../../../../constants';
import { PreviewText } from '../PreviewText/PreviewText';

export function TechnicalGuidance() {
    const techincalGuidance = useRecoilValue(featureTechGuide);

    if (!techincalGuidance) {
        return null;
    }

    return <PreviewText title="TECHNICAL GUIDANCE" content={techincalGuidance} titleColor={GREEN} />;
}
