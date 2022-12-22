import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import { Grid, IconButton, TextField } from '@mui/material';
import { DeleteForever } from '@mui/icons-material';

import { getScenarioAtom, useScenarios } from '../../../../../../recoil/scenarios';
import { SECTION_TYPES } from '../../../../../../state-utils/scenarios';
import { Input } from '../Input/Input';

export function Scenario({id : scenarioId}) {
    const [scenario, setScenario] = useRecoilState(getScenarioAtom(scenarioId));
    const { removeScenario } = useScenarios();

    // TODO -> use input atom for scenario name to avoid rerendering entire scenario
    const handleScenarioNameChange = (e) => {
        setScenario((prevScenario) => ({
            ...prevScenario,
            name: e.target.value,
        }));
    };

    return (
        <>
            <Grid item xs={12} display="flex" alignItems="center">
                <IconButton onClick={() => removeScenario(scenarioId)}>
                    <DeleteForever />
                </IconButton>
                <TextField
                    label="scenario name"
                    value={scenario.name}
                    fullWidth
                    onChange={handleScenarioNameChange}
                    size="small"
                />
            </Grid>
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
