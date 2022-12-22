import React from 'react';
import { useRecoilValue } from 'recoil';
import { DARK_RED, featureImpactedProj } from '../../../../constants';
import { PreviewList } from '../PreviewList/PreviewList';

export function ImpactedProjects() {
    const impactedProjects = useRecoilValue(featureImpactedProj);

    if (impactedProjects.length === 0 ) return null;

    return(
        <PreviewList
            title="IMPACTED PROJECTS"
            titleColor={DARK_RED}
            items={impactedProjects}
        />
    );
}
