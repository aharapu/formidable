import { Typography } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { DARK_TEAL } from '../../../../constants';
import { testScenariosSelector } from '../../../../recoil/scenarios';
import { SCENARIO_SECTIONS } from '../../../../recoil/constants';
import { capitalizeFirstLetter } from '../../../../utils/string-utils';

export function TestScenarios() {
    const testScenarios = useRecoilValue(testScenariosSelector);

    return testScenarios.length > 0 && (
        <>
            <Typography
                variant="subtitle1"
                style={{ marginTop: 16, color: DARK_TEAL }}
            >
                TESTING SCENARIOS
            </Typography>
            {testScenarios.map((scenario) => (
                <React.Fragment key={scenario.id}>
                    <Typography>{scenario.name.value}</Typography>
                    {SCENARIO_SECTIONS.map((section) => (
                        <React.Fragment key={section}>
                            {scenario[section].map((step, idx) => (
                                <ul key={step.id} className="preview-list">
                                    <li>
                                        <Typography>
                                            <strong>
                                                {idx === 0 ? capitalizeFirstLetter(section) + ' ' : 'And '}
                                            </strong>
                                            {step.value}
                                        </Typography>
                                    </li>
                                </ul>
                            ))}
                        </React.Fragment>
                    ))}
                </React.Fragment>
            ))}
        </>
    );
}
