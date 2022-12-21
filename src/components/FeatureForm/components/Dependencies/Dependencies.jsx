import React, { useRef, useState } from 'react';
import { useRecoilCallback, useRecoilState } from 'recoil';
import { v4 as createId } from 'uuid';

import { featureDeps } from '../../../../constants';
import { FormDelimiterLine } from '../../../form/FormDelimiterLine';
import { FormSwitchButton } from '../../../FormSwitchButton/FormSwitchButton';
import { InputList } from '../../../InputList/InputList';
import { getInputListAdder, getInputListDeleter, getInputListValueUpdater } from '../../../InputList/utils';
import { LABLES, PLACEHOLDERS } from '../../featureFormConstants';

export function Dependencies() {
    const [showDependencies, setShowDependencies] = useState(false);

    const [dependencies, setDependencies] = useRecoilState(featureDeps);

    const cachedDeps = useRef([]);

    const addDependency = getInputListAdder(setDependencies);
    const updateDependency = getInputListValueUpdater(setDependencies);
    const deleteDependency = getInputListDeleter(setDependencies);

    const handleDepsToggle = useRecoilCallback(({ snapshot }) => () => {
        const isHiding = showDependencies;

        if(isHiding) {
            cachedDeps.current = snapshot.getLoadable(featureDeps).contents;
        }

        const depsToSet = isHiding ? [] :
            cachedDeps.current.length ? cachedDeps.current
                : [{ id: createId(), value: '', error: '' }];

        setDependencies(depsToSet);
        setShowDependencies((prev) => !prev);
    });

    return (
        <>
            <FormSwitchButton
                label={LABLES.depsToggle}
                value={showDependencies}
                onChange={handleDepsToggle}
            />
            {
                showDependencies && (
                    <>
                        <InputList
                            title={LABLES.depsInput}
                            textFieldPlaceholder={PLACEHOLDERS.depsInput}
                            toggleLabel={LABLES.depsToggle}
                            items={dependencies}
                            onAdd={addDependency}
                            onChange={updateDependency}
                            onDelete={deleteDependency}
                        />
                        <FormDelimiterLine />
                    </>
                )
            }
        </>
    );
}
