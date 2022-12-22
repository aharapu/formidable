import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { getScenarioAtom, useScenarios } from '../../../../../../recoil/scenarios';
import { SECTION_TYPES } from '../../../../../../state-utils/scenarios';
import { Input } from '../Input/Input';

export function Scenario({id : scenarioId}) {
    const scenario = useRecoilValue(getScenarioAtom(scenarioId));
    const { addScenarioInput } = useScenarios();

    return (
        <div>
            <div>{scenario.name}</div>
            {SECTION_TYPES.map((sectionType) => (
                <div key={sectionType}>
                    <>
                        <div>{sectionType}</div>
                        {scenario[sectionType].map((inputId) => (
                            <Input key={inputId} id={inputId} />
                        ))}
                        <button
                            onClick={() => addScenarioInput(scenarioId, sectionType)}
                        >
                                    add input
                        </button>
                    </>
                </div>
            ))}
        </div>
    );
}

Scenario.propTypes = {
    id: PropTypes.string.isRequired,
};
