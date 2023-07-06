const fs = require("fs");

fs.readFile("./file.txt", "utf-8", (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  let content = data.replace(/\s+/g, " ");
  fs.writeFile("./file.txt", content, (err) => {
    if (err) {
      console.log(error);
      return;
    }
    console.log("Extra Space removal successful!");
  });
});
