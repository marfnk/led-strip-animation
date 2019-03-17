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
var RainbowAnimation = /** @class */ (function (_super) {
    __extends(RainbowAnimation, _super);
    function RainbowAnimation(n) {
        var _this = _super.call(this) || this;
        _this.n = n;
        return _this;
    }
    RainbowAnimation.prototype.getStateForProgress = function (progress) {
        var offset = (this.n * progress) % 256;
        var pixelData = [];
        for (var i = 0; i < this.n; i++) {
            pixelData[i] = new tinycolor(this.getRainbowColor((offset + i) % 256));
        }
        return pixelData;
    };
    // rainbow-colors, taken from http://goo.gl/Cs3H0v
    RainbowAnimation.prototype.getRainbowColor = function (pos) {
        pos = 255 - pos;
        if (pos < 85) {
            return { r: 255 - pos * 3, g: 0, b: pos * 3 };
        }
        else if (pos < 170) {
            pos -= 85;
            return { r: 0, g: pos * 3, b: 255 - pos * 3 };
        }
        else {
            pos -= 170;
            return { r: pos * 3, g: 255 - pos * 3, b: 0 };
        }
    };
    return RainbowAnimation;
}(led_animation_1.LedAnimation));
exports.RainbowAnimation = RainbowAnimation;
