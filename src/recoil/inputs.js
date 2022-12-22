import { atom } from 'recoil';
import { v4 as createId } from 'uuid';
import { KEYS } from './constants';

const inputAtoms = {};

export const addInput = () => {
    const id = createId();

    if (inputAtoms[id]) {
        throw new Error(`Input with id ${id} already exists`);
    }

    inputAtoms[id] = atom({
        key: KEYS.input.atom.prefix + id,
        default: { id: createId(), value: '', error: '' },
    });

    return id;
};

export const getInputAtom = (id) => {
    const inputAtom = inputAtoms[id];

    if (!inputAtom) {
        throw new Error(`Input with id ${id} does not exist`);
    }

    return inputAtom;
};
