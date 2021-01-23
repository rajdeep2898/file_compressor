const fs = require("fs");

const convertToNumber = (data, flag) => {
  var num = 0;
  var x = 1;
  var f = data.length;
  var counter = 5;
  var i;
  for (i = 0; i < data.length; i++) {
    if (data[i] == ".") {
      f = i;
      counter = 0;
    } else {
      counter++;
      if (counter == 3) break;
      num += data[i].charCodeAt() - 48;
      num *= 10;
    }
  }
  num /= 10;
  x = flag ? 6 : 0;
  counter = counter < 3 ? counter : counter == 3 ? 2 : 0;
  for (j = 0; j < x + (2 - counter); j++) {
    num *= 10;
  }
  return num;
};
const convertToEncrypt = (data) => {
  return data.toString(32);
};

const writeData = () => {
  let data = fs.readFileSync("data_file.txt", "utf-8");
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
      value += convertToNumber(num, 0);

      encrypt = convertToEncrypt(value);
      text += encrypt;
      text += ch;
      num = "";
    } else {
      text += ch;
    }
  }
  fs.writeFile("output.txt", text, (err) => {
    if (err) return console.log(err);
    console.log("Success Message: Data encrypted and stored in output.txt");
  });
};
writeData();
