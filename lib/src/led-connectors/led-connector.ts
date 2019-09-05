import tinycolor = require('tinycolor2');

export abstract class LedConnector {
  protected lastColors: tinycolor.Instance[] = [];

  constructor(private numberOfLeds: number) {
  }

  /**
   * set the new colors for the strip
   * falsy colors (null, undefined, ...) are ignored and the last value (or black) is used
   * @param nextColors
   */
  public setColors(nextColors: tinycolor.Instance[]) {
      const newColors: tinycolor.Instance[] = [];
      for (let i = 0; i < this.numberOfLeds; i++) {
        newColors[i] = nextColors[i] || this.lastColors[i] || tinycolor('black');
      }
      this.lastColors = newColors;
      this.sendColorsToStrip(newColors);
  }

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
  public abstract setBrightness(level: number): void;
}
