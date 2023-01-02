import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { authClient } from '../../auth/auth';
import { userAtom } from '../../recoil/atoms/user';
import { FFTextField } from '../mui-wrappers/FFTextField/FFTextField';

export default function PageHeader() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [user, setUser] = useRecoilState(userAtom);

    const handleSignIn = () => {
        console.log('login');
        console.log('email', email);
        console.log('pass', pass);
    };

    const handleSignUp = () => {
        authClient.signUpWithEmailAndPassword({ email, password: pass })
            .then((userCredential) => {
            // Signed in
                const user = userCredential.user;
                console.log('user', user);
                setUser({ displayName: user.displayName, email: user.email, uid: user.uid });
            })
            .catch(console.error);
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
            {user && (
                <div>
                    {user.displayName}
                </div>
            )}
            <FFTextField
                label="email"
                variant="outlined"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onClick={handleSignIn}
                size="small"
            >
                Sign In
            </Button>
            <Button
                variant="contained"
                onClick={handleSignUp}
                size="small"
            >
                Sign Up
            </Button>
            <Button
                variant="contained"
                onClick={() => authClient.signOut()}
                size="small"
            >
                Sign Out
            </Button>
        </div>
    );
}
