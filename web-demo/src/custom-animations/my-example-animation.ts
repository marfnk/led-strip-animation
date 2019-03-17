import { LedAnimation } from 'led-strip-animation';
import tinycolor = require('tinycolor2');

export class MyExampleAnimation extends LedAnimation {

  constructor(private numberOfLeds: number) {
    super();
  }

  public getStateForProgress(progress: number): tinycolor.Instance[] {
    const result: tinycolor.Instance[] = Array(this.numberOfLeds).fill(tinycolor('black'));
    result[Math.floor(progress * this.numberOfLeds)] = tinycolor('red');

    return result;
  }

}
