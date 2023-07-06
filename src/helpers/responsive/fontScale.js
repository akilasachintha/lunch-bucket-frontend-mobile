import {Dimensions, PixelRatio, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = Math.min(width, height);

// Calculate the scale factor based on the device's pixel density
const scale =
    SCREEN_WIDTH < 400
        ? PixelRatio.get() / 2
        : SCREEN_WIDTH < 600
            ? PixelRatio.get() / 1.5
            : PixelRatio.get();

// Define a baseline font size for a medium-sized screen
const BASE_FONT_SIZE = 1;

export function dynamicFont(size) {
    const newSize = Math.round(BASE_FONT_SIZE * scale * size);
    return Platform.OS === 'ios' ?
        PixelRatio.roundToNearestPixel(newSize) :
        Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}