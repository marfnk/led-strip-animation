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
var _ = require("lodash");
// @ts-ignore
var tinycolor2_1 = require("tinycolor2");
var __1 = require("..");
/**
 * starts with complete color
 * and removes it bit by bit until
 * completely black
 */
var ReveilAnimation = /** @class */ (function (_super) {
    __extends(ReveilAnimation, _super);
    /**
     *
     * @param n number of leds total
     * @param foreground the curtain color
     * @param background the color to reveil
     * @param length the transition length
     */
    function ReveilAnimation(n, foreground, background, length) {
        var _this = _super.call(this) || this;
        _this.n = n;
        _this.foreground = foreground;
        _this.background = background;
        _this.length = length;
        _this.transition = __1.GradientHelper.generateGradient(length, [background, foreground]);
        return _this;
    }
    ReveilAnimation.prototype.getStateForProgress = function (progress) {
        var result = [];
        var current = Math.round(progress * (this.n + this.length));
        for (var i = 0; i < this.n; i++) {
            if (i < current) {
                result[i] = tinycolor2_1.default(this.background);
            }
            else if (i < (current + this.length)) {
                result[i] = this.transition[i - current];
            }
            else {
                result[i] = tinycolor2_1.default(this.foreground);
            }
        }
        return _.take(result, this.n);
    };
    return ReveilAnimation;
}(led_animation_1.LedAnimation));
exports.ReveilAnimation = ReveilAnimation;
