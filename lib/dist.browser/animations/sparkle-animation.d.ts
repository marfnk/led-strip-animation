import { LedAnimation } from './led-animation';
import tinycolor = require('tinycolor2');
export declare class SparkleAnimation extends LedAnimation {
    private n;
    private color;
    private playbook;
    /**
     * fades random single leds in and out
     * @param n number of leds
     * @param intensity percentage of sparkling LEDs (0 - 1)
     * @param color the sparkle color
     */
    constructor(n: number, intensity: number, color: tinycolor.ColorInput);
    getStateForProgress(progress: number): tinycolor.Instance[];
}
