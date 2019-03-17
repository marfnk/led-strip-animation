import { ColorInput } from 'tinycolor2';
export declare class GradientHelper {
    /**
     * starts and ends with start color
     * @param steps eg. number of leds
     * @param startColor a tinycolor color input (https://www.npmjs.com/package/tinycolor2)
     * @param endColor a tinycolor color input (https://www.npmjs.com/package/tinycolor2)
     */
    static generateRoundGradient(steps: number, startColor: tinycolor.ColorInput, endColor: tinycolor.ColorInput): tinycolor.Instance[];
    static generateGradient(steps: number, startColor: ColorInput, endColor: ColorInput): tinycolor.Instance[];
}
