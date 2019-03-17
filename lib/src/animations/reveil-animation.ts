import { LedAnimation } from './led-animation';
import { GradientHelper } from '../gradient-helper';
import * as _ from 'lodash';
// @ts-ignore
import tinycolor, { ColorInput } from 'tinycolor2';

/**
 * starts with complete color
 * and removes it bit by bit until
 * completely black
 */
export class ReveilAnimation extends LedAnimation {
  private n: number;
  private foreground: ColorInput;
  private background: ColorInput;
  private length: number;
  private transition: tinycolor.Instance[];

  /**
   *
   * @param n number of leds total
   * @param foreground the curtain color
   * @param background the color to reveil
   * @param length the transition length
   */
  constructor(n: number, foreground: ColorInput, background: ColorInput, length: number) {
    super();
    this.n = n;
    this.foreground = foreground;
    this.background = background;
    this.length = length;

    this.transition = GradientHelper.generateGradient(length, background, foreground);
  }

  public getStateForProgress(progress: number): tinycolor.Instance[] {
    const result: tinycolor.Instance[] = [];

    const current: number = Math.round(progress * (this.n + this.length));

    for (let i = 0; i < this.n; i++) {
      if (i < current) {
        result[i] = tinycolor(this.background);
      } else if (i < (current + this.length)) {
        result[i] = this.transition[i - current];
      } else {
        result[i] = tinycolor(this.foreground);
      }
    }

    return _.take(result, this.n);
  }

}
