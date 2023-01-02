import { v4 as createId } from 'uuid';
import { focusInput } from '../../hooks/useFocus';

export const getInputListAdder = (setter) => () => {
    setter((prevItems) => [...prevItems, { id: createId(), value: '', error: '' }]);
};

export const getInputListValueUpdater = (setter) => (id, value) => {
    setter((prevItems) => {
        return prevItems.map((item) => {
            if (item.id === id) {
                return { ...item, value, error: '' };
            }
            return item;
        });
    });
};

export const getInputListErrorUpdater = (setter) => (id, error) => {
    setter((prevItems) =>
        prevItems.map((item) => {
            if (item.id === id) {
                return { ...item, error };
            }
            return item;
        }),
    );
};

export const getInputListDeleter = (setter) => (id) => {
    setter((prevItems) => prevItems.filter((item) => item.id !== id));
};

export function validateInput(value) {
    const trimmedValue = value.trim();
    if (!trimmedValue) return 'This field is required';
    return '';
}

export function focusLastInput(items) {
    const lastItem = items[items.length - 1];
    focusInput(lastItem.id);
}

export function isLastItemErrored(items = []) {
    if (items.length === 0) return false;

    const lastItem = items[items.length - 1];
    return Boolean(lastItem.error);
}
