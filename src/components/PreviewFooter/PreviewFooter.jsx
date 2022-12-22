import { Button } from '@mui/material';
import React from 'react';

import { useClipboard } from '../../hooks/useClipboard';

export function PreviewFooter() {
    const { copyFeature } = useClipboard();

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '16px',
            }}
        >
            <Button
                variant="contained"
                onClick={copyFeature}
                style={{ backgroundColor: '#172F4D', width: '190px', height: '42px' }}
            >
                    Copy to clipboard
            </Button>
        </div>
    );
}
