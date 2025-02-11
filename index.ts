import { program } from "commander";
import ora from "ora";
import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";

import { compressFile, decompressFile } from "./utils/compressor";
import { convertCase } from "./utils/case_conversion";

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
              ],
            },
          ])
          .then(async (answers) => {
            switch (answers.task) {
              case "Compress a file":
                const compressAnswers = await inquirer.prompt([
                  {
                    type: "input",
                    name: "input",
                    message: "Enter the input file path:",
                  },
                ]);
                let spinner = ora(`Comporessing the file...`).start();
                if (compressFile(compressAnswers.input)) {
                  setTimeout(() => {
                    spinner.succeed(
                      chalk.green("Your file was compressed successfully!")
                    );
                    menu();
                  }, 2000);
                } else {
                  spinner.fail("Error compressing file! Please try again.");
                }
                break;

              case "Decompress a file":
                const decompressAnswers = await inquirer.prompt([
                  {
                    type: "input",
                    name: "input",
                    message: "Enter the input file path:",
                  },
                ]);
                let spinner2 = ora(`Decomporessing the file...`).start();
                if (decompressFile(decompressAnswers.input)) {
                  setTimeout(() => {
                    spinner2.succeed(
                      chalk.green("Your file was decompressed successfully!")
                    );
                    menu();
                  }, 2000);
                } else {
                  spinner2.fail(
                    chalk.red("Error decompressing file! Please try again.")
                  );
                }
                break;

              case "Convert case of text":
                const caseAnswer = await inquirer.prompt([
                  {
                    type: "input",
                    name: "text",
                    message: "Enter the text to convert:",
                  },
                  {
                    type: "confirm",
                    name: "upper",
                    message: "Convert to upper case?",
                    default: true,
                  },
                ]);
                console.log(
                  chalk.italic.greenBright(
                    `The converted text is: ${chalk.italic.whiteBright(
                      convertCase(caseAnswer.text, caseAnswer.upper)
                    )}`
                  )
                );
                menu();
                break;
            }
          });
      }
      menu();
    });
});

program.parse(process.argv);
