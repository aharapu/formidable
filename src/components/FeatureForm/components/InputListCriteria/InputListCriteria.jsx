import React from 'react';
import { useRecoilState } from 'recoil';
import { randomStringGenerator } from '../../../../classes/RandomStringGenerator';
import { featureACs } from '../../../../constants';
import { InputList } from '../../../InputList/InputList';
import {
    getInputListAdder,
    getInputListDeleter,
    getInputListErrorUpdater,
    getInputListValueUpdater,
} from '../../../InputList/utils';
import { LABLES } from '../../featureFormConstants';

export function InputListCriteria() {
    const [ACs, setACs] = useRecoilState(featureACs);

    const addCriteria = getInputListAdder(setACs);
    const updateCriteriaValue = getInputListValueUpdater(setACs);
    const updateCriteriaError = getInputListErrorUpdater(setACs);
    const deleteCriteria = getInputListDeleter(setACs);

    return (
        <InputList
            title={LABLES.acceptanceCriteriaTitle}
            textFieldLabel={LABLES.acceptCritInput}
            textFieldPlaceholder={randomStringGenerator.getAcceptanceCriteriaPlaceholder()}
            onInputBlur={updateCriteriaError}
            items={ACs}
            onAdd={addCriteria}
            onChange={updateCriteriaValue}
            onDelete={deleteCriteria}
        />
    );
}
