/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 */

const { start } = require("repl");

function sleep(seconds) {
  let startTime = Date.now();
  let milliSeconds = seconds * 1000;
  while (Date.now() - startTime < milliSeconds) {}
}

console.log("Before Busy Wait!");
sleep(10); //sleep for 10 seconds
console.log("After Busy wait!");
