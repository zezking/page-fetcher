const link = process.argv.slice(2)[0];
const filePath = process.argv.slice(2)[1];
const fileName = filePath.slice(2, filePath.length);
const fs = require("fs");

console.log(fileName);

var request = require("request");
request(link, function (error, response, body) {
  if (error && response.statusCode == 200) {
    console.log("There is an error");
  }
  fs.writeFile(filePath, body, (error) => {
    if (error) throw error;
    console.log("The page has been saved!");
  });
});

const fileSize = fs.statSync("index1.html").size;

console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
