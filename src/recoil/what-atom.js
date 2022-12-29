import { atom } from 'recoil';
import { createInput } from './utils';

export const whatAtom = atom({
    key: 'feature-input-what',
    default: createInput(),
});

// TODO -> add a trimmed string selector?
// this would be a good experiment to see if it triggers rerenders in preview when typing spaces in form
