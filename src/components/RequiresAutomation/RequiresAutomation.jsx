import { Typography } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { DARK_GREY, FEATURE, featureRequireAutomationTest, LIGHT_GRAY } from '../../constants';

export function RequiresAutomation() {
    const requiresAutomation = useRecoilValue(featureRequireAutomationTest);

    return (
        <Typography
            variant="subtitle1"
            style={{ marginTop: 16, color: LIGHT_GRAY }}
        >
            {FEATURE.preview.title.requiresAutomation}
            <strong style={{ color: DARK_GREY }}>
                {requiresAutomation ? 'YES' : 'NO'}
            </strong>
        </Typography>
    );
}
