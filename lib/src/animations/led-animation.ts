import { EasingFunction } from '../models/easing-function';
import * as tinycolor from 'tinycolor2';
import { LedConnector } from '..';

export abstract class LedAnimation {

  /**
   * the update speed of the anmiation.
   * better: the time between animatino updates.
   * the smaller the more fluent is the animation
   */
  private static readonly PREFERRED_FREQUENCY: number = 20;
  private timer: any = undefined;
  private finishCallback: (() => void) | undefined = undefined;

  /**
   * Returns the state of the animation a a given progress.
   * @param progress the progress 0.0 (start) - 1.0 (end) (may be greater that 1 for bounce effects)
   * @return the state of the animation as a color array of length = number of LEDs
   */
  public abstract getStateForProgress(progress: number): tinycolor.Instance[];

  /**
   * Plays an animation.
   * Should be called with await keyword to make animations them sequential.
   * @param duration the duration of the animation in milliseconds
   * @param ledConnector a led connector that updates the strip
   * @param easingFunction (optional) an easing function, linear by default
   */
  public async play(duration: number, ledConnector: LedConnector, easingFunction: EasingFunction = (t: number) => t): Promise<void> {
    const frequency: number = duration / Math.round(duration / LedAnimation.PREFERRED_FREQUENCY);

    return new Promise<void>((finish: () => void) => {

      this.finishCallback = finish;
      let elapsed: number = 0;
      this.timer = setInterval(() => {

        const progress: number = Math.min(elapsed / duration, 1);
        if (elapsed >= duration) {
          clearInterval(this.timer);
          this.finishCallback = undefined;
          finish();
        }

        setTimeout(() => ledConnector.setColors(this.getStateForProgress(easingFunction(progress))), 0);

        elapsed += frequency;
      }, frequency);

    });
  }

  /**
   * stop this animation if running
   */
  public stop() {
    clearInterval(this.timer);
    if (this.finishCallback) {
      this.finishCallback();
    }
  }
}
