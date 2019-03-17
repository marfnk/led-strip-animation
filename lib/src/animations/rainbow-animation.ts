import { LedAnimation } from './led-animation';
import tinycolor = require('tinycolor2');

export class RainbowAnimation extends LedAnimation {
  private n: number;

  constructor(n: number) {
    super();
    this.n = n;
  }

  public getStateForProgress(progress: number): tinycolor.Instance[] {
    const offset: number = (this.n * progress) % 256;
    const pixelData: tinycolor.Instance[] = [];
    for (let i = 0; i < this.n; i++) {
      pixelData[i] = <tinycolor.Instance> new tinycolor(this.getRainbowColor((offset + i) % 256));
    }
    return pixelData;
  }

  // rainbow-colors, taken from http://goo.gl/Cs3H0v
  private getRainbowColor(pos: number): tinycolor.ColorFormats.RGB {
    pos = 255 - pos;
    if (pos < 85) {
      return { r: 255 - pos * 3, g: 0, b: pos * 3 };
    } else if (pos < 170) {
      pos -= 85;
      return { r: 0, g: pos * 3, b: 255 - pos * 3 };
    } else {
      pos -= 170;
      return { r: pos * 3, g: 255 - pos * 3, b: 0 };
    }
  }

}
