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
var __1 = require("..");
var GradientRotationAnimation = /** @class */ (function (_super) {
    __extends(GradientRotationAnimation, _super);
    function GradientRotationAnimation(n, colors) {
        var _this = _super.call(this) || this;
        _this.n = n;
        _this.gradient = __1.GradientHelper.generateRoundGradient(n, colors);
        return _this;
    }
    GradientRotationAnimation.prototype.getStateForProgress = function (progress) {
        var result = [];
        var shift = Math.round(this.n * progress);
        for (var i = 0; i < this.n; i++) {
            result[i] = this.gradient[(i + shift) % this.n];
        }
        return result;
    };
    return GradientRotationAnimation;
}(led_animation_1.LedAnimation));
exports.GradientRotationAnimation = GradientRotationAnimation;
