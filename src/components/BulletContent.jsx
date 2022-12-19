import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
    Grid,
    TextField,
    IconButton,
    FormControlLabel,
    Switch,
} from '@mui/material';
import {
    ClearRounded,
    AddCircle,
} from '@mui/icons-material';

import { ORANGE } from '../constants';

export function BulletContent({
    textFieldLabel = 'Default Input Label',
    textFieldPlaceholder = 'Default Input Placeholder',
    textFieldOnBlur = (/* id, errorMessage */) => {},
    onAdd: handleAdd = (/* inputString */) => {},
    onChange: handleTextFieldChange = (/* id, string */) => {},
    onDelete = (/* id */) => {},
    items = [],
    showToggle: isUsingToggle = false,
    toggleLabel = 'Default Toggle Label',
    onToggleChange = (/* isChecked */) => {},
}) {
    const [showInput, setShowInput] = useState(false);

    // TODO -> add keydown handling for each input
    // const handleKeyDown = (e) => {
    //     e.keyCode === 13 && handleAddItem();
    // };

    const handleSwitchChange = (e) => {
        const isChecked = e.target.checked;
        setShowInput(isChecked);
        onToggleChange(isChecked);
    };

    // const handleTextFieldChange = (e) => {
    //     console.log('exec handleTextFieldChange');
    //     const val = e.target.value;
    //     setInputContent(val);
    //     setShowWarning(false);
    // };

    const handleTextFieldBlur = (id) => {
        const value = items.find((item) => item.id === id).value;
        const errorMessage = validateInput(value);
        textFieldOnBlur(id, errorMessage);
    };

    const isInputVisible = isUsingToggle ? showInput : true;

    // const InputProps = {
    //     endAdornment: showWarning ? (
    //         <InputAdornment position="end">
    //             <Tooltip
    //                 arrow
    //                 placement="top"
    //                 title={`${getRandomExclamation()}This text has not been added!`}
    //             >
    //                 <WarningRounded
    //                     // TODO -> add cursor default?
    //                 />
    //             </Tooltip>
    //         </InputAdornment>
    //     ) : undefined,
    // };

    return (
        <>
            {isUsingToggle && (
                <Grid container item xs={12}>
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
                    {/* <Grid item xs={12}>
                        <TextField
                            label={textFieldLabel}
                            placeholder={textFieldPlaceholder}
                            fullWidth
                            value={inputContent}
                            onChange={handleTextFieldChange}
                            onKeyDown={handleKeyDown}
                            error={textFieldShowError}
                            helperText={textFieldError}
                            onBlur={handleTextFieldBlur}
                            InputProps={InputProps}
                            size="small"
                        />
                    </Grid>
                     */}
                    {items.map(({ id, value, error }) => (
                        <React.Fragment key={id}>
                            <Grid
                                item
                                xs={12}
                                display="flex"
                                alignItems="center"
                                style={{ paddingLeft: '50px', paddingTop: '16px' }}
                            >
                                <TextField
                                    label={textFieldLabel}
                                    placeholder={textFieldPlaceholder}
                                    fullWidth
                                    value={value}
                                    onChange={(e) => handleTextFieldChange(id, e.target.value)}
                                    // onKeyDown={handleKeyDown} // TODO -> implement keydown handling
                                    error={Boolean(error)}
                                    helperText={error}
                                    onBlur={() => handleTextFieldBlur(id)}
                                    // InputProps={InputProps}
                                    size="small"
                                />
                                <IconButton onClick={() => onDelete(id)}>
                                    <ClearRounded style={{ width: '24px', height: '24px' }} />
                                </IconButton>
                            </Grid>
                        </React.Fragment>
                    ))}
                    <Grid item xs={12} display="flex" justifyContent="center">
                        <IconButton
                            onClick={handleAdd}
                            style={{ margin: '-30px 0 -16px' }}
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
};

function validateInput(value) {
    const trimmedValue = value.trim();
    if (!trimmedValue) return 'This field is required';
    return '';
}
