/**
 * asynchronously waits for some time.
 * Usage: `pause(1000);` for 1sec delay
 * @param ms number of milliseconds to wait
 */
export const pause = (ms: number) => new Promise(res => setTimeout(res, ms));
