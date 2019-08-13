import { GradientRotationAnimation, LedAnimation, RainbowAnimation, ReveilAnimation, SparkleAnimation } from 'led-strip-animation';
import { NamedAnimation } from './named-animation';
import { MyExampleAnimation } from './custom-animations/my-example-animation';
import { TrafficLightAnimation } from './custom-animations/traffic-light';

/**
 * Number of LEDs to animate (length of strip)
 */
export const NUMBER_OF_LEDS: number = 50;

/**
 * Animations for DropDown
 */
export const ANIMATIONS: NamedAnimation[] = [
  {
    name: 'Gradient Rotation (Pink - Purple)',
    animation: new GradientRotationAnimation(NUMBER_OF_LEDS, '#FF0094', '#6C00A2')
  },
  {
    name: 'Rainbow',
    animation: new RainbowAnimation(NUMBER_OF_LEDS)
  },
  {
    name: 'Reveil (Black - Red)',
    animation: new ReveilAnimation(NUMBER_OF_LEDS, 'black', 'red', NUMBER_OF_LEDS * 0.2)
  },
  {
    name: 'Sparkles (Yellow)',
    animation: new SparkleAnimation(NUMBER_OF_LEDS, 0.4, 'yellow')
  },

  // Register your custom animations here
  {
    name: 'My Example Animation',
    animation: new MyExampleAnimation(NUMBER_OF_LEDS)
  },
  {
    name: 'Traffic Light',
    animation: new TrafficLightAnimation(NUMBER_OF_LEDS)
  }
];
