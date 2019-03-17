import { LedAnimation } from './led-animation';
import { GradientHelper } from '../gradient-helper';
import * as tinycolor from 'tinycolor2';

export class GradientRotationAnimation extends LedAnimation {
  private gradient: tinycolor.Instance[];
  private n: number;

  constructor(n: number, colorA: tinycolor.ColorInput, colorB: tinycolor.ColorInput) {
    super();
    this.n = n;
    this.gradient = GradientHelper.generateRoundGradient(n, colorA, colorB);
  }

  public getStateForProgress(progress: number): tinycolor.Instance[] {
    const result: tinycolor.Instance[] = [];
    const shift: number = Math.round(this.n * progress);

    for (let i = 0; i < this.n; i++) {
      result[i] = this.gradient[(i + shift) % this.n];
    }

    return result;
  }
}
