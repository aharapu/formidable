import React, { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { RANDOM_STRING_KEY, randomStringGenerator } from '../../../../classes/RandomStringGenerator';
import { featureTechGuide } from '../../../../constants';
import { FormTextField } from '../../../FormTextField/FormTextField';
import { LABLES } from '../../featureFormConstants';

export function TechnicalGuidance() {
    const [techGuide, setTechGuide] = useRecoilState(featureTechGuide);

    const placeholder = useMemo(() => randomStringGenerator.getPlaceholder(RANDOM_STRING_KEY.technicalGuidance), []);

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
