import { v4 as createId } from 'uuid';

export const createInput = () => {
    return { id: createId(), value: '', error: '' };
};
