const fs = require("fs");
const request = require("request");
const readline = require("readline");

const link = process.argv.slice(2)[0];
const filePath = process.argv.slice(2)[1];
const fileName = filePath.slice(2, filePath.length);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

request(link, function (error, response, body) {
  if (error && response.statusCode == 200) {
    console.log("There is an error");
    console.log(error);
  }
  fs.access(filePath, fs.F_OK, (error) => {
    if (error) {
      fs.writeFile(filePath, body, (error) => {
        if (error) {
          throw error;
        }
        console.log(
          `Downloaded and saved ${
            fs.statSync(fileName).size
          } bytes to ${filePath}`
        );
        process.exit();
      });
    } else {
      rl.question("File exits and rewrite? y/n   ", (answer) => {
        if (answer === "y" || answer === "Y") {
          console.log(
            `Downloaded and saved ${
              fs.statSync(fileName).size
            } bytes to ${filePath}`
          );
        }
        rl.close();
      });
    }
  });
});
