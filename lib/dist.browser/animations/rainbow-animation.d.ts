import { LedAnimation } from './led-animation';
import tinycolor = require('tinycolor2');
export declare class RainbowAnimation extends LedAnimation {
    private n;
    constructor(n: number);
    getStateForProgress(progress: number): tinycolor.Instance[];
    private getRainbowColor;
}
