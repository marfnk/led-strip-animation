import { LedAnimation } from './led-animation';
import tinycolor, { ColorInput } from 'tinycolor2';
/**
 * starts with complete color
 * and removes it bit by bit until
 * completely black
 */
export declare class ReveilAnimation extends LedAnimation {
    private n;
    private foreground;
    private background;
    private length;
    private transition;
    /**
     *
     * @param n number of leds total
     * @param foreground the curtain color
     * @param background the color to reveil
     * @param length the transition length
     */
    constructor(n: number, foreground: ColorInput, background: ColorInput, length: number);
    getStateForProgress(progress: number): tinycolor.Instance[];
}
