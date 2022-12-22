
import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';

import { DeleteForever } from '@mui/icons-material';
import { Grid, IconButton, TextField } from '@mui/material';

import { getInputAtom } from '../../../../../../../recoil/inputs';
import { useScenarios } from '../../../../../../../recoil/scenarios';

// TODO -> rename to header?
export function Name({ scenarioId, nameInputId}) {
    const [input, setInput] = useRecoilState(getInputAtom(nameInputId));

    const { removeScenario } = useScenarios();

    // TODO -> add some blur validation?
    const handleInputChange = (e) => {
        setInput((prevInput) => ({
            ...prevInput,
            value: e.target.value,
        }));
    };

    return (
        <Grid item xs={12} display="flex" alignItems="center">
            <IconButton onClick={() => removeScenario(scenarioId)}>
                <DeleteForever />
            </IconButton>
            <TextField
                label="scenario name"
                value={input.value}
                fullWidth
                onChange={handleInputChange}
                size="small"
            />
        </Grid>
    );
}

Name.propTypes = {
    scenarioId: PropTypes.string.isRequired,
    nameInputId: PropTypes.string.isRequired,
};
