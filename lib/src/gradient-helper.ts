import tinygradient = require('tinygradient');
import { ColorInput } from 'tinycolor2';

// import
// import tinycolor from 'tinycolor2';
// import tinygradient from 'tinygradient';
// usage
// tinygradient('red', 'green', 'blue')
// tinycolor('#ffffff')

export class GradientHelper {

  /**
   * starts and ends with start color
   * @param steps eg. number of leds
   * @param startColor a tinycolor color input (https://www.npmjs.com/package/tinycolor2)
   * @param endColor a tinycolor color input (https://www.npmjs.com/package/tinycolor2)
   */
  public static generateRoundGradient(steps: number, startColor: tinycolor.ColorInput, endColor: tinycolor.ColorInput): tinycolor.Instance[] {
    const gradient = tinygradient([
      startColor,
      endColor,
      endColor,
      startColor
    ]);

    return gradient.rgb(steps);
  }

  public static generateGradient(steps: number, startColor: ColorInput, endColor: ColorInput): tinycolor.Instance[] {
    return tinygradient([startColor, endColor]).rgb(steps);
  }
}
