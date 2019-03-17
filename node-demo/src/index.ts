import { ReveilAnimation, ColorBuffer, SparkleAnimation, LedAnimation, GradientRotationAnimation, RainbowAnimation, LedConnector, RPiWs281xLed } from 'led-strip-animation';
import { ConsoleLed } from './console-led';
import { Colors } from './colors';
import { PurchaseAnimation } from './purchase-animation';
import tinycolor = require('tinycolor2');

const n: number = 100;
// const led: ConsoleLed = new ConsoleLed(n);
const led: LedConnector = new RPiWs281xLed(n);
led.setBrightness(0.5);
const bufferedLedConnector = new ColorBuffer(n, (colors) => led.setColors(colors));
const timeout = (ms: number) => new Promise(res => setTimeout(res, ms));

const test: tinycolor.Instance[] = Array(100).fill(tinycolor('black'));
test[0] = tinycolor('blue');
test[50] = tinycolor('red');
test[99] = tinycolor('green');
led.setColors(test);

async function main() {
  console.log('a');
  console.time('a');
  await timeout(5000);

  // const sparkleAnimation = new SparkleAnimation(n, 0.7, 'yellow');
  // await sparkleAnimation.play(5000, (c) => bufferedLedConnector.onColorChange(c));

  const snakeAnimation = new ReveilAnimation(n, 'red','black', 20);
  await snakeAnimation.play(10000, (c) => bufferedLedConnector.onColorChange(c));
  led.setColors(test);
  await timeout(5000);

  const idleAnimation: LedAnimation = new GradientRotationAnimation(n, Colors.PRIMARY, Colors.SECONDARY);
  await idleAnimation.play(10000, (c) => bufferedLedConnector.onColorChange(c));
  led.setColors(test);
  await timeout(5000);

  const purchaseAnimation1: LedAnimation = new GradientRotationAnimation(n, Colors.SUCCESS_1, Colors.SUCCESS_2);
  await purchaseAnimation1.play(10000, (c) => bufferedLedConnector.onColorChange(c));
  led.setColors(test);
  await timeout(5000);

  const purchaseAnimation = new PurchaseAnimation(n, [75, 80], [25, 31]);
  await purchaseAnimation.play(10000, (c) => bufferedLedConnector.onColorChange(c));
  await timeout(15000);

  const rainbowAnimation = new RainbowAnimation(n);
  await rainbowAnimation.play(2000, (c) => bufferedLedConnector.onColorChange(c));

  console.timeEnd('a');
  console.log('done');
}

main();
