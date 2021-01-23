const inquirer = require("inquirer");

module.exports = {
  askInput: () => {
    const questions = [
      {
        name: "fileName",
        type: "input",
        message: "Input the name of the file",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Enter a valid input.";
          }
        },
      },
    ];
    return inquirer.prompt(questions);
  },
};
