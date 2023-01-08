import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';

import App from './App';
import { theme } from './theme';
import { authClient } from './auth/auth';
import { userAtom } from './recoil/atoms/user';

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
    // TODO -> initialize auth here and pass value to app state
    //         and when done, render app, otherwise render loading
    const [ initialized, setInitialized ] = useState(false);
    const setUser = useSetRecoilState(userAtom);

    useRunOnce(() => {
        if (initialized) {
            return;
        }

        const unsubscribe = authClient.onAuthenticationChange((user) => {
            console.log('auth state changed');
            console.log('user', user);
            setUser(user ? ({ displayName: user.displayName, email: user.email, uid: user.uid }) : null);
            setInitialized(true);
            unsubscribe();
        });
    });

    if (!initialized) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <App />
    );
}

function useRunOnce(callback) {
    const hasRun = React.useRef(false);

    if (hasRun.current) {
        return;
    }

    hasRun.current = true;
    callback();
}
