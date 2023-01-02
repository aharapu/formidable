import { Button } from '@mui/material';
import React, { useState } from 'react';
import { FFTextField } from '../mui-wrappers/FFTextField/FFTextField';

export default function PageHeader() {

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleLogin = () => {
        console.log('login');
        console.log('user', user);
        console.log('pass', pass);
    };

    return (
        <div
            id="banner-container"
            style={{
                height: '68px',
                backgroundColor: '#F3F5F6',
                boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
                paddingRight: '20px',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '10px',
            }}
        >
            <FFTextField
                label="user"
                variant="outlined"
                size="small"
                value={user}
                onChange={(e) => setUser(e.target.value)}
            />
            <FFTextField
                label="pass"
                variant="outlined"
                size="small"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
            />
            <Button
                variant="contained"
                onClick={handleLogin}
                size="small"
            >
                Login
            </Button>
        </div>
    );
}
