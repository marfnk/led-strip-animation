"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var led_connector_1 = require("./led-connector");
var ws281x = require('rpi-ws281x-native');
var RPiWs281xLed = /** @class */ (function (_super) {
    __extends(RPiWs281xLed, _super);
    /**
     * Initializes the WS281x Strip
     * @param numberOfLeds
     * @param gpioPin (optional, 18 by default) has to be a pin with PWM0 feature. On Raspberry Pi 3B only PIN 12 and PIN 18 have PWM0.
     */
    function RPiWs281xLed(numberOfLeds, gpioPin) {
        if (gpioPin === void 0) { gpioPin = 18; }
        var _this = _super.call(this, numberOfLeds) || this;
        ws281x.init(numberOfLeds, { gpioPin: gpioPin });
        return _this;
    }
    RPiWs281xLed.prototype.sendColorsToStrip = function (colors) {
        var _this = this;
        var pixelData = colors.map(function (color) {
            return _this.toRbgNumber(color);
        });
        ws281x.render(pixelData);
    };
    RPiWs281xLed.prototype.toRbgNumber = function (color) {
        var rgb = color.toRgb();
        //yes, it is RBG not RGB... ¯\_(ツ)_/¯
        return ((rgb.r & 0xFF) << 16) | ((rgb.b & 0xFF) << 8) | (rgb.g & 0xFF);
    };
    RPiWs281xLed.prototype.setBrightness = function (level) {
        ws281x.setBrightness(level * 255);
    };
    return RPiWs281xLed;
}(led_connector_1.LedConnector));
exports.RPiWs281xLed = RPiWs281xLed;
