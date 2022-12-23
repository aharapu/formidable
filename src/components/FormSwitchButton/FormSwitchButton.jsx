import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Grid, Switch } from '@mui/material';
import styled from '@emotion/styled';

// TODO -> make highlight on focus a lot more visible
const StyledSwitch = styled(Switch)(({ checkedColor }) => {
    return {
        '& .MuiSwitch-switchBase': {
            '&.Mui-checked': {
                color: checkedColor,
                // },
                // '& + .MuiSwitch-track': {
                //     opacity: 1,
                //     backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
                // },
            },
        },
        '&.Mui-checked': { // not it
            // color: 'black',
            // backgroundColor: checkedColor,
        },
        '& .Mui-checked + .MuiSwitch-track': {
            // backgroundColor: checkedColor,
        },
        '& .Mui-checked + .MuiSwitch-thumb': { // not it
        // backgroundColor: 'red',
            // color: checkedColor,
        },
        '& .MuiSwitch-thumb': {
            // color: checkedColor, // kinda does it, but can't change the ripple
            // backgroundColor: 'purple',
        },
        // TODO -> can these be used in theme?
        '& .MuiTocuhRipple-root': {
            // color: RED,
        },
        '&.MuiTouchRipple-ripple': {
            // opacity: 1,
        },
        '&.MuiTouchRipple-rippleVisible': {
            // opacity: 1,
        },
    };
});
export function FormSwitchButton({ value, onChange, label, checkedColor }) {
    return (
        <Grid item xs={12} style={{}}>
            <FormControlLabel
                control={
                    <StyledSwitch
                        size="medium"
                        value={value}
                        onChange={onChange}
                        checkedColor={checkedColor}
                    />
                }
                label={label}
            />
        </Grid>
    );
}



FormSwitchButton.propTypes = {
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    checkedColor: PropTypes.string.isRequired,
};
