import { Button, Skeleton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { doc, getDoc  } from 'firebase/firestore';

import { authClient } from '../../auth/auth';
import { userAtom } from '../../recoil/atoms/user';
import { db } from '../../firebase/app';

import { FFTextField } from '../mui-wrappers/FFTextField/FFTextField';
import { useLoading } from '../../hooks/useLoading';

export default function PageHeader() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [user, setUser] = useRecoilState(userAtom);
    const { isLoading, addLoading, removeLoading} = useLoading();

    const clearInputs = () => {
        setEmail('');
        setPass('');
    };

    const handleSignIn = () => {
        addLoading('signIn');
        authClient.signInWithEmailAndPassword({ email, password: pass })
            .then((userCredential) => {
                const user = userCredential.user;
                setUser({ displayName: user.displayName, email: user.email, uid: user.uid });
                clearInputs();
                removeLoading('signIn');
            })
            .catch(console.error);
    };

    const handleSignUp = async () => {
        try {
            addLoading('signUp');

            const credential = await authClient.signUpWithEmailAndPassword({ email, password: pass });
            const user = credential.user;

            setUser({ displayName: user.displayName || null, email: user.email, uid: user.uid });
        } catch(e) {
            console.error(e);
        } finally {
            clearInputs();
            removeLoading('signUp');
        }
    };

    const handleGet = async () => {
        try {
            const userDocRef = doc(db, 'users', user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                console.log('User data:', userDocSnap.data());
            } else {
                console.log('No user document!');
            }

            const docRef2 = doc(db, 'inputs', 'TMDJVUuJSLkhP8QvzIZ1');
            const docSnap2 = await getDoc(docRef2);

            if (docSnap2.exists()) {
                console.log('Input data:', docSnap2.data());
            } else {
                console.log('No input document!');
            }

            const ownerRef = docSnap2.data().owner;
            const ownerSnap = await getDoc(ownerRef);

            console.log('user through refernce', ownerSnap.data());
        } catch(e) {
            console.log('GET error');
            console.error(e);
        }
    };

    const handleSignOut = () => {
        addLoading('signOut');
        authClient.signOut()
            .then(() => {
                setUser(null);
                removeLoading('signOut');
            })
            .catch(console.error);
    };

    const signedIn = user !== null;

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
            {
                isLoading ?
                    <Skeleton
                        variant="text" width={280} height={24} sx={{ marginLeft: '36px', marginRight: 'auto' }}
                    /> :
                    <Typography
                        variant="h4"
                        sx={{ marginLeft: '36px', marginRight: 'auto' }}
                    >
                        {renderGreeting(user)}
                    </Typography>
            }
            {!signedIn && (<>
                <FFTextField
                    label="email"
                    variant="outlined"
                    size="small"
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FFTextField
                    label="pass"
                    variant="outlined"
                    size="small"
                    disabled={isLoading}
                    value={pass}
                    type="password"
                    onChange={(e) => setPass(e.target.value)}
                />
                <Button
                    // TODO -> make a FFButton wrapper that uses the loading state from recoil
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
            </>)}
            {signedIn && (
                <Button
                    variant="contained"
                    onClick={handleSignOut}
                    size="small"
                >
                        Sign Out
                </Button>
            )}
            <Button
                variant="contained"
                onClick={handleGet}
                size="small"
            >
                Test GET
            </Button>
        </div>
    );
}

const renderGreeting = (user) => {
    if (user) {
        return `Welcome, ${user.displayName || 'friend'}!`;
    }
    return 'Sign In for an awesome experience!';
};
