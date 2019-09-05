import tinycolor = require('tinycolor2');
export declare abstract class LedConnector {
    private numberOfLeds;
    protected lastColors: tinycolor.Instance[];
    constructor(numberOfLeds: number);
    /**
     * set the new colors for the strip
     * falsy colors (null, undefined, ...) are ignored and the last value (or black) is used
     * @param nextColors
     */
    setColors(nextColors: tinycolor.Instance[]): void;
    /**
     * Updates the LED Strip
     * This method is always called with an array with length = number of LEDs and no falsy values.
     * @param colors An array of tinycolors to be sent to the strip
     */
    protected abstract sendColorsToStrip(colors: tinycolor.Instance[]): void;
    /**
     * Update the overall brightness of the strip
     * @param level 0..1
     */
    abstract setBrightness(level: number): void;
}
