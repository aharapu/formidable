import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { doc, setDoc, getDoc  } from 'firebase/firestore';

import { authClient } from '../../auth/auth';
import { userAtom } from '../../recoil/atoms/user';
import { db } from '../../firebase/app';

import { FFTextField } from '../mui-wrappers/FFTextField/FFTextField';

export default function PageHeader() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [user, setUser] = useRecoilState(userAtom);

    const handleSignIn = () => {
        authClient.signInWithEmailAndPassword({ email, password: pass })
            .then((userCredential) => {
            // Signed in
                const user = userCredential.user;
                console.log('signed in user:', user);
                setUser({ displayName: user.displayName, email: user.email, uid: user.uid });
            })
            .catch(console.error);
    };

    const handleSignUp = () => {
        authClient.signUpWithEmailAndPassword({ email, password: pass })
            .then((userCredential) => {
            // Signed in
                const user = userCredential.user;
                console.log('signed up user:', user);
                setUser({ displayName: user.displayName, email: user.email, uid: user.uid });
                return setDoc(doc(db, 'users', user.uid), {
                    displayName: user.displayName,
                    email: user.email,
                    uid: user.uid,
                });
            }).then(result => {
                console.log('set doc result', result);
            })
            .catch(console.error);
    };

    const handleGet = async () => {
        try {
            console.log('get');
            const docRef = doc(db, 'users', user.uid);
            console.log('user ref: ', docRef);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log('User data:', docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log('No user document!');
            }

            const docRef2 = doc(db, 'inputs', 'TMDJVUuJSLkhP8QvzIZ1');
            const docSnap2 = await getDoc(docRef2);

            if (docSnap2.exists()) {
                console.log('Input data:', docSnap2.data());
            } else {
                // doc.data() will be undefined in this case
                console.log('No input document!');
            }

            const ownerRef = docSnap2.data().owner;
            const ownerSnap = await getDoc(ownerRef);

            console.log('user through refernce', ownerSnap.data());
        } catch(e) {
            console.log('GET ERROR');
            console.error(e);
        }
    };

    const handleSignOut = () => {
        authClient.signOut()
            .then(() => {
                console.log('signed out');
                setUser(null);
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
                onClick={handleSignOut}
                size="small"
            >
                Sign Out
            </Button>
            <Button
                variant="contained"
                onClick={handleGet}
                size="small"
            >
                GET
            </Button>
        </div>
    );
}
