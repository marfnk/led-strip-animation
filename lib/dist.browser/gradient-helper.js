"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tinygradient = require("tinygradient");
// import
// import tinycolor from 'tinycolor2';
// import tinygradient from 'tinygradient';
// usage
// tinygradient('red', 'green', 'blue')
// tinycolor('#ffffff')
var GradientHelper = /** @class */ (function () {
    function GradientHelper() {
    }
    /**
     * starts and ends with start color
     * @param steps eg. number of leds
     * @param startColor a tinycolor color input (https://www.npmjs.com/package/tinycolor2)
     * @param endColor a tinycolor color input (https://www.npmjs.com/package/tinycolor2)
     */
    GradientHelper.generateRoundGradient = function (steps, startColor, endColor) {
        var gradient = tinygradient([
            startColor,
            endColor,
            endColor,
            startColor
        ]);
        return gradient.rgb(steps);
    };
    GradientHelper.generateGradient = function (steps, startColor, endColor) {
        return tinygradient([startColor, endColor]).rgb(steps);
    };
    return GradientHelper;
}());
exports.GradientHelper = GradientHelper;
