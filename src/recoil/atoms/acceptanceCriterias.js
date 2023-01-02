import { atom } from 'recoil';

import { createInput } from '../utils';
import { RECOIL_KEY } from '../constants';

export const acceptanceCriteriasAtom = atom({
    key: RECOIL_KEY.feature.acceptanceCriterias.atom,
    default: [createInput()],
});
