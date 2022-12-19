// TODO -> move file to component folder
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import {
    Grid,
    TextField,
    IconButton,
    FormControlLabel,
    Switch,
    Tooltip,
    Typography,
} from '@mui/material';
import {
    ClearRounded,
    AddCircle,
} from '@mui/icons-material';

import { LIGHT_GRAY, ORANGE } from '../constants';

export function BulletContent({
    title = 'Default Title',
    textFieldLabel = 'Default Input Label',
    textFieldPlaceholder = 'Default Input Placeholder',
    textFieldOnBlur = (/* id, errorMessage */) => {},
    onAdd: handleAdd = (/* inputString */) => {},
    onChange: handleTextFieldChange = (/* id, string */) => {},
    onDelete: handleDelete = (/* id */) => {},
    items = [],
    showToggle: isUsingToggle = false,
    toggleLabel = 'Default Toggle Label',
    onToggleChange = (/* isChecked */) => {},
    showDelimiter = false,
}) {
    const [showInput, setShowInput] = useState(false);

    const prevItems = usePrevious(items);
    const lastDeletedIndex = useRef(null);

    const handleKeyDown = (e, idx) => {
        if (e.keyCode !== 13) return;
        if (idx === items.length - 1) {
            handleAdd();
        }
    };

    const handleTextFieldDelete = (id, idx) => {
        lastDeletedIndex.current = idx;
        handleDelete(id);
    };

    // change focus when items are added or deleted
    useLayoutEffect(() => {
        if (!prevItems) return;

        if (prevItems.length < items.length) {
            // TODO -> write a focusLastInput function that builds off a focusInput function
            const lastItem = items[items.length - 1];
            focusInput(lastItem.id);
        }

        if (prevItems.length > items.length) {
            const wasLastItemDeleted = lastDeletedIndex.current === items.length;
            if (wasLastItemDeleted) {
                const lastItem = items[items.length - 1];
                focusInput(lastItem.id);
            } else {
                const nextItem = items[lastDeletedIndex.current];
                focusInput(nextItem.id);
            }
        }
    }, [items, prevItems]);

    const handleSwitchChange = (e) => {
        const isChecked = e.target.checked;
        setShowInput(isChecked);
        onToggleChange(isChecked);
    };

    const handleTextFieldBlur = (id) => {
        const value = items.find((item) => item.id === id).value;
        const errorMessage = validateInput(value);
        textFieldOnBlur(id, errorMessage);
    };

    const isInputVisible = isUsingToggle ? showInput : true;

    return (
        <>
            {showDelimiter &&
                // TODO -> extract to own component
                <Grid item xs={12} style={{ paddingTop: '20px', paddingBottom: '4px' }} >
                    <hr style={{
                        width: '100%',
                        border: `1px solid ${LIGHT_GRAY}33`,
                    }} />
                </Grid>
            }
            {isUsingToggle && (
                // TODO -> extract to own component
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Switch
                                size="medium"
                                value={showInput}
                                onChange={handleSwitchChange}
                            />
                        }
                        label={toggleLabel}
                    />
                </Grid>
            )}
            {isInputVisible && (
                <>
                    <Grid
                        item
                        xs={12}
                        style={{ paddingTop: '12px' }}
                    >
                        <Typography
                            variant="subtitle2"
                        >
                            {title}
                        </Typography>
                    </Grid>
                    {items.map(({ id, value, error }, idx) => (
                        <React.Fragment key={id}>
                            <Grid
                                item
                                xs={12}
                                display="flex"
                                alignItems="start"
                                style={{ paddingTop: '12px' }}
                            >
                                <TextField
                                    id={id}
                                    label={`${textFieldLabel} No. ${idx + 1}`}
                                    placeholder={textFieldPlaceholder}
                                    fullWidth
                                    value={value}
                                    onChange={(e) => handleTextFieldChange(id, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, idx)}
                                    error={Boolean(error)}
                                    helperText={error}
                                    onBlur={() => handleTextFieldBlur(id)}
                                    size="small"
                                />
                                <Tooltip
                                    placement='right'
                                    arrow
                                    title={items.length === 1 ? 'Must have at least one item' : 'Delete'}
                                >
                                    <span>
                                        <IconButton onClick={() => handleTextFieldDelete(id, idx)}
                                            disabled={items.length === 1}
                                        >
                                            <ClearRounded style={{ width: '18.25px', height: '18.25px' }} />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </Grid>
                        </React.Fragment>
                    ))}
                    <Grid item xs={12} display="flex" justifyContent="center">
                        <IconButton
                            onClick={handleAdd}
                            style={{
                                margin: '-30px 0 -16px', // TODO -> move up when last item has error
                            }}
                        >
                            <AddCircle
                                style={{ width: '29px', height: '29px', color: ORANGE }}
                            />
                        </IconButton>
                    </Grid>
                </>
            )}
        </>
    );
}

BulletContent.propTypes = {
    title: PropTypes.string,
    textFieldLabel: PropTypes.string,
    textFieldPlaceholder: PropTypes.string,
    textFieldShowError: PropTypes.bool,
    textFieldError: PropTypes.string,
    textFieldOnBlur: PropTypes.func,
    onAdd: PropTypes.func, // TODO -> remove this
    onChange: PropTypes.func,
    onDelete: PropTypes.func,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            value: PropTypes.string,
        }),
    ),
    showToggle: PropTypes.bool,
    toggleLabel: PropTypes.string,
    onToggleChange: PropTypes.func,
    showDelimiter: PropTypes.bool,
};

// TODO -> move this to a utils file
function validateInput(value) {
    const trimmedValue = value.trim();
    if (!trimmedValue) return 'This field is required';
    return '';
}

function focusInput(id) {
    const input = document.getElementById(id);
    input.focus();
}

// TODO -> move this to a hooks file
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
