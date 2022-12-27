import React from 'react';
import { useRecoilState } from 'recoil';
import { featureRequireAutomationTest } from '../../../../constants';
import { FormCheckbox } from '../../../FormCheckbox/FormCheckbox';
import { LABLES } from '../../featureFormConstants';

export function RequiresAutomation() {

    const [needsAutomation, setNeedsAutomation] = useRecoilState(featureRequireAutomationTest);

    const handleRequireAutoChange = (isRequired) => {
        console.log('isRequired', isRequired);
        setNeedsAutomation(isRequired);
    };
    return (
        <FormCheckbox
            label={LABLES.requiresAutomation}
            value={needsAutomation}
            onChange={handleRequireAutoChange}
        />
    );
}
