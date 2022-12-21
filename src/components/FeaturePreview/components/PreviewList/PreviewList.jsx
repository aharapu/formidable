import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { DARK_GREY } from '../../../../constants';

export function PreviewList({ title = '', items, titleColor = DARK_GREY}) {
    const showTitle = Boolean(title.trim());
    const nonEmptyItems = items.filter((item) => Boolean(item.value.trim()));

    if (nonEmptyItems.length === 0) {
        return null;
    }

    return (
        <>
            {showTitle && <Typography variant="subtitle1" style={{ marginTop: 16, color: titleColor }}>
                {title}
            </Typography>}
            <ul
                className="preview-list" // TODO -> use mui styles
            >
                {nonEmptyItems.map((item) => (
                    <li key={item.id}>
                        <Typography variant="body1">{item.value}</Typography>
                    </li>
                ))}
            </ul>
        </>
    );
}

PreviewList.propTypes = {
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    })).isRequired,
    titleColor: PropTypes.string,
};
