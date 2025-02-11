import { program } from "commander";
import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";

//! Header section
console.log();
console.log(chalk.magenta("Welcome to"));
console.log(
  chalk.magentaBright(
    figlet.textSync("Yash's Node CLI", {
      horizontalLayout: "full",
      font: "Doom",
    })
  )
);
console.log(
  chalk.cyan(
    "Yash's Node CLI is a handy command-line tool for everyday tasks like file compression, string manipulation, and API integration."
  )
);
console.log();

//! CLI commands
program
  .name("Yash's Node CLI")
  .description(
    "Yash's Node CLI is a handy command-line tool for everyday tasks like file compression, string manipulation, and API integration."
  )
  .version("1.0.0");

program.action(() => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Hello! What's your name? :",
      },
    ])
    .then((answer) => {
      const userName = answer.name;
      console.log(chalk.italic.magentaBright(`Hello, ${userName}! 🙋🏻`));

      function menu() {
        console.log();
        inquirer
          .prompt([
            {
              type: "list",
              name: "task",
              message: "What would you like to do?",
              choices: [
                "Compress a file",
                "Decompress a file",
                "Convert case of text",
                "Count words in a text",
                "Check if text is a palindrome",
                "Get a Random Joke",
                "Exit",
              ],
            },
          ])
      }
    });
});
