import { Typography } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { featureACs, PURPLE } from '../../../../constants';

export function AcceptanceCriteria() {
    const acceptanceCriterias = useRecoilValue(featureACs);

    return (
        <>
            <Typography variant="subtitle1" style={{ marginTop: 16, color: PURPLE }}>
                ACCEPTANCE CRITERIA
            </Typography>
            <ul className="preview-list">
                {acceptanceCriterias.map((c) => (
                    <li key={c.id}>
                        <Typography variant="body1">{c.value}</Typography>
                    </li>
                ))}
            </ul>
        </>
    );
}
