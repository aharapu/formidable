import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import { getInputAtom } from '../../../../../../recoil/inputs';
import { Grid, IconButton, InputAdornment } from '@mui/material';
import { capitalizeFirstLetter } from '../../../../../../utils/string-utils';
import { AddCircleOutline, DeleteForever } from '@mui/icons-material';
import { useScenarios } from '../../../../../../recoil/scenarios';
import { SCENARIO_SECTIONS } from '../../../../../../recoil/constants';
import { focusInput } from '../../../../../../hooks/useFocus';
import { FFTextField } from '../../../../../mui-wrappers/FFTextField/FFTextField';

// TODO -> rename to TestStep?
export function Input({id: inputId, scenarioId, sectionType, index, sectionItems }) {
    const [input, setInput] = useRecoilState(getInputAtom(inputId));
    const { addScenarioInput, removeScenarioInput } = useScenarios();

    const isFirst = index === 0;
    const isLast = index === sectionItems.length - 1;

    const handleChange = (value) => {
        setInput((prevInput) => ({
            ...prevInput,
            value,
        }));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (isLast) {
                addScenarioInput({
                    scenarioId,
                    sectionType,
                });
            } else {
                focusInput(sectionItems[index + 1]);
            }
        }
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
            <FFTextField
                id={inputId}
                value={input.value}
                onChange={(e) => handleChange(e.target.value)}
                onKeyPress={handleKeyPress}
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
    index: PropTypes.number.isRequired,
    sectionItems: PropTypes.arrayOf(PropTypes.string).isRequired,
};
