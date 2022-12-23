import { Button, Grid } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { testScenariosAtom, useScenarios } from '../../../../recoil/scenarios';
import { Scenario } from './components/Scenario/Scenario';

export function TestScenariosV3() {
    const { addScenario } = useScenarios();
    const testScenarios = useRecoilValue(testScenariosAtom);

    // TODO -> switch focus to scenario name when a new scenario is added

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
