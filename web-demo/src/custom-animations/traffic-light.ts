import { LedAnimation } from 'led-strip-animation';
import tinycolor = require('tinycolor2');
import tinygradient = require('tinygradient');

export class TrafficLightAnimation extends LedAnimation {

  constructor(private numberOfLeds: number) {
    super();
  }

  public getStateForProgress(progress: number): tinycolor.Instance[] {
    const result: tinycolor.Instance[] = tinygradient([tinycolor('green'), tinycolor('yellow'), tinycolor('red')]).rgb(this.numberOfLeds);

    for (let i = 0; i < Math.floor(progress * this.numberOfLeds); i++) {
      result[i] = tinycolor('black');
    }

    return result;
  }

}
