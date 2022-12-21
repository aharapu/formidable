import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { formValidationErrors } from '../../../../constants';
import { whatAtom } from '../../../../recoil/what-atom';
import { FormTextField } from '../../../FormTextField/FormTextField';

import { LABLES, PLACEHOLDERS } from '../../featureFormConstants';
import { validateWhat } from '../../utils';

export function InputWhat() {
    const [what, setWhat] = useRecoilState(whatAtom);
    const [whatErr, setWhatErr] = useState(null);

    // TODO -> use a selector? do I even need the value of this? perhaps the setter is sufficient
    const [validErr, setValidErr] = useRecoilState(formValidationErrors);

    const handleWhatChange = (e) => {
        setWhat(e.target.value);
        if (whatErr) {
            setWhatErr(null);
            setValidErr((prev) => prev.filter((err) => err !== 'feature-what'));
        }
    };

    const handleWhatBlur = () => {
        const err = validateWhat(what);
        if (err) {
            setWhatErr(err);
            if (!validErr.includes('feature-what')) {
                setValidErr((prev) => [...prev, 'feature-what']);
            }
        }
    };

    return (
        <FormTextField
            label={LABLES.what}
            placeholder={PLACEHOLDERS.what}
            multiline
            value={what}
            onChange={handleWhatChange}
            onBlur={handleWhatBlur}
            error={Boolean(whatErr)}
            helperText={whatErr}
        />
    );
}
