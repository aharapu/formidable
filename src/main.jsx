import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';

import App from './App';
import { theme } from './theme';
import { authClient } from './auth/auth';

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

    useRunOnce(() => {
        if (initialized) {
            return;
        }

        const authenthicated = authClient.isAuthenticated();
        console.log('authenthicated', authenthicated);

        const user = authClient.getUser();
        console.log('user', user);

        if (authenthicated) {
            // TODO -> set user in app state
        }

        setInitialized(true);
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
