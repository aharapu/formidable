import { Button, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useFocus } from '../../../../hooks/useFocus';
import { usePrevious } from '../../../../hooks/usePrevious';
import { testScenariosAtom, useScenarios } from '../../../../recoil/scenarios';
import { Scenario } from './components/Scenario/Scenario';

export function TestScenarios() {
    const { addScenario } = useScenarios();
    const testScenarios = useRecoilValue(testScenariosAtom);
    const prevNumOfScenarios = usePrevious(testScenarios.length);
    const { focusScenarioName } = useFocus();

    useEffect(() => {
        if (prevNumOfScenarios === null) {
            return;
        }

        if (prevNumOfScenarios < testScenarios.length) {
            focusScenarioName(testScenarios[testScenarios.length - 1]);
        }
    }, [testScenarios.length, prevNumOfScenarios, focusScenarioName, testScenarios]);

    return (
        <>
            {testScenarios.map((scenarioId) => (
                <Scenario key={scenarioId} id={scenarioId} />
            ))}
            <Grid container item xs={12} justifyContent="center">
                <Button
                    variant="contained"
                    color="warning"
                    style={{ width: '60%' }}
                    onClick={addScenario}
                >
                    Add Testing Scenario
                </Button>
            </Grid>
        </>
    );
}
