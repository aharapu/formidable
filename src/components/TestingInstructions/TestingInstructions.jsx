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

export function TestingInstructions({
    items = [],
    onChange = () => {},
}) {
    const handleAddTest = () => {
        onChange('add-test');
    };

    const handleDeleteTest = (scenarioId) => {
        onChange('delete-test', { scenarioId });
    };

    const handleScenarioNameChange = (e, scenarioId) => {
        onChange('edit-scenario-name', {
            scenarioId,
            scenarioName: e.target.value,
        });
    };

    const handleAddGiven = (id, scenarioId) => {
        onChange('add-given', { givenId: id, scenarioId });
    };
    const handleAddWhen = (id, scenarioId) => {
        onChange('add-when', { whenId: id, scenarioId });
    };
    const handleAddThen = (id, scenarioId) => {
        onChange('add-then', { thenId: id, scenarioId });
    };

    const handleGivenChange = (e, givenId, scenarioId) => {
        onChange('edit-given-value', {
            scenarioId,
            givenId,
            value: e.target.value,
        });
    };

    const handleWhenChange = (e, whenId, scenarioId) => {
        onChange('edit-when-value', {
            scenarioId,
            whenId,
            value: e.target.value,
        });
    };

    const handleThenChange = (e, thenId, scenarioId) => {
        onChange('edit-then-value', {
            scenarioId,
            thenId,
            value: e.target.value,
        });
    };

    const handleDeleteGiven = (id, scenarioId) => {
        onChange('delete-given', { givenId: id, scenarioId });
    };

    const handleDeleteWhen = (id, scenarioId) => {
        onChange('delete-when', { whenId: id, scenarioId });
    };

    const handleDeleteThen = (id, scenarioId) => {
        onChange('delete-then', { thenId: id, scenarioId });
    };

    return (
        <>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleAddTest}>
          Add Test
                </Button>
            </Grid>
            {items.map((item) => (
                <React.Fragment key={item.scenarioId}>
                    <Grid item xs={12} display="flex" alignItems="center">
                        <IconButton onClick={() => handleDeleteTest(item.scenarioId)}>
                            <DeleteForever />
                        </IconButton>
                        <TextField
                            label="scenario name"
                            value={item.scenarioName}
                            fullWidth
                            onChange={(e) => handleScenarioNameChange(e, item.scenarioId)}
                            size="small"
                        />
                    </Grid>
                    {item.given.map((g, idx) => (
                        <Grid
                            key={g.id}
                            item
                            xs={12}
                            style={{
                                paddingLeft: '100px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                value="Given"
                                disabled
                                style={{
                                    width: '80px',
                                    opacity: idx === 0 ? 1 : 0,
                                    marginRight: '10px',
                                }}
                                size="small"
                            />
                            <TextField
                                value={g.value}
                                onChange={(e) => handleGivenChange(e, g.id, item.scenarioId)}
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
                                        ? () => handleAddGiven(g.id, item.scenarioId)
                                        : () => handleDeleteGiven(g.id, item.scenarioId)
                                }
                            >
                                {idx === 0 ? <AddCircleOutline /> : <DeleteForever />}
                            </IconButton>
                        </Grid>
                    ))}
                    {item.when.map((w, idx) => (
                        <Grid
                            key={w.id}
                            item
                            xs={12}
                            style={{
                                paddingLeft: '100px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                value="When"
                                disabled
                                style={{
                                    width: '80px',
                                    opacity: idx === 0 ? 1 : 0,
                                    marginRight: '10px',
                                }}
                                size="small"
                            />
                            <TextField
                                value={w.value}
                                onChange={(e) => handleWhenChange(e, w.id, item.scenarioId)}
                                style={{ flexGrow: 1 }}
                                InputProps={{
                                    startAdornment:
                                        idx !== 0 ? (
                                            <InputAdornment style={{ paddingRight: '10px' }}>
                                                <strong>AND</strong>
                                            </InputAdornment>
                                        ) : null,
                                }}
                                size="small"
                            />
                            <IconButton
                                onClick={
                                    idx === 0
                                        ? () => handleAddWhen(w.id, item.scenarioId)
                                        : () => handleDeleteWhen(w.id, item.scenarioId)
                                }
                            >
                                {idx === 0 ? <AddCircleOutline /> : <DeleteForever />}
                            </IconButton>
                        </Grid>
                    ))}
                    {item.then.map((t, idx) => (
                        <Grid
                            key={t.id}
                            item
                            xs={12}
                            style={{
                                paddingLeft: '100px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                value="Then"
                                disabled
                                style={{
                                    width: '80px',
                                    opacity: idx === 0 ? 1 : 0,
                                    marginRight: '10px',
                                }}
                                size="small"
                            />
                            <TextField
                                value={t.value}
                                onChange={(e) => handleThenChange(e, t.id, item.scenarioId)}
                                style={{ flexGrow: 1 }}
                                InputProps={{
                                    startAdornment:
                                        idx !== 0 ? (
                                            <InputAdornment style={{ paddingRight: '10px' }}>
                                                <strong>AND</strong>
                                            </InputAdornment>
                                        ) : null,
                                }}
                                size="small"
                            />
                            <IconButton
                                onClick={
                                    idx === 0
                                        ? () => handleAddThen(t.id, item.scenarioId)
                                        : () => handleDeleteThen(t.id, item.scenarioId)
                                }
                            >
                                {idx === 0 ? <AddCircleOutline /> : <DeleteForever />}
                            </IconButton>
                        </Grid>
                    ))}
                </React.Fragment>
            ))}
        </>
    );
}

TestingInstructions.propTypes = {
    items: PropTypes.array,
    onChange: PropTypes.func,
};
