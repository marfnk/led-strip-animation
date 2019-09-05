"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tinygradient = require("tinygradient");
var GradientHelper = /** @class */ (function () {
    function GradientHelper() {
    }
    /**
     * starts and ends with first color
     * @param steps eg. number of leds
     * @param colors tinycolor color inputs (https://www.npmjs.com/package/tinycolor2)
     */
    GradientHelper.generateRoundGradient = function (steps, colors) {
        var gradient = tinygradient(colors.concat(colors.reverse().slice(1)));
        return gradient.rgb(steps);
    };
    GradientHelper.generateGradient = function (steps, colors) {
        return tinygradient(colors).rgb(steps);
    };
    return GradientHelper;
}());
exports.GradientHelper = GradientHelper;
