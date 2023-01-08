import { atom } from 'recoil';

import { RECOIL_KEY } from '../constants';

export const loadingAtom = atom({
    key: RECOIL_KEY.loading.atom,
    default: false,
});
