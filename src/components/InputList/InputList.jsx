import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import {
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import {
    AddCircle,
} from '@mui/icons-material';

import { ORANGE } from '../../constants';
import { focusInput } from '../../hooks/useFocus';
import { usePrevious } from '../../hooks/usePrevious';
import { FFTextField } from '../mui-wrappers/FFTextField/FFTextField';
import { DeleteButton } from '../DeleteButton/DeleteButton';
import { isCharacterKey, isEnterKey, isEscapeKey } from '../../utils/keyboard-utils';

export function InputList({
    title = 'Default Title',
    textFieldLabel = 'Default Input Label',
    textFieldPlaceholder = 'Default Input Placeholder',
    onInputBlur = (/* id, errorMessage */) => {},
    onAdd: handleAdd = () => {},
    onChange: handleTextFieldChange = (/* id, string */) => {},
    onDelete: handleDelete = (/* id */) => {},
    items = [],
}) {
    const prevItems = usePrevious(items);
    const lastDeletedIndex = useRef(null);

    const handleTextFieldKeyDown = (e, idx) => {
        const isLastItem = idx === items.length - 1;
        const isEmpty = items[idx].value.trim() === '';
        const isAlone = items.length === 1;

        if (isEnterKey(e.key) && isLastItem) {
            handleAdd();
        } else if (isEnterKey(e.key) && !isLastItem) {
            focusInput(items[idx + 1].id);
        } else if (isEscapeKey(e.key) && isLastItem && isEmpty && !isAlone) {
            handleTextFieldDelete(items[idx].id, idx);
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
        const focusId = wasLastItemDeleted ? items[items.length - 1].id : items[lastDeletedIndex.current].id;

        focusInput(focusId);
    }, [items, prevItems]);

    const handleTextFieldBlur = (id) => {
        const value = items.find((item) => item.id === id).value;
        const errorMessage = validateInput(value);
        onInputBlur(id, errorMessage);
    };

    const handleDeleteBtnKeyDown = (e, id, idx) => {
        console.log('handleDeleteBtnKeyDown');
        if (isCharacterKey(e.key)) {
            focusInput(id);
        } else if (isEnterKey(e.key)) {
            handleTextFieldDelete(id, idx);
        }
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
                        <FFTextField
                            id={id}
                            label={`${textFieldLabel} No. ${idx + 1}`}
                            placeholder={textFieldPlaceholder}
                            fullWidth
                            value={value}
                            onChange={(e) => handleTextFieldChange(id, e.target.value)}
                            onKeyDown={(e) => handleTextFieldKeyDown(e, idx)}
                            error={Boolean(error)}
                            helperText={error}
                            onBlur={() => handleTextFieldBlur(id)}
                            size="small"
                        />
                        <DeleteButton
                            tooltipTitle={items.length === 1 ? 'Must have at least one item' : 'Delete'}
                            disabled={items.length === 1}
                            onClick={() => handleTextFieldDelete(id, idx)}
                            onKeyDown={(e) => handleDeleteBtnKeyDown(e, id, idx)}
                        />
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
    onInputBlur: PropTypes.func,
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

function focusLastInput(items) {
    const lastItem = items[items.length - 1];
    focusInput(lastItem.id);
}

function isLastItemErrored (items = []) {
    if (items.length === 0) return false;

    const lastItem = items[items.length - 1];
    return Boolean(lastItem.error);
}
