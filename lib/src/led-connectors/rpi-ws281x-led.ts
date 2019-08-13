import tinycolor = require('tinycolor2');
import { LedConnector } from './led-connector';
const ws281x = require('rpi-ws281x-native');

export class RPiWs281xLed implements LedConnector {

  constructor(numberOfLeds: number) {
    ws281x.init(numberOfLeds);
  }

  setColors(colors: tinycolor.Instance[]): void {
    const pixelData = colors.map(color => {
      return this.toRgbNumber(color);
    });

    ws281x.render(pixelData);
  }

  toRgbNumber(color: tinycolor.Instance) {
    const rgb: tinycolor.ColorFormats.RGB = color.toRgb();
    //yes, it is RBG not RGB... ¯\_(ツ)_/¯
    return ((rgb.r & 0xFF) << 16) | ((rgb.b & 0xFF) << 8) | (rgb.g & 0xFF);
  }

  setBrightness(level: number): void {
    ws281x.setBrightness(level * 255);
  }

}
