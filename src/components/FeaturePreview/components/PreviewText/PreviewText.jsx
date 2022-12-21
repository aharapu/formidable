import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { DARK_GREY} from '../../../../constants';

export function PreviewText({ title = '', content, titleColor = DARK_GREY }) {
    const showTitle = Boolean(title.trim());

    return (
        <>
            {
                showTitle && (
                    <Typography
                        variant="subtitle1"
                        style={{ marginTop: 16, color: titleColor }}
                    >
                        {title}
                    </Typography>
                )
            }
            <Typography variant="body1" color="text.primary">
                {content}
            </Typography>
        </>

    );
}

PreviewText.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string.isRequired,
    titleColor: PropTypes.string,
};
