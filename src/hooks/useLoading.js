import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { loadingAtom } from '../recoil/atoms/loading';

const ONE_SECOND = 1000;

let loadingCount = 0;
let loadingElements = [];
let timeout = null;

export function useLoading() {
    const [isLoading, setLoading] = useRecoilState(loadingAtom);

    const addLoading = useCallback(
        (element) => {
            validateElement(element, loadingElements);

            if (loadingElements.includes(element)) {
                throw new Error(`Element ${element} is already loading`);
            }

            loadingElements.push(element);
            loadingCount += 1;

            if (loadingCount === 1) {
                setLoading(true);

                timeout = setTimeout(() => {
                    timeout = null;
                    if (loadingCount === 0) {
                        setLoading(false);
                    }
                }, ONE_SECOND);
            }
        },
        [setLoading],
    );

    const removeLoading = useCallback(
        (element) => {
            validateElement(element, loadingElements);

            if (!loadingElements.includes(element)) {
                throw new Error(`Element ${element} is not loading`);
            }

            loadingElements = loadingElements.filter((e) => e !== element);
            loadingCount -= 1;

            if (loadingCount === 0 && !timeout) {
                setLoading(false);
            }
        },
        [setLoading],
    );

    return { isLoading, addLoading, removeLoading };
}

function validateElement(element) {
    if (!element) {
        throw new Error('Element is required');
    }

    if (typeof element !== 'string') {
        throw new Error('Element must be a string');
    }
}
