import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { DARK_GREY} from '../../../../constants';

export function PreviewText({ title = '', content, titleColor = DARK_GREY, isErrored }) {
    const showTitle = Boolean(title.trim());

    const boxStyles = {
        marginTop: '16px',
    };

    if (isErrored) {
        boxStyles.border = '1px solid red';
        boxStyles.borderRadius = '4px';
        boxStyles.padding = '4px 8px';
    }

    return (
        <Box sx={boxStyles}>
            {
                showTitle && (
                    <Typography
                        variant="subtitle1"
                        sx={{  color: titleColor }}
                    >
                        {title}
                    </Typography>
                )
            }
            <Typography variant="body1" color="text.primary">
                {content}
            </Typography>
        </Box>

    );
}

PreviewText.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string.isRequired,
    titleColor: PropTypes.string,
    isErrored: PropTypes.bool,
};
