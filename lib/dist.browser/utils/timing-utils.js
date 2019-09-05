"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * asynchronously waits for some time.
 * Usage: `pause(1000);` for 1sec delay
 * @param ms number of milliseconds to wait
 */
exports.pause = function (ms) { return new Promise(function (res) { return setTimeout(res, ms); }); };
