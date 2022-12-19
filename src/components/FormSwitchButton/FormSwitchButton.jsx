import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Grid, Switch } from '@mui/material';

export function FormSwitchButton({ value, onChange, label }) {
    return (
        <Grid item xs={12}>
            <FormControlLabel
                control={
                    <Switch
                        size="medium"
                        value={value}
                        onChange={onChange}
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
};
