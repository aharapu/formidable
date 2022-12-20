import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Grid,
    TextField,
    IconButton,
    InputAdornment,
} from '@mui/material';
import {
    AddCircleOutline,
    DeleteForever,
} from '@mui/icons-material';
import { SECTION_TYPES } from '../../state-utils/scenarios';

export function TestingInstructions({
    scenarios = [],
    onChange: handleChange = () => {},
}) {
    const handleAddTest = () => {
        handleChange('add-scenario');
    };

    const handleDeleteTest = (scenarioId) => {
        handleChange('delete-scenario', { scenarioId });
    };

    const handleScenarioNameChange = (e, scenarioId) => {
        handleChange('edit-scenario-name', {
            scenarioId,
            scenarioName: e.target.value,
        });
    };

    const handleAddInput = (scenarioId, sectionType) => {
        handleChange('add-input', { scenarioId, sectionType });
    };

    const handleChangeInput = (scenarioId, sectionType, inputId, inputValue) => {
        handleChange('edit-input-value', {
            scenarioId, sectionType, inputId, inputValue,
        });
    };

    const handleDeleteInput = (scenarioId, sectionType, inputId) => {
        handleChange('delete-input', { scenarioId, sectionType, inputId });
    };

    return (
        <>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleAddTest}>
          Add Test
                </Button>
            </Grid>
            {scenarios.map((scenario) => (
                <React.Fragment key={scenario.id}>
                    <Grid item xs={12} display="flex" alignItems="center">
                        <IconButton onClick={() => handleDeleteTest(scenario.id)}>
                            <DeleteForever />
                        </IconButton>
                        <TextField
                            label="scenario name"
                            value={scenario.name}
                            fullWidth
                            onChange={(e) => handleScenarioNameChange(e, scenario.id)}
                            size="small"
                        />
                    </Grid>
                    {
                        SECTION_TYPES.map((sectionType) => (
                            <React.Fragment key={sectionType}>
                                {
                                    scenario[sectionType].map((input, idx) => (
                                        <Grid
                                            key={input.id}
                                            item
                                            xs={12}
                                            style={{
                                                paddingLeft: '100px',
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <TextField
                                                value={capitalizeFirstLetter(sectionType)}
                                                disabled
                                                style={{
                                                    width: '80px',
                                                    opacity: idx === 0 ? 1 : 0,
                                                    marginRight: '10px',
                                                }}
                                                size="small"
                                            />
                                            <TextField
                                                value={input.value}
                                                onChange={
                                                    (e) => handleChangeInput(
                                                        scenario.id, sectionType, input.id, e.target.value,
                                                    )
                                                }
                                                style={{ flexGrow: 1 }}
                                                InputProps={{
                                                    startAdornment:
                                                idx !== 0 ? (
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
                                                    idx === 0
                                                        ? () => handleAddInput(scenario.id, sectionType)
                                                        : () => handleDeleteInput(scenario.id, sectionType, input.id)
                                                }
                                            >
                                                {idx === 0 ? <AddCircleOutline /> : <DeleteForever />}
                                            </IconButton>
                                        </Grid>
                                    ))}
                            </React.Fragment>
                        ))}
                </React.Fragment>
            ))}
        </>
    );
}

TestingInstructions.propTypes = {
    scenarios: PropTypes.array,
    onChange: PropTypes.func,
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
