import { LedAnimation } from './led-animation';
import * as tinycolor from 'tinycolor2';
export declare class GradientRotationAnimation extends LedAnimation {
    private gradient;
    private n;
    constructor(n: number, colors: tinycolor.ColorInput[]);
    getStateForProgress(progress: number): tinycolor.Instance[];
}
