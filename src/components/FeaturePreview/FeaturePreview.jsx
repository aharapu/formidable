import React, { useState } from 'react';

import { Typography, Paper, Button } from '@mui/material';

import { What } from './components/What';
import { AcceptanceCriteria } from './components/AcceptanceCriteria';
import { TechnicalGuidance } from './components/TechnicalGuidance';
import { Dependencies } from './components/Dependencies/Dependencies';
import { TestScenarios } from './components/TestScenarios/TestScenarios';
import { FeatureFlag } from './components/FeatureFlag/FeatureFlag';
import { ImpactedProjects } from './components/ImpactedProjects/ImpactedProjects';
import { RequiredEditions } from './components/RequiredEditions/RequiredEditions';
import { RequiresAutomation } from '../RequiresAutomation/RequiresAutomation';
import { useClipboard } from '../../hooks/useClipboard';

const PREVIEW_VERSIONS = {
    rawHtml: 'rawHtml',
    styled: 'styled',
};

export default function FeaturePreview() {
    const { buildContent } = useClipboard();
    const [ previewVersion, setPreviewVersion ] = useState(PREVIEW_VERSIONS.styled);


    const changePreviewVersion = () => {
        setPreviewVersion(
            previewVersion === PREVIEW_VERSIONS.styled ? PREVIEW_VERSIONS.rawHtml : PREVIEW_VERSIONS.styled,
        );
    };

    // TODO -> highlight form errors in preview
    return (
        <Paper
            style={{
                padding: '24px',
                minHeight: '50vh',
                maxHeight: 'calc(100vh - 164px)',
                overflowY: 'auto',
                position: 'relative',
            }}
            elevation={3}
        >
            <Button
                sx={{ position: 'absolute', top: 16, right: 16 }}
                variant='contained'
                size='small'
                onClick={changePreviewVersion}
            >
                {'Show ' + (previewVersion === PREVIEW_VERSIONS.styled ? 'HTML' : 'Styled')}
            </Button>
            {previewVersion === PREVIEW_VERSIONS.rawHtml && buildContent()}
            {previewVersion === PREVIEW_VERSIONS.styled && (
                <>
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
                </>
            )}
        </Paper>
    );
}
