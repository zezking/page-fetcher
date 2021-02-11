const link = process.argv.slice(2)[0];
const filePath = process.argv.slice(2)[1];
const fileName = filePath.slice(2, filePath.length);
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fs = require("fs");

console.log(fileName);

var request = require("request");
request(link, function (error, response, body) {
  if (error && response.statusCode == 200) {
    console.log("There is an error");
  }
  fs.access(filePath, fs.F_OK, (error) => {
    if (error) {
      fs.writeFile(filePath, body, (error) => {
        if (error) throw error;
        const fileSize = fs.statSync(fileName).size;
        console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
      });
    } else {
      rl.question("File exits and rewrite? y/n   ", (answer) => {
        if (answer === "y" || answer === "Y") {
          const fileSize = fs.statSync(fileName).size;
          console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
        } else if (answer === "n" || answer === "N") {
          rl.close();
        }
        rl.close();
      });
    }
  });
});
