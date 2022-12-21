import React from 'react';
import { useRecoilState } from 'recoil';
import { featureTechGuide } from '../../../../constants';
import { FormTextField } from '../../../FormTextField/FormTextField';
import { LABLES, PLACEHOLDERS } from '../../featureFormConstants';

export function TechnicalGuidance() {
    const [techGuide, setTechGuide] = useRecoilState(featureTechGuide);

    return (
        <FormTextField
            label={LABLES.techGuide}
            placeholder={PLACEHOLDERS.techGuide}
            multiline
            value={techGuide}
            onChange={(e) => setTechGuide(e.target.value)}
        />
    );
}
