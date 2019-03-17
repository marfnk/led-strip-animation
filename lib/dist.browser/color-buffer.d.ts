import { LedAnimationCallbackFunction } from './animations/led-animation';
import tinycolor from 'tinycolor2';
/**
 * Keeps the last colors so that "undefined", "false" or "null" colors are interpreted as the last color at this position.
 */
export declare class ColorBuffer {
    private n;
    private bufferedCallback;
    private lastColors;
    constructor(n: number, bufferedCallback: LedAnimationCallbackFunction);
    onColorChange(nextColors: tinycolor.Instance[]): void;
}
