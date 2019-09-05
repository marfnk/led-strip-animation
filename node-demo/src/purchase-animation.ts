import { Colors } from './colors';
import { GradientHelper, LedAnimation } from 'led-strip-animation';
const tinycolor = require('tinycolor2');

export class PurchaseAnimation extends LedAnimation {
  private gradient: tinycolor.Instance[];
  private middleTop: number;
  private middleBottom: number;
  private n: number;
  private targetAreaLeft: number[];
  private targetAreaRight: number[];

  /**
   * fades out to 2 given target areas (fridge row light left/right)
   * @param n number of leds
   * @param targetAreaLeft tupel of start and end led index of left fridge row light
   * @param targetAreaRight tupel of start and end led index of right fridge row light
   */
  constructor(n: number, targetAreaLeft: number[], targetAreaRight: number[]) {
    super();
    this.n = n;
    this.targetAreaLeft = targetAreaLeft;
    this.targetAreaRight = targetAreaRight;
    this.gradient = GradientHelper.generateRoundGradient(n, [Colors.SUCCESS_1, Colors.SUCCESS_2]);
    this.middleTop = Math.round((n + targetAreaRight[0] - targetAreaLeft[1]) / 2 + targetAreaLeft[1]);
    this.middleBottom = Math.round((targetAreaRight[1] + targetAreaLeft[0]) / 2);
  }

  public getStateForProgress(progress: number): tinycolor.Instance[] {
    const result: tinycolor.Instance[] = [...this.gradient];

    // highlight in a different color
    // for (let i = this.targetAreaLeft[0]; i < this.targetAreaLeft[1]; i++) {
    //   result[i] = tinycolor.default('red');
    // }
    // for (let i = this.targetAreaRight[0]; i < this.targetAreaRight[1]; i++) {
    //   result[i] = tinycolor.default('red');
    // }

    // how many lights to switch off on the top-left
    const removeTopLeft: number = Math.round((this.middleTop - this.targetAreaLeft[1]) * progress);
    const removeTopRight: number = Math.round((this.n - this.middleTop + this.targetAreaRight[0]) * progress);

    const removeBottomLeft: number = Math.round((this.targetAreaLeft[0] - this.middleBottom) * progress);
    const removeBottomRight: number = Math.round((this.middleBottom - this.targetAreaRight[1]) * progress);

    // switch to black
    for (let i = (this.middleTop - removeTopLeft); i < this.middleTop; i++) {
      result[i] = tinycolor('black');
    }

    // top right (part 1)
    for (let i = this.middleTop; i < (this.middleTop + removeTopRight) && i < this.n; i++) {
      result[i] = tinycolor('black');
    }
    if (this.middleTop + removeTopRight > this.n) {
      for (let i = 0; i < (this.middleTop + removeTopRight) % this.n; i++) {
        result[i] = tinycolor('black');
      }
    }

    for (let i = this.middleBottom; i < (this.middleBottom + removeBottomLeft); i++) {
      result[i] = tinycolor('black');
    }

    for (let i = this.middleBottom; i >= (this.middleBottom - removeBottomRight); i--) {
      result[i] = tinycolor('black');
    }

    return result;
  }

  public getName(): string {
    return 'Purchase Animation';
  }

}
