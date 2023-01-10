/*eslint-env node */

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
    const envDir = `${process.cwd()}\\env`;

    process.env = { ...process.env, ...loadEnv(mode, envDir, ['FF_']) };

    return defineConfig({
        plugins: [react()],
        server: {
            port: process.env.FF_DEV_SERVER_PORT,
            strictPort: true,
        },
        envPrefix: 'FF_',
    });
};
