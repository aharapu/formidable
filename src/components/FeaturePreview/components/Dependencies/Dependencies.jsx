import React from 'react';
import { useRecoilValue } from 'recoil';
import { BLUE, featureDeps } from '../../../../constants';
import { PreviewList } from '../PreviewList/PreviewList';

export function Dependencies() {
    const dependencies = useRecoilValue(featureDeps);

    return <PreviewList
        title="DEPENDENCIES"
        titleColor={BLUE}
        items={dependencies}
    />;
}
