import React, { useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import {
    Grid,
    TextField,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material';
import {
    ClearRounded,
    AddCircle,
} from '@mui/icons-material';

import { ORANGE } from '../../constants';

export function InputList({
    title = 'Default Title',
    textFieldLabel = 'Default Input Label',
    textFieldPlaceholder = 'Default Input Placeholder',
    textFieldOnBlur = (/* id, errorMessage */) => {},
    onAdd: handleAdd = () => {},
    onChange: handleTextFieldChange = (/* id, string */) => {},
    onDelete: handleDelete = (/* id */) => {},
    items = [],
}) {
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

        if (items.length === 0) {
            console.warn('InputList should have at least one item');
            return;
        }

        if (prevItems.length === items.length) return;

        if (prevItems.length < items.length) {
            focusLastInput(items);
            return;
        }

        if (lastDeletedIndex.current === null) {
            console.warn('lastDeletedIndex is null');
            return;
        }

        const wasLastItemDeleted = prevItems.length > items.length && lastDeletedIndex.current === items.length;
        console.log('wasLastItemDeleted', wasLastItemDeleted);
        const focusId = wasLastItemDeleted ? items[items.length - 1].id : items[lastDeletedIndex.current].id;
        console.log('focusId', focusId);

        focusInput(focusId);
    }, [items, prevItems]);

    const handleTextFieldBlur = (id) => {
        const value = items.find((item) => item.id === id).value;
        const errorMessage = validateInput(value);
        textFieldOnBlur(id, errorMessage);
    };



    return (
        <>
            <Grid
                item
                xs={12}
                style={{ paddingTop: '4px' }}
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
                            <span
                                // span is required for tooltip to work when IconButton is disabled
                            >
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
            <Grid item xs={12} display="flex" justifyContent="center"
                style={{
                    paddingTop: isLastItemErrored(items) ? '0px' : '12px',
                    marginBottom: isLastItemErrored(items) ? '-36px' : '-24px',
                }}
            >
                <IconButton
                    onClick={handleAdd}
                    style={{
                        position: 'relative',
                        bottom: isLastItemErrored(items) ? '20px' : '8px',
                    }}
                >
                    <AddCircle
                        style={{ width: '29px', height: '29px', color: ORANGE }}
                    />
                </IconButton>
            </Grid>

        </>
    );
}

InputList.propTypes = {
    title: PropTypes.string,
    textFieldLabel: PropTypes.string,
    textFieldPlaceholder: PropTypes.string,
    textFieldOnBlur: PropTypes.func,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onDelete: PropTypes.func,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            value: PropTypes.string,
        }),
    ),
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

function focusLastInput(items) {
    const lastItem = items[items.length - 1];
    focusInput(lastItem.id);
}

function isLastItemErrored (items = []) {
    if (items.length === 0) return false;

    const lastItem = items[items.length - 1];
    return Boolean(lastItem.error);
}

// TODO -> move this to a hooks file
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
