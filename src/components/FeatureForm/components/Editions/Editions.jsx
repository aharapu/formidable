import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { v4 as createId } from 'uuid';

import { featureRequireEdition } from '../../../../constants';
import { FormSwitchButton } from '../../../FormSwitchButton/FormSwitchButton';
import { InputList } from '../../../InputList/InputList';
import { getInputListAdder, getInputListDeleter, getInputListValueUpdater } from '../../../InputList/utils';
import { LABLES, PLACEHOLDERS } from '../../featureFormConstants';

export function Editions() {
    const [showEditions, setShowEditions] = useState(false);

    const [editions, setEditions] = useRecoilState(featureRequireEdition);

    const cachedEditions = useRef(editions);

    const addEdition = getInputListAdder(setEditions);
    const updateEdition = getInputListValueUpdater(setEditions);
    const deleteEdition = getInputListDeleter(setEditions);

    const handleToggleEditions = () => {
        const isHiding = showEditions;

        if(isHiding) {
            cachedEditions.current = editions;
        }

        const editionsToSet = isHiding ? [] :
            cachedEditions.current.length ? cachedEditions.current
                : [{ id: createId(), value: '', error: '' }];

        setEditions(editionsToSet);
        setShowEditions((prev) => !prev);
    };

    return (
        <>
            <FormSwitchButton
                label={LABLES.editionToggle}
                value={showEditions}
                onChange={handleToggleEditions}
            />
            {showEditions && (
                <InputList
                    title={LABLES.editionInput}
                    textFieldPlaceholder={PLACEHOLDERS.editionInput}
                    items={editions}
                    onAdd={addEdition}
                    onChange={updateEdition}
                    onDelete={deleteEdition}
                />
            )}
        </>
    );
}
