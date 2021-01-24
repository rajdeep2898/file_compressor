const inquirer = require("./inquirer");
const fs = require("fs");

const convertToDecrypt = (data) => {
  return parseInt(data, 36);
};
const readData = async () => {
  const input = await inquirer.askInput();
  let data = fs.readFileSync(input.fileName, "utf-8");
  var text = "[[";
  var num = "";
  var value = 0;
  var x = 1;
  var f = 1;
  for (var i = 0; i < data.length; i++) {
    var ch = data[i];
    if (ch != "," && ch != "\n") {
      num += ch;
    } else if (ch == ",") {
      decrypt = convertToDecrypt(num);
      var number2 = decrypt % 1000000;

      var number1 = decrypt / 1000000;
      var temp =
        parseInt(parseInt(number1) / 100).toString() +
        "." +
        (parseInt(number1) % 100 > 10
          ? parseInt(number1) % 100
          : "0" + (parseInt(number1) % 100)
        ).toString() +
        "," +
        parseInt(number2 / 100).toString() +
        "." +
        (number2 % 100).toString();
      if (f == 0) text += ",[";
      else text += "[";
      f = 0;
      text += temp;
      text += "]";
      num = "";
    } else if (ch == "\n") {
      text += "],[";
      f = 1;
    }
  }
  text += "]]";
  // console.log(text);
  fs.writeFile("result.txt", text, (err) => {
    if (err) return console.log(err);
    console.log(
      "Success Message: Read the encrypted data from the input file name and store value in result.txt"
    );
  });
};
readData();
