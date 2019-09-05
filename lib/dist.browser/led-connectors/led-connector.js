"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tinycolor = require("tinycolor2");
var LedConnector = /** @class */ (function () {
    function LedConnector(numberOfLeds) {
        this.numberOfLeds = numberOfLeds;
        this.lastColors = [];
    }
    /**
     * set the new colors for the strip
     * falsy colors (null, undefined, ...) are ignored and the last value (or black) is used
     * @param nextColors
     */
    LedConnector.prototype.setColors = function (nextColors) {
        var newColors = [];
        for (var i = 0; i < this.numberOfLeds; i++) {
            newColors[i] = nextColors[i] || this.lastColors[i] || tinycolor('black');
        }
        this.lastColors = newColors;
        this.sendColorsToStrip(newColors);
    };
    return LedConnector;
}());
exports.LedConnector = LedConnector;
