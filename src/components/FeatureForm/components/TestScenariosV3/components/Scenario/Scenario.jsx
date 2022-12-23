import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';

import { getScenarioAtom } from '../../../../../../recoil/scenarios';
import { Input } from '../Input/Input';
import { Name } from './components/Name';
import { SCENARIO_SECTIONS } from '../../../../../../recoil/constants';

export function Scenario({id : scenarioId}) {
    const scenario = useRecoilValue(getScenarioAtom(scenarioId));

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
                            <Input
                                key={inputId}
                                id={inputId}
                                scenarioId={scenarioId}
                                sectionType={sectionType}
                                isFirst={idx === 0}
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
