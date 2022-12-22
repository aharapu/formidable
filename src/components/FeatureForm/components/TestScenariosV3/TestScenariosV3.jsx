import React from 'react';
import { useRecoilValue } from 'recoil';
import { testScenariosAtom, useScenarios } from '../../../../recoil/scenarios';
import { Scenario } from './components/Scenario/Scenario';

export function TestScenariosV3() {
    const { addScenario } = useScenarios();
    const testScenarios = useRecoilValue(testScenariosAtom);

    console.log('testScenarios' , testScenarios );

    return (
        <>
            <button onClick={addScenario}>Add Scenario</button>
            {testScenarios.map((scenarioId) => (
                <Scenario key={scenarioId} id={scenarioId} />
            ))}
        </>
    );
}
