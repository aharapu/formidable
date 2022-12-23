import React from 'react';
import { useRecoilValue } from 'recoil';
import { featureRequireEdition, RED } from '../../../../constants';
import { PreviewList } from '../PreviewList/PreviewList';

export function RequiredEditions() {
    const requiredEditions = useRecoilValue(featureRequireEdition);

    if (!requiredEditions.length) return null;

    const title = requiredEditions.length > 1 ? 'REQUIRED EDITIONS' : 'REQUIRED EDITION';

    return (
        <PreviewList
            title={title}
            titleColor={RED}
            items={requiredEditions}
        />
    );
}
