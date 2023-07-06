const fs = require("fs");
let content = "Master of Web3 and Blockchain Development";
fs.writeFile("./sample_file.txt", content, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("Write operation finished!!!");
});
let sum = 0;
for (let index = 0; index < 10000000000; index++) {
  sum += index;
}
