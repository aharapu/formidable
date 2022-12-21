import { atom } from 'recoil';

export const whatAtom = atom({
    key: 'feature-input-what',
    default: '',
});

// TODO -> add a trimmed string selector?
