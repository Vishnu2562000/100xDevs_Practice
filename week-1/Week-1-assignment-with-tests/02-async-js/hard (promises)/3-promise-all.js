/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
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

function calculateTime() {
  let startTime = Date.now(),
    endTime = 0;
  return Promise.all([waitOneSecond(), waitTwoSecond(), waitThreeSecond()])
    .then((result) => {
      endTime = Date.now();
      return `${Math.floor(
        Math.abs(endTime - startTime) / 1000
      )} seconds for resolving all 3 promises`;
    })
    .catch((error) => {
      console.log(error);
    });
}

console.log(calculateTime().then((time) => console.log(time)));
