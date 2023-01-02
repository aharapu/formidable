import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';

import App from './App';
import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </RecoilRoot>
    </React.StrictMode>,
);

function AppContainer() {
    // TODO -> initialize auth here and pass value to app state
    //         and when done, render app, otherwise render loading

    useEffect(() => {
        return () => {
        };
    }, []);

    return (
        <App />
    );
}
