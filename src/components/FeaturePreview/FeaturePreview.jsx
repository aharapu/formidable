import React from 'react';

import { Button, Typography, Paper } from '@mui/material';

import { useClipboard } from '../../hooks/useClipboard';
import { What } from './components/What';
import { AcceptanceCriteria } from './components/AcceptanceCriteria';
import { TechnicalGuidance } from './components/TechnicalGuidance';
import { Dependencies } from './components/Dependencies/Dependencies';
import { TestScenarios } from './components/TestScenarios/TestScenarios';
import { FeatureFlag } from './components/FeatureFlag/FeatureFlag';
import { ImpactedProjects } from './components/ImpactedProjects/ImpactedProjects';
import { RequiredEditions } from './components/RequiredEditions/RequiredEditions';

// TODO -> add plural only when applicable
// TODO -> idea
// 1. make Given, When, Then and And in italics in stead of bold
// 2. make scenario name bold
// 3. indent the And steps

export default function FeaturePreview() {

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
            <FeatureFlag />
            <ImpactedProjects />
            <RequiredEditions />
            <TestScenarios />
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
