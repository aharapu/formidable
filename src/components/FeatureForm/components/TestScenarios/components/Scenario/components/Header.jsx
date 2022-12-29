
import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';

import { DeleteForever } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';

import { getInputAtom } from '../../../../../../../recoil/inputs';
import { useScenarios } from '../../../../../../../recoil/scenarios';
import { useFocus } from '../../../../../../../hooks/useFocus';
import { SCENARIO_SECTION } from '../../../../../../../recoil/constants';
import { FFTextField } from '../../../../../../mui-wrappers/FFTextField/FFTextField';


// TODO -> rename to header?
export function Header({ scenarioId, nameInputId}) {
    const [input, setInput] = useRecoilState(getInputAtom(nameInputId));

    const { removeScenario } = useScenarios();
    const { focusScenarioInput } = useFocus();

    // TODO -> add some blur validation?
    const handleInputChange = (e) => {
        setInput((prevInput) => ({
            ...prevInput,
            value: e.target.value,
        }));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            focusScenarioInput({
                scenarioId,
                sectionType: SCENARIO_SECTION.GIVEN,
                index: 0,
            });
        }
    };

    return (
        <Grid item xs={12} display="flex" alignItems="center" marginTop={3}>
            <FFTextField
                label="scenario name"
                value={input.value}
                fullWidth
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                size="small"
            />
            <IconButton onClick={() => removeScenario(scenarioId)}>
                <DeleteForever />
            </IconButton>
        </Grid>
    );
}

Header.propTypes = {
    scenarioId: PropTypes.string.isRequired,
    nameInputId: PropTypes.string.isRequired,
};