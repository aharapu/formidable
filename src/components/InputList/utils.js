// TODO -> move these to utils/state
import { v4 as createId } from 'uuid';

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
