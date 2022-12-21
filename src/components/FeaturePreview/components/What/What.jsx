import { Typography } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { LIGHT_GRAY } from '../../../../constants';
import { whatAtom } from '../../../../recoil/what-atom';

export function What() {
    const what = useRecoilValue(whatAtom);

    return (
        <>
            <Typography
                variant="subtitle1"
                style={{ marginTop: 16, color: LIGHT_GRAY }}
            >
                WHAT
            </Typography>
            <Typography variant="body1" color="text.primary">
                {what}
            </Typography>
        </>
    );
}
