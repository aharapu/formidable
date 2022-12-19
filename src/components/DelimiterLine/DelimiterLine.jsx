import React from 'react';
import { LIGHT_GRAY } from '../../constants';

export function DelimiterLine() {
    return (
        <hr style={{
            width: '100%',
            border: `1px solid ${LIGHT_GRAY}33`,
        }} />
    );
}
