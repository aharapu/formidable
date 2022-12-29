import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const OFFSET_LIMIT = 25;

// FF stands for Formidable Forms
export function FFTextField({ children, ...args }) {
    const elementRef = useRef(null);

    const handleFocus = () => {
        const element = elementRef.current;

        if (!element) {
            return;
        }

        const elementBottom = element.getBoundingClientRect().bottom;

        const offsetTop = element.getBoundingClientRect().top;
        const offsetBottom = window.innerHeight - elementBottom;

        if (offsetTop <= OFFSET_LIMIT || offsetBottom <= OFFSET_LIMIT) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    return (
        <TextField ref={elementRef} onFocus={handleFocus} {...args}>
            {children}
        </TextField>
    );
}

FFTextField.propTypes = {
    children: PropTypes.node,
};
