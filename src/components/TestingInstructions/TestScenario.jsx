import PropTypes from 'prop-types';
import { AddCircleOutline, DeleteForever } from '@mui/icons-material';
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import { selector, useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { featureTestInstruct } from '../../constants';
import {     addScenario, addTestInstructionsInput, deleteScenario, deleteTestInstructionsInput,
    updateScenarioName, updateTestInstructionsInput, SECTION_TYPES } from '../../state-utils/scenarios';
import { capitalizeFirstLetter } from '../../utils/string-utils';

const scenarioSelectors = {};

function getScenarioSelector (id){
    if (scenarioSelectors[id]) return scenarioSelectors[id];

    const scenarioSelector = selector({
        key: `scenario-${id}`,
        get: ({ get }) => {
            const scenarios = get(featureTestInstruct);
            return scenarios.find((scenario) => scenario.id === id);
        },
    });

    scenarioSelectors[id] = scenarioSelector;
    return scenarioSelector;
}
// memoize component

export const TestScenario = React.memo(
    function TestScenario({ id }) {
        const scenario = useRecoilValue(getScenarioSelector(id));
        const setTestInstructions = useSetRecoilState(featureTestInstruct);

        // use recoil callback to get secarios state
        const handleChange = useRecoilCallback(({ snapshot }) => (changeType, data) => {
            const scenarios = snapshot.getLoadable(featureTestInstruct).contents;

            const scenarioId = data?.scenarioId;
            const scenarioName = data?.scenarioName;
            const sectionType = data?.sectionType;
            const inputValue = data?.inputValue;
            const inputId = data?.inputId;

            switch (changeType) {
            case 'add-scenario':
                setTestInstructions(addScenario(scenarios));
                break;
            case 'delete-scenario':
                setTestInstructions(deleteScenario(scenarios, scenarioId));
                break;
            case 'edit-scenario-name':
                setTestInstructions(updateScenarioName(scenarios, scenarioId, scenarioName));
                break;
            case 'edit-input-value':
                setTestInstructions(
                    updateTestInstructionsInput(scenarios, scenarioId, sectionType, inputId, inputValue),
                );
                break;
            case 'add-input':
                setTestInstructions(addTestInstructionsInput(scenarios, scenarioId, sectionType));
                break;
            case 'delete-input':
                setTestInstructions(
                    deleteTestInstructionsInput(scenarios, scenarioId, sectionType, inputId),
                );
                break;
            default:
                break;
            }
        });

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
                <button
                    onClick={handleAddTest}
                >add another scenario</button>
            </React.Fragment>
        );
    },
    (prevProps, nextProps) => prevProps.id === nextProps.id,
);

TestScenario.propTypes = {
    id: PropTypes.string.isRequired,
};
