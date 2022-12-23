import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import { getInputAtom } from '../../../../../../recoil/inputs';
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { capitalizeFirstLetter } from '../../../../../../utils/string-utils';
import { AddCircleOutline, DeleteForever } from '@mui/icons-material';
import { useScenarios } from '../../../../../../recoil/scenarios';
import { SCENARIO_SECTIONS } from '../../../../../../recoil/constants';

// TODO -> rename to TestStep?
export function Input({id: inputId, scenarioId, sectionType, isFirst}) {
    const [input, setInput] = useRecoilState(getInputAtom(inputId));
    const { addScenarioInput, removeScenarioInput } = useScenarios();

    const handleChange = (value) => {
        setInput((prevInput) => ({
            ...prevInput,
            value,
        }));
    };

    return (
        <Grid
            item
            xs={12}
            style={{
                paddingTop: isFirst ? '8px' : '4px',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <TextField
                value={input.value}
                onChange={(e) => handleChange(e.target.value)}
                style={{
                    flexGrow: 1,
                    paddingLeft: isFirst ? '48px' : '92px',
                }}
                InputProps={{
                    startAdornment:
                        (
                            <InputAdornment
                                position="start"
                                style={{ paddingRight: '10px' }}
                            >
                                <strong>
                                    {isFirst ? capitalizeFirstLetter(sectionType) : 'And'}
                                </strong>
                            </InputAdornment>
                        ),
                }}
                size="small"
            />
            <IconButton
                onClick={
                    isFirst
                        ? () => addScenarioInput({scenarioId, sectionType})
                        : () => removeScenarioInput({scenarioId, sectionType, inputId})
                }
            >
                {isFirst ? <AddCircleOutline /> : <DeleteForever />}
            </IconButton>
        </Grid>
    );
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
    scenarioId: PropTypes.string.isRequired,
    sectionType: PropTypes.oneOf(SCENARIO_SECTIONS).isRequired,
    isFirst: PropTypes.bool.isRequired,
};
