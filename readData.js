const inquirer = require("./inquirer");
const fs = require("fs");

const convertToDecrypt = (data) => {
  return parseInt(data, 32);
};
// console.log(convertToDecrypt("b5eq4cf2"));
const readData = async () => {
  const input = await inquirer.askInput();
  let data = fs.readFileSync(input.fileName, "utf-8");
  var text = "";
  var num = "";
  var value = 0;
  var x = 1;
  var f;
  for (var i = 0; i < data.length; i++) {
    var ch = data[i];
    if (ch != "[" && ch != "]" && ch != ",") {
      num += ch;
    } else if (ch == "," && data[i - 1] != "]") {
      value = convertToNumber(num, 1);
      num = "";
    } else if (ch == "]" && data[i - 1] != "[" && data[i - 1] != "]") {
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
      text += temp;
      text += ch;
      num = "";
    } else {
      text += ch;
    }
  }
  fs.writeFile("result.txt", text, (err) => {
    if (err) return console.log(err);
    console.log(
      "Success Message: Read the encrypted data from the input file name and store value in result.txt"
    );
  });
};
readData();
