import React from 'react';
import { useRecoilValue } from 'recoil';
import { featureTestInstruct } from '../../../../constants';

import { TestScenario } from '../../../TestingInstructions/TestScenario';

// TODO -> need to somehow only rerender a segment at a time
//         when a change is made to the state
//         (e.g. when a new scenario is added, only the new scenario should rerender)
//         (e.g. when a new input is added, only the new input should rerender)

export function TestScenariosV2() {
    const testScenarios = useRecoilValue(featureTestInstruct);

    return testScenarios.map((scenario) => (
        <TestScenario key={scenario.id} id={scenario.id} />
    ));
}
