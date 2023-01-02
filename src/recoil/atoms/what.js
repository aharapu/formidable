import { atom } from 'recoil';
import { RECOIL_KEY } from '../constants';

import { createInput } from '../utils';

export const whatAtom = atom({
    key: RECOIL_KEY.feature.what.atom,
    default: createInput(),
});
