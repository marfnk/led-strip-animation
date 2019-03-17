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
var led_animation_1 = require("./led-animation");
var tinycolor = require("tinycolor2");
var _ = require("lodash");
var SparkleAnimation = /** @class */ (function (_super) {
    __extends(SparkleAnimation, _super);
    /**
     * fades random single leds in and out
     * @param n number of leds
     * @param intensity percentage of sparkling LEDs (0 - 1)
     * @param color the sparkle color
     */
    function SparkleAnimation(n, intensity, color) {
        var _this = _super.call(this) || this;
        _this.n = n;
        _this.color = color;
        var numberOfSparklingLeds = Math.round(n * intensity);
        var range = _.range(n);
        var sparklingLeds = _.take(_.shuffle(range), numberOfSparklingLeds);
        _this.playbook = _.reduce(sparklingLeds, function (playbook, ledIndex) {
            var start = Math.random() * 0.8; // start from 0.0 till 0.8
            var end = Math.random() * (1 - start) + start; // end from start till 1.0
            playbook[ledIndex] = [start, end];
            return playbook;
        }, {});
        return _this;
    }
    SparkleAnimation.prototype.getStateForProgress = function (progress) {
        var _this = this;
        var result = [];
        _.forEach(this.playbook, function (_a, index) {
            var start = _a[0], end = _a[1];
            if (progress >= start && progress <= end) {
                var sparkProgress = (progress - start) / (end - start);
                var fadeOut = sparkProgress < 0.5 ? (1 - (sparkProgress / 0.5)) : (sparkProgress - 0.5) / 0.5;
                var rgb = tinycolor(_this.color).toRgb();
                result[index] = tinycolor({ r: Math.round(rgb.r * fadeOut), g: Math.round(rgb.g * fadeOut), b: Math.round(rgb.b * fadeOut) });
            }
            else {
                result[index] = tinycolor('black');
            }
        });
        return result;
    };
    return SparkleAnimation;
}(led_animation_1.LedAnimation));
exports.SparkleAnimation = SparkleAnimation;
