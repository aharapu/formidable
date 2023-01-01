import React from 'react';

import { Typography, Paper } from '@mui/material';

import { What } from './components/What';
import { AcceptanceCriteria } from './components/AcceptanceCriteria';
import { TechnicalGuidance } from './components/TechnicalGuidance';
import { Dependencies } from './components/Dependencies/Dependencies';
import { TestScenarios } from './components/TestScenarios/TestScenarios';
import { FeatureFlag } from './components/FeatureFlag/FeatureFlag';
import { ImpactedProjects } from './components/ImpactedProjects/ImpactedProjects';
import { RequiredEditions } from './components/RequiredEditions/RequiredEditions';
import { RequiresAutomation } from '../RequiresAutomation/RequiresAutomation';

export default function FeaturePreview() {

    // TODO -> have a show as html option
    // TODO -> highlight form errors in preview
    return (
        <Paper
            style={{
                padding: '24px',
                minHeight: '50vh',
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
            <RequiresAutomation />
        </Paper>
    );
}
