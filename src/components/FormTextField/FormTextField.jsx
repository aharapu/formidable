import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';
import { getPixelsFromSize } from '../../common/size-utils';
import { PIXEL_SIZE, PIXEL_SIZES } from '../../common/size-constants';

export function FormTextField({
    label,
    placeholder,
    value,
    onChange,
    multiline,
    onBlur = () => {},
    error,
    helperText,
    topGap = PIXEL_SIZE.medium,
}) {
    const paddingTop = getPixelsFromSize(topGap);

    return (
        <Grid item xs={12} style={{ paddingTop }}>
            <TextField
                label={label}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                fullWidth
                multiline={multiline}
                rows={4}
                onBlur={onBlur}
                error={error}
                helperText={helperText}
                size="small"
            />
        </Grid>
    );
}

FormTextField.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    multiline: PropTypes.bool,
    showToggle: PropTypes.bool,
    toggleLabel: PropTypes.string,
    onToggleChange: PropTypes.func,
    onBlur: PropTypes.func,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    topGap: PropTypes.oneOf(PIXEL_SIZES),
};
