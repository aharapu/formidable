// TODO -> move to constants file
export const PIXEL_SIZE = {
    tiny: 'tiny',
    small: 'small',
    medium: 'medium',
    large: 'large',
    huge: 'huge',
};

export const PIXEL_SIZES = Object.values(PIXEL_SIZE);

export const PIXEL_SIZE_TO_PIXELS = {
    [PIXEL_SIZE.tiny]: '4px',
    [PIXEL_SIZE.small]: '8px',
    [PIXEL_SIZE.medium]: '12px',
    [PIXEL_SIZE.large]: '16px',
    [PIXEL_SIZE.huge]: '20px',
};
