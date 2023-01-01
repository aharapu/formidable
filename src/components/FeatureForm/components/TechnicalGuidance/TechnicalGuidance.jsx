import React, { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { FORM_SECTION, randomStringGenerator } from '../../../../classes/RandomStringGenerator';
import { featureTechGuide } from '../../../../constants';
import { FormTextField } from '../../../FormTextField/FormTextField';
import { LABLES } from '../../featureFormConstants';

export function TechnicalGuidance() {
    const [techGuide, setTechGuide] = useRecoilState(featureTechGuide);

    const placeholder = useMemo(() => randomStringGenerator.getPlaceholder(FORM_SECTION.technicalGuidance), []);

    return (
        <FormTextField
            label={LABLES.techGuide}
            placeholder={placeholder}
            multiline
            value={techGuide}
            onChange={(e) => setTechGuide(e.target.value)}
        />
    );
}
