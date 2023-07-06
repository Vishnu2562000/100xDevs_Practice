const fs = require("fs");
fs.readFile("./sample_file.txt", "utf-8", (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(data);
});
let sum = 0;
for (let index = 0; index < 10000000000; index++) {
  sum += index;
}
