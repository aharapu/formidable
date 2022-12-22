import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import { getInputAtom } from '../../../../../../recoil/inputs';
import { IconButton, InputAdornment, TextField } from '@mui/material';
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
        <>
            <TextField
                value={capitalizeFirstLetter(sectionType)}
                disabled
                style={{
                    width: '80px',
                    opacity: isFirst ? 1 : 0,
                    marginRight: '10px',
                }}
                size="small"
            />
            <TextField
                value={input.value}
                onChange={(e) => handleChange(e.target.value)}
                style={{ flexGrow: 1 }}
                InputProps={{
                    startAdornment:
                        !isFirst ? (
                            <InputAdornment
                                position="start"
                                style={{ paddingRight: '10px' }}
                            >
                                <strong>AND</strong>
                            </InputAdornment>
                        ) : null,
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
        </>
    );
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
    scenarioId: PropTypes.string.isRequired,
    sectionType: PropTypes.oneOf(SCENARIO_SECTIONS).isRequired,
    isFirst: PropTypes.bool.isRequired,
};
