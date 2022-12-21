import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { LIGHT_GRAY } from '../../../../constants';

export function PreviewText({ title = '', what }) {
    const showTitle = Boolean(title.trim());

    return (
        <>
            {
                showTitle && (
                    <Typography
                        variant="subtitle1"
                        style={{ marginTop: 16, color: LIGHT_GRAY }}
                    >
                        {title}
                    </Typography>
                )
            }
            <Typography variant="body1" color="text.primary">
                {what}
            </Typography>
        </>

    );
}

PreviewText.propTypes = {
    title: PropTypes.string,
    what: PropTypes.string.isRequired,
};
