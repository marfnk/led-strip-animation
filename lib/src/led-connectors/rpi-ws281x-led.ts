import tinycolor = require('tinycolor2');
import { LedConnector } from './led-connector';

const ws281x = require('rpi-ws281x-native');

export class RPiWs281xLed extends LedConnector {

  /**
   * Initializes the WS281x Strip
   * @param numberOfLeds
   * @param gpioPin (optional, 18 by default) has to be a pin with PWM0 feature. On Raspberry Pi 3B only PIN 12 and PIN 18 have PWM0.
   */
  constructor(numberOfLeds: number, gpioPin: number = 18) {
    super(numberOfLeds);
    ws281x.init(numberOfLeds, { gpioPin: gpioPin });
  }

  sendColorsToStrip(colors: tinycolor.Instance[]): void {
    const pixelData = colors.map(color => {
      return this.toRbgNumber(color);
    });

    ws281x.render(pixelData);
  }

  toRbgNumber(color: tinycolor.Instance) {
    const rgb: tinycolor.ColorFormats.RGB = color.toRgb();
    //yes, it is RBG not RGB... ¯\_(ツ)_/¯
    return ((rgb.r & 0xFF) << 16) | ((rgb.b & 0xFF) << 8) | (rgb.g & 0xFF);
  }

  setBrightness(level: number): void {
    ws281x.setBrightness(level * 255);
  }

}
