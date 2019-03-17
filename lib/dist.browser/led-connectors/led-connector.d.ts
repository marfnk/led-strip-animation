/// <reference types="tinycolor2" />
export interface LedConnector {
    /**
     * Updates the LED Strip
     * @param colors an array of tinycolors to be sent to the strip
     */
    setColors(colors: tinycolor.Instance[]): void;
    /**
     * Update the overall brightness of the strip
     * @param level 0..1
     */
    setBrightness(level: number): void;
}
