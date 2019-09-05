/// <reference types="tinycolor2" />
export declare class GradientHelper {
    /**
     * starts and ends with first color
     * @param steps eg. number of leds
     * @param colors tinycolor color inputs (https://www.npmjs.com/package/tinycolor2)
     */
    static generateRoundGradient(steps: number, colors: tinycolor.ColorInput[]): tinycolor.Instance[];
    static generateGradient(steps: number, colors: tinycolor.ColorInput[]): tinycolor.Instance[];
}
