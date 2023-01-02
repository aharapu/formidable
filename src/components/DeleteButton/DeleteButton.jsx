import { ClearRounded } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export  function DeleteButton({
    tooltipTitle = 'Delete',
    onClick: handleClick = () => {},
    onKeyDown: handleKeyDown = () => {},
    disabled = false,
}) {
    return (
        <Tooltip
            placement='right'
            arrow
            title={tooltipTitle}
        >
            <span
                // span is required for tooltip to work when IconButton is disabled
            >
                <IconButton
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                >
                    <ClearRounded style={{ width: '18.25px', height: '18.25px' }} />
                </IconButton>
            </span>
        </Tooltip>
    );
}

DeleteButton.propTypes = {
    tooltipTitle: PropTypes.string,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    disabled: PropTypes.bool,
};
