import { LedAnimation } from './led-animation';
import tinycolor = require('tinycolor2');
import * as _ from 'lodash';

export class SparkleAnimation extends LedAnimation {

  private n: number;
  private color: tinycolor.ColorInput;
  // ex. Led #14: (0.21 - 0.43)
  private playbook: { [ledIndex: number]: [number, number] };

  /**
   * fades random single leds in and out
   * @param n number of leds
   * @param intensity percentage of sparkling LEDs (0 - 1)
   * @param color the sparkle color
   */
  constructor(n: number, intensity: number, color: tinycolor.ColorInput) {
    super();
    this.n = n;
    this.color = color;
    const numberOfSparklingLeds = Math.round(n * intensity);

    const range: number[] = _.range(n);
    const sparklingLeds: number[] = _.take(_.shuffle(range), numberOfSparklingLeds);
    this.playbook = _.reduce(sparklingLeds, (playbook: { [ledIndex: number]: [number, number] }, ledIndex: number) => {
      const start: number = Math.random() * 0.8; // start from 0.0 till 0.8
      const end: number = Math.random() * (1 - start) + start; // end from start till 1.0

      playbook[ledIndex] = [start, end];
      return playbook;
    }, {});

  }

  public getStateForProgress(progress: number): tinycolor.Instance[] {
    const result: tinycolor.Instance[] = [];

    _.forEach(this.playbook, ([start, end]: [number, number], index: any) => {
      if (progress >= start && progress <= end) {
        const sparkProgress: number = (progress - start) / (end - start);
        const fadeOut: number = sparkProgress < 0.5 ? (1 - (sparkProgress / 0.5)) : (sparkProgress - 0.5) / 0.5;

        const rgb: tinycolor.ColorFormats.RGB = tinycolor(this.color).toRgb();
        result[index] = tinycolor({ r: Math.round(rgb.r * fadeOut), g: Math.round(rgb.g * fadeOut), b: Math.round(rgb.b * fadeOut) });
      } else {
        result[index] = tinycolor('black');
      }
    });

    return result;
  }
}
