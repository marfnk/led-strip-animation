"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var tinycolor2_1 = require("tinycolor2");
/**
 * Keeps the last colors so that "undefined", "false" or "null" colors are interpreted as the last color at this position.
 */
var ColorBuffer = /** @class */ (function () {
    function ColorBuffer(n, bufferedCallback) {
        this.n = n;
        this.bufferedCallback = bufferedCallback;
        this.lastColors = [];
    }
    ColorBuffer.prototype.onColorChange = function (nextColors) {
        var newColors = [];
        for (var i = 0; i < this.n; i++) {
            newColors[i] = nextColors[i] || this.lastColors[i] || tinycolor2_1.default('black');
        }
        this.lastColors = newColors;
        this.bufferedCallback(newColors);
    };
    return ColorBuffer;
}());
exports.ColorBuffer = ColorBuffer;
