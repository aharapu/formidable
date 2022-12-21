import React from 'react';
import { useRecoilValue } from 'recoil';
import { featureACs, PURPLE } from '../../../../constants';
import { PreviewList } from '../PreviewList/PreviewList';

// The role of this component is to isolate state updates
export function AcceptanceCriteria() {
    const acceptanceCriterias = useRecoilValue(featureACs);

    return (
        <PreviewList
            title="ACCEPTANCE CRITERIA"
            titleColor={PURPLE}
            items={acceptanceCriterias}
        />
    );
}
