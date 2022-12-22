import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { Grid } from '@mui/material';

import { getScenarioAtom } from '../../../../../../recoil/scenarios';
import { SECTION_TYPES } from '../../../../../../state-utils/scenarios';
import { Input } from '../Input/Input';
import { Name } from './components/Name';

export function Scenario({id : scenarioId}) {
    const scenario = useRecoilValue(getScenarioAtom(scenarioId));

    return (
        <>
            <Name
                scenarioId={scenarioId}
                nameInputId={scenario.nameInputId}
            />
            {SECTION_TYPES.map((sectionType) => (
                <React.Fragment key={sectionType}>
                    {scenario[sectionType].map((inputId, idx) => (
                        <Grid
                            key={inputId}
                            item
                            xs={12}
                            style={{
                                paddingLeft: '100px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Input
                                id={inputId}
                                scenarioId={scenarioId}
                                sectionType={sectionType}
                                isFirst={idx === 0}
                            />
                        </Grid>
                    ))}
                </React.Fragment>
            ))}
        </>
    );
}

Scenario.propTypes = {
    id: PropTypes.string.isRequired,
};
