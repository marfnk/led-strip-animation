import { LedAnimationCallbackFunction } from './animations/led-animation';
// @ts-ignore
import tinycolor from 'tinycolor2';

/**
 * Keeps the last colors so that "undefined", "false" or "null" colors are interpreted as the last color at this position.
 */
export class ColorBuffer {
  private lastColors: tinycolor.Instance[] = [];

  constructor(private n: number, private bufferedCallback: LedAnimationCallbackFunction) {
  }

  public onColorChange(nextColors: tinycolor.Instance[]) {
    const newColors: tinycolor.Instance[] = [];
    for (let i = 0; i < this.n; i++) {
      newColors[i] = nextColors[i] || this.lastColors[i] || tinycolor('black');
    }
    this.lastColors = newColors;

    this.bufferedCallback(newColors);
  }


}
