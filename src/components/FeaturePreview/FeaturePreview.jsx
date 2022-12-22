import React from 'react';
import { useRecoilValue } from 'recoil';

import { Button, Typography, Paper } from '@mui/material';

import {
    featureFlagAtom,
    featureImpactedProj,
    featureRequireEdition,
    featureRequireAutomationTest,
    DARK_GREY,
    LIGHT_GRAY,
    ORANGE,
    DARK_RED,
    RED,
} from '../../constants';
import { useClipboard } from '../../hooks/useClipboard';
import { What } from './components/What';
import { AcceptanceCriteria } from './components/AcceptanceCriteria';
import { TechnicalGuidance } from './components/TechnicalGuidance';
import { Dependencies } from './components/Dependencies/Dependencies';
import { TestScenarios } from './components/TestScenarios/TestScenarios';

// TODO -> idea
// 1. make Given, When, Then and And in italics in stead of bold
// 2. make scenario name bold
// 3. indent the And steps
export default function FeaturePreview() {
    const FF = useRecoilValue(featureFlagAtom);
    const impactedProj = useRecoilValue(featureImpactedProj);
    const edition = useRecoilValue(featureRequireEdition);
    const automation = useRecoilValue(featureRequireAutomationTest);

    const { copyFeature } = useClipboard();

    const handleCopyClick = () => {
        copyFeature();
    };

    // TODO -> have a show as html option
    // TODO -> highlight form errors in preview
    return (
        <Paper
            style={{
                padding: '24px',
                maxWidth: '420px',
                maxHeight: 'calc(100vh - 164px)',
                overflowY: 'auto',
            }}
            elevation={3}
        >
            <Typography variant="h2" style={{ marginBottom: 24 }}>
                Feature Form Preview
            </Typography>
            <What />
            <AcceptanceCriteria />
            <TechnicalGuidance />
            <Dependencies />
            {FF && (
                <>
                    <Typography
                        variant="subtitle1"
                        style={{ marginTop: 16, color: ORANGE }}
                    >
            FEATURE FLAG
                    </Typography>
                    <ul className="preview-list">
                        <li>
                            <Typography variant="body1">{FF}</Typography>
                        </li>
                    </ul>
                </>
            )}
            {impactedProj.length > 0 && (
                <>
                    <Typography
                        variant="subtitle1"
                        style={{ marginTop: 16, color: DARK_RED }}
                    >
            IMPACTED PROJECT
                    </Typography>
                    <ul className="preview-list">
                        {impactedProj.map((proj) => (
                            <li key={proj.id}>
                                <Typography variant="body1">{proj.value}</Typography>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {/* TODO -> add plural only when applicable */}
            {edition.length > 0 && (
                <>
                    <Typography variant="subtitle1" style={{ marginTop: 16, color: RED }}>
            REQUIRES EDITIONS
                    </Typography>
                    <ul className="preview-list">
                        {edition.map((ed) => (
                            <li key={ed.id}>
                                <Typography variant="body1">{ed.value}</Typography>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            <TestScenarios />
            <Typography
                variant="subtitle1"
                style={{ marginTop: 16, color: LIGHT_GRAY }}
            >
                {'REQUIRES AUTOMATION - '}
                <strong style={{ color: DARK_GREY }}>
                    {automation ? 'YES' : 'NO'}
                </strong>
            </Typography>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '36px',
                }}
            >
                <Button
                // TODO -> place copy button under the scrollable preview, to make it always visible
                    variant="contained"
                    onClick={handleCopyClick}
                    style={{ backgroundColor: '#172F4D', width: '190px', height: '42px' }}
                >
                    Copy to clipboard
                </Button>
            </div>
        </Paper>
    );
}
