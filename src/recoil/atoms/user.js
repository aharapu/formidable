import { atom } from 'recoil';

import { RECOIL_KEY } from '../constants';

export const userAtom = atom({
    key: RECOIL_KEY.user.atom,
    default: {
        displayName: '',
    },
});
