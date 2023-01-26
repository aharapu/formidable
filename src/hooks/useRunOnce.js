import { useRef } from 'react';

export function useRunOnce(callback) {
    const hasRun = useRef(false);

    if (hasRun.current) {
        return;
    }

    hasRun.current = true;
    callback();
}
