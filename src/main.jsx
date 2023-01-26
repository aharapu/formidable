import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot, useSetRecoilState } from 'recoil';

import { collection, query, getDocs } from 'firebase/firestore';

import { ThemeProvider } from '@mui/material/styles';

import App from './App';
import { theme } from './theme';
import { authClient } from './auth/auth';
import { userAtom } from './recoil/atoms/user';
import { db } from './firebase/app';
import { useLoading } from './hooks/useLoading';
import { useRunOnce } from './hooks/useRunOnce';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <AppContainer />
            </ThemeProvider>
        </RecoilRoot>
    </React.StrictMode>,
);

function AppContainer() {
    const [ initialized, setInitialized ] = useState(false);
    const setUser = useSetRecoilState(userAtom);
    const { addLoading, removeLoading, checkIfLoading } = useLoading();

    useRunOnce(() => {
        if (initialized) {
            return;
        }

        const unsubscribe = authClient.onAuthenticationChange((user) => {
            if (user) {
                console.log('user signed in', user);
                setUser({ displayName: user.displayName, email: user.email, uid: user.uid });

                const isLoadingInputTypes = checkIfLoading('input-types');
                const isLoadingFormTypes = checkIfLoading('form-types');
                if (!isLoadingInputTypes && !isLoadingFormTypes) {
                    loadFormAndInputTypes();
                }
            } else {
                setUser(null);
            }
            setInitialized(true);
            unsubscribe();
        });
    });

    const loadFormAndInputTypes = useCallback(async () => {
        try {
            addLoading('form-types');
            addLoading('input-types');

            const [ formTypes, inputTypes ] = await Promise.all([
                getDocs(query(collection(db, 'form_types'))),
                getDocs(query(collection(db, 'input_types'))),
            ]);

            // TODO -> create an input map and add it to the recoil state
            console.log('formTypes', formTypes.docs.map(doc => doc.data()));
            console.log('inputTypes', inputTypes.docs.map(doc => doc.data()));

            removeLoading('form-types');
            removeLoading('input-types');
        } catch (e) {
            // TODO -> use a logging level
            console.error(e);
        }
    }, [addLoading, removeLoading]);

    if (!initialized) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <App />
    );
}
