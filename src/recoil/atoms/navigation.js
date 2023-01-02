import { atom } from 'recoil';

import { HOME_PAGE } from '../../constants';

import { RECOIL_KEY } from '../constants';

export const navigationAtom = atom({
    key: RECOIL_KEY.navigation.atom,
    default: HOME_PAGE,
});
