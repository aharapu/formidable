import React from 'react';
import { useRecoilValue } from 'recoil';

import { Button, Typography, Paper } from '@mui/material';

import {
    featureACs,
    featureDeps,
    featureTechGuide,
    featureFlag,
    featureImpactedProj,
    featureRequireEdition,
    featureRequireAutomationTest,
    featureWhat,
    featureTestInstruct,
    DARK_GREY,
    LIGHT_GRAY,
    PURPLE,
    GREEN,
    BLUE,
    ORANGE,
    DARK_RED,
    RED,
    DARK_TEAL,
} from '../../constants';
import { useClipboard } from '../../hooks/useClipboard';

export default function FeaturePreview() {
    const what = useRecoilValue(featureWhat);
    const criterias = useRecoilValue(featureACs);
    const techGuidance = useRecoilValue(featureTechGuide);
    const dependencies = useRecoilValue(featureDeps);
    const FF = useRecoilValue(featureFlag);
    const impactedProj = useRecoilValue(featureImpactedProj);
    const edition = useRecoilValue(featureRequireEdition);
    const featureTestInstructions = useRecoilValue(featureTestInstruct);
    const automation = useRecoilValue(featureRequireAutomationTest);

    const { copyFeature } = useClipboard();

    const handleCopyClick = () => {
        copyFeature();
    };

    // TODO -> have a show as html option
    return (
        <Paper
            style={{
                padding: '24px',
                maxWidth: '420px',
                maxHeight: 'calc(100vh - 92px)',
                overflow: 'scroll',
            }}
            elevation={3}
        >
            <Typography variant="h2" style={{ marginBottom: 24 }}>
        Feature Form Preview
            </Typography>
            <Typography
                variant="subtitle1"
                style={{ marginTop: 16, color: LIGHT_GRAY }}
            >
        WHAT
            </Typography>
            <Typography variant="body1" color="text.primary">
                {what}
            </Typography>
            <Typography variant="subtitle1" style={{ marginTop: 16, color: PURPLE }}>
        ACCEPTANCE CRITERIA
            </Typography>
            <ul className="preview-list">
                {criterias.map((c) => (
                    <li key={c.id}>
                        <Typography variant="body1">{c.value}</Typography>
                    </li>
                ))}
            </ul>
            {techGuidance && (
                <>
                    <Typography
                        variant="subtitle1"
                        style={{ marginTop: 16, color: GREEN }}
                    >
            TECHNICAL GUIDANCE
                    </Typography>
                    <ul className="preview-list">
                        <li>
                            <Typography variant="body1">{techGuidance}</Typography>
                        </li>
                    </ul>
                </>
            )}
            {/* TODO -> break into reusable components? */}
            {dependencies.length > 0 && (
                <>
                    <Typography
                        variant="subtitle1"
                        style={{ marginTop: 16, color: BLUE }}
                    >
            DEPENDENCIES
                    </Typography>
                    <ul className="preview-list">
                        {dependencies.map((d) => (
                            <li key={d.id}>
                                <Typography variant="body1">{d.value}</Typography>
                            </li>
                        ))}
                    </ul>
                </>
            )}
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
            {featureTestInstructions.length > 0 && (
                <>
                    <Typography
                        variant="subtitle1"
                        style={{ marginTop: 16, color: DARK_TEAL }}
                    >
            TESTING SCENARIOS
                    </Typography>
                    {featureTestInstructions.map((ti) => (
                        <React.Fragment key={ti.scenarioId}>
                            <Typography>{ti.scenarioName}</Typography>
                            {ti.given.map((g, idx) => (
                                <ul key={g.id} className="preview-list">
                                    <li>
                                        <Typography>
                                            <strong>{idx === 0 ? 'Given ' : 'And '}</strong>
                                            {g.value}
                                        </Typography>
                                    </li>
                                </ul>
                            ))}
                            {ti.when.map((w, idx) => (
                                <ul key={w.id} className="preview-list">
                                    <li>
                                        <Typography>
                                            <strong>{idx === 0 ? 'Then ' : 'And '}</strong>
                                            {w.value}
                                        </Typography>
                                    </li>
                                </ul>
                            ))}
                            {ti.then.map((t, idx) => (
                                <ul key={t.id} className="preview-list">
                                    <li>
                                        <Typography>
                                            <strong>{idx === 0 ? 'When ' : 'And '}</strong>
                                            {t.value}
                                        </Typography>
                                    </li>
                                </ul>
                            ))}
                        </React.Fragment>
                    ))}
                </>
            )}
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
