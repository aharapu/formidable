import React from 'react';
import { useRecoilValue } from 'recoil';
import { PURPLE } from '../../../../constants';
import { acceptanceCriteriasAtom } from '../../../../recoil/atoms/acceptanceCriterias';
import { PreviewList } from '../PreviewList/PreviewList';

// The role of this component is to isolate state updates
export function AcceptanceCriteria() {
    const acceptanceCriterias = useRecoilValue(acceptanceCriteriasAtom);

    return (
        <PreviewList
            title="ACCEPTANCE CRITERIA"
            titleColor={PURPLE}
            items={acceptanceCriterias}
        />
    );
}
