import { EasingFunction } from '../models/easing-function';
import * as tinycolor from 'tinycolor2';
export declare type LedAnimationCallbackFunction = (a: tinycolor.Instance[]) => void;
export declare abstract class LedAnimation {
    /**
     * the update speed of the anmiation.
     * better: the time between animatino updates.
     * the smaller the more fluent is the animation
     */
    private static readonly PREFERRED_FREQUENCY;
    private timer;
    private finishCallback;
    /**
     * Returns the state of the animation a a given progress.
     * @param progress the progress 0.0 (start) - 1.0 (end) (may be greater that 1 for bounce effects)
     * @return the state of the animation as a color array of length = number of LEDs
     */
    abstract getStateForProgress(progress: number): tinycolor.Instance[];
    /**
     * Plays an animation.
     * Should be called with await keyword to make animations them sequential.
     * @param duration the duration of the animation in milliseconds
     * @param callback a callback that is called on every color change
     * @param easingFunction (optional) an easing function, linear by default
     */
    play(duration: number, callback: LedAnimationCallbackFunction, easingFunction?: EasingFunction): Promise<void>;
    /**
     * stop this animation if running
     */
    stop(): void;
}
