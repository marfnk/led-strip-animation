# LED Strip Animation Framework

This framework helps to create beautiful RGB LED strip animations for strips with single accessable LEDs like APA102 or WS281x with Typescript.
You can develop the animation without any hardware and preview it in the browser or on your terminal console.

![Development Preview in Browser](./led-simulator.jpg)

This framework uses [tinycolor](https://github.com/bgrins/TinyColor) for color manipulation.

## Quick Start

1) Clone this repo
   ```
   git clone git@github.com:marfnk/led-strip-animation.git
   ```
2) build the library 
   ```
   cd led-strip-animation/lib
   npm install
   npm run build
   cd ..
   ```
3) start the preview frontend
   ```
   cd web-demo
   npm i
   npm run serve
   ```
4) open your browser at `localhost:8080`

## Animation Development in the Browser

This framework comes with 3 built-in animations.
1) _Gradient Rotation Animation_<br>
   Creates a gradient and moves it 360° along the strip.
2) _Rainbow Animation_<br>
   Moves the color of the rainbow along the strip.
3) _Reveil Animation_<br>
   Removes a solid foreground color with a gradient tail to reveil a solid background color.
4) _Sparkle Animation_<br>
   Creates a popping of camera flashes at random places.
   
If you want to create your own animation, you have to extend the abstract class `LedAnimation` and implement `getStateForProgress(p: number)`.
When the animation is running the framework repeatedly calls your class with the current progress (0..1).
This way, the animation programming is detached from the duration and easing of the animation. You can always implement a
linear animation and play it with different eases later on.

### Example

This example implements an animation that moves 1 red LED along the strip.

```
import { LedAnimation } from 'led-strip-animation';
import tinycolor = require('tinycolor2');

export class MyExampleAnimation extends LedAnimation {

  constructor(private numberOfLeds: number) {
    super();
  }

  public getStateForProgress(progress: number): tinycolor.Instance[] {
    // create an array with only black LEDs
    const result: tinycolor.Instance[] = Array(this.numberOfLeds).fill(tinycolor('black'));
    // make the LED at the position of the current progress red
    result[Math.floor(progress * this.numberOfLeds)] = tinycolor('red');

    return result;
  }

}
```

Play this animation:
```
const animation: LedAnimation = new MyExampleAnimation(100);
const duration: number = 5000; //milliseconds

//linear easing (you can also use eases from a library like https://www.npmjs.com/package/eases)
const easing: (t: number) => number = (t: number) => t;

//create a callback that listens to color changes and sets them to your strip / console / frontend...
const callback: (colors: tinycolor.Instance[]) => void = (colors: tinycolor.Instance[]) => myLedStrip.set(colors); 

animation.play(duration, callback, easing);
```

Since `animation.play` returns a Promise, you can easily `await` the animation:

```
console.log('animation starts');
await animation.play(duration, callback, easing);
console.log('animation has ended');
```

# Use this framework with hardware

For this tutorial, you need this hardware: 
1) A Raspberry Pi with the latest NodeJs (see: https://gist.github.com/marfnk/813c77e37a061418b94a0f6212ce4a2c)
2) A WS281x LED Strip with power supply

tbc...
