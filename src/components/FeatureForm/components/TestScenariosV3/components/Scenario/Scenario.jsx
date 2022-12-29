import React, { useLayoutEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';

import { getScenarioAtom } from '../../../../../../recoil/scenarios';
import { SCENARIO_SECTIONS } from '../../../../../../recoil/constants';

import { TestStep } from '../TestStep/TestStep';
import { Name } from './components/Name';
import { usePrevious } from '../../../../../../hooks/usePrevious';
import { focusInput } from '../../../../../../hooks/useFocus';

export function Scenario({id : scenarioId}) {
    const scenario = useRecoilValue(getScenarioAtom(scenarioId));

    const sectionLengths = useMemo(
        () => SCENARIO_SECTIONS.reduce((acc, sectionType) => {
            acc = { ...acc, [sectionType]: scenario[sectionType].length };
            return acc;
        }, {}),
        [scenario],
    );

    const prevSectionLengths = usePrevious(sectionLengths);

    useLayoutEffect(() => {
        if (!prevSectionLengths) {
            return;
        }

        SCENARIO_SECTIONS.forEach((sectionType) => {
            const prevLength = prevSectionLengths[sectionType];
            const currLength = sectionLengths[sectionType];

            if (prevLength < currLength) {
                const newInputId = scenario[sectionType][currLength - 1];
                focusInput(newInputId);
            }
        });


    }, [sectionLengths, prevSectionLengths, scenario]);


    return (
        <>
            <Name
                scenarioId={scenarioId}
                nameInputId={scenario.nameInputId}
            />
            {SCENARIO_SECTIONS.map((sectionType) => (
                <React.Fragment key={sectionType}>
                    {
                        scenario[sectionType].map((inputId, idx) => (
                            <TestStep
                                key={inputId}
                                id={inputId}
                                index={idx}
                                scenarioId={scenarioId}
                                sectionType={sectionType}
                                sectionItems={scenario[sectionType]}
                            />
                        ))
                    }
                </React.Fragment>
            ))}
        </>
    );
}

Scenario.propTypes = {
    id: PropTypes.string.isRequired,
};
