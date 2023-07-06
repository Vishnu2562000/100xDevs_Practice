/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Print out the time it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function waitOneSecond() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve("One second promise resolved");
    }, 1000);
  });
}

function waitTwoSecond() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve("Two second promise resolved");
    }, 2000);
  });
}

function waitThreeSecond() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve("Three second promise resolved");
    }, 3000);
  });
}

async function calculateTime() {
  let startTime = 0,
    endTime = 0;
  const promises = [waitOneSecond, waitTwoSecond, waitThreeSecond];
  startTime = Date.now();
  for (const promiseFunction of promises) {
    await promiseFunction();
  }
  endTime = Date.now();
  return `${Math.floor(
    Math.abs(endTime - startTime) / 1000
  )} seconds for resolving all 3 promises sequentially`;
}

calculateTime().then((time) => console.log(time));
