import React from 'react';
import { useRecoilState } from 'recoil';
import { whatAtom } from '../../../../recoil/what-atom';
import { FormTextField } from '../../../FormTextField/FormTextField';

import { LABLES, PLACEHOLDERS } from '../../featureFormConstants';
import { validateWhat } from '../../utils';

export function InputWhat() {
    const [what, setWhat] = useRecoilState(whatAtom);

    const handleWhatChange = (e) => {
        setWhat(prev => ({ ...prev, value: e.target.value, error: '' }));

    };

    const handleWhatBlur = () => {
        const err = validateWhat(what.value);
        if (err) {
            setWhat(prev => ({ ...prev, error: err }));
        }
    };

    return (
        <FormTextField
            label={LABLES.what}
            placeholder={PLACEHOLDERS.what}
            multiline
            value={what.value}
            onChange={handleWhatChange}
            onBlur={handleWhatBlur}
            error={Boolean(what.error)}
            helperText={what.error}
        />
    );
}
