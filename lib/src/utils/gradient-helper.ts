import tinygradient = require('tinygradient');
import { ColorInput } from 'tinycolor2';

export class GradientHelper {

  /**
   * starts and ends with first color
   * @param steps eg. number of leds
   * @param colors tinycolor color inputs (https://www.npmjs.com/package/tinycolor2)
   */
  public static generateRoundGradient(steps: number, colors: tinycolor.ColorInput[]): tinycolor.Instance[] {
    const gradient = tinygradient([
      ...colors,
      ...colors.reverse().slice(1)
    ]);


    return gradient.rgb(steps);
  }

  public static generateGradient(steps: number, colors: tinycolor.ColorInput[]): tinycolor.Instance[] {
    return tinygradient(colors).rgb(steps);
  }
}
