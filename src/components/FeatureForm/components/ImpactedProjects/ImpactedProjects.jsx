import React from 'react';
import { useRecoilState } from 'recoil';
import { featureImpactedProj } from '../../../../constants';
import { InputList } from '../../../InputList/InputList';
import { getInputListAdder, getInputListDeleter, getInputListValueUpdater } from '../../../InputList/utils';
import { LABLES, PLACEHOLDERS } from '../../featureFormConstants';

export function ImpactedProjects() {
    const [impactProjs, setImpactProjs] = useRecoilState(featureImpactedProj);

    const addProject = getInputListAdder(setImpactProjs);
    const updateProject = getInputListValueUpdater(setImpactProjs);
    const deleteProject = getInputListDeleter(setImpactProjs);

    return (
        <InputList
            title={LABLES.imapctedProj}
            textFieldPlaceholder={PLACEHOLDERS.imapctedProj}
            items={impactProjs}
            onAdd={addProject}
            onChange={updateProject}
            onDelete={deleteProject}
        />
    );
}
