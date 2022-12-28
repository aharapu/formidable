import { v4 as createId } from 'uuid';

// TODO -> use this where applicable
export const createInput = () => {
    return { id: createId(), value: '', error: '' };
};
