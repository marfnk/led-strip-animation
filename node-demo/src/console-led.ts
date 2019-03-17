import * as _ from 'lodash';
import chalk from 'chalk';
import RGB = tinycolor.ColorFormats.RGB;
import { clearLine, cursorTo } from 'readline';
import { ColorInput } from 'tinycolor2';
import tinycolor = require('tinycolor2');

export class ConsoleLed {
  leds: tinycolor.Instance[];
  private columns: number;

  constructor(n: number) {
    this.leds = _.range(n).map((index: number) => tinycolor('black'));
    this.columns = process.stdout.columns || 10;
  }

  setColors(colors: tinycolor.Instance[]): void {
    this.leds = colors;
    this.print();
  }

  print() {
    this.printLine();
  }

  printLine() {
    const leading: number = Math.max(this.leds.length * 0.8, this.leds.length - 10);
    const trailing: number = Math.min(this.leds.length * 0.2, 10);


    let output = '┅';
    //leading
    for (let i = leading; i < this.leds.length; i++) {
      output += this.showLed(i) + this.showLed(i);
    }

    output += '┿';

    for (let i = 0; i < this.leds.length; i++) {
      output += this.showLed(i) + this.showLed(i);
    }

    output += '┿';

    //trailing
    for (let i = 0; i < trailing; i++) {
      output += this.showLed(i) + this.showLed(i);
    }

    output += '┅';

    const linesToClear: number = Math.ceil(this.columns / output.length);
    this.clearLines(linesToClear);
    console.log(output);
  }

  printCircle() {
    /* Example
     * leds = 20
     * size = 5
     *
     *      15 16 17 18 19 0
     *      14             1
     *      13             2
     *      12             3
     *      11             4
     *      10  9  8  7  6 5
     *
     */


    const n = this.leds.length;
    const size = n / 4;
    let output = '';

    //annotation row
    output += chalk.bgBlack(' ');
    for (let i = 0; i < size; i++) {
      output += chalk.bgBlack(' ');
    }
    output += chalk.bgBlack.white('0');
    output += chalk.bgBlack(' ') + '\n' + chalk.bgBlack(' ');

    //first row
    for (let i = n - size; i < n; i++) {
      output += this.showLed(i);
    }
    output += this.showLed(0);
    output += chalk.bgBlack(' ') + '\n' + chalk.bgBlack(' ');

    //inner rows
    for (let i = 1; i < (size); i++) {
      output += this.showLed(n - size - i);

      for (let j = 0; j < size - 1; j++) {
        output += chalk.bgBlack(' ');
      }

      output += this.showLed(i);
      output += chalk.bgBlack(' ') + '\n' + chalk.bgBlack(' ');
    }

    //last row
    for (let i = n - 2 * size; i >= (n - 3 * size); i--) {
      output += this.showLed(i);
    }
    output += chalk.bgBlack(' ');

    this.clearLines(size);

    console.log(`${output}`);
  }

  clearLines(n: number) {
    for (let i = 0; i < n; i++) {
      clearLine(process.stdout, 0);
      cursorTo(process.stdout, 0, -1);
    }
  }

  showLed(n: number): string {
    const color: RGB = this.leds[n].toRgb();
    return chalk.bgRgb(color.r, color.g, color.b)(' ');
  }

  setBrightness(number: number) {
    //ignored on console
  }

}
