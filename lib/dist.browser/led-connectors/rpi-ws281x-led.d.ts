import tinycolor = require('tinycolor2');
import { LedConnector } from './led-connector';
export declare class RPiWs281xLed extends LedConnector {
    /**
     * Initializes the WS281x Strip
     * @param numberOfLeds
     * @param gpioPin (optional, 18 by default) has to be a pin with PWM0 feature. On Raspberry Pi 3B only PIN 12 and PIN 18 have PWM0.
     */
    constructor(numberOfLeds: number, gpioPin?: number);
    sendColorsToStrip(colors: tinycolor.Instance[]): void;
    toRbgNumber(color: tinycolor.Instance): number;
    setBrightness(level: number): void;
}
