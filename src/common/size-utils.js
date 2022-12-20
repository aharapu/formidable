import { PIXEL_SIZE_TO_PIXELS } from './size-constants';

export function getPixelsFromSize(size) {
    if (!PIXEL_SIZE_TO_PIXELS[size]) {
        throw new Error(`Invalid pixel size: ${size}`);
    }

    return PIXEL_SIZE_TO_PIXELS[size];
}
