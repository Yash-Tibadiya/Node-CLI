import { program } from "commander";
import ora from "ora";
import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";

import { compressFile, decompressFile } from "./utils/compressor.js";
import { convertCase } from "./utils/case_conversion.js";
import { isPalindrome } from "./utils/isPalindrome.js";
import { wordCount } from "./utils/countWords.js";
import { fetchJoke } from "./utils/fetchJoke.js";

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
          .then(async (answers) => {
            switch (answers.task) {
              //! Compress a file
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

              //! Decompress a file
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

              //! Convert case of text
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

              //! Count words in a text
              case "Count words in a text":
                const wordCountAnswer = await inquirer.prompt([
                  {
                    type: "input",
                    name: "text",
                    message: "Enter the text to count words:",
                  },
                ]);
                console.log(`Word count: ${wordCount(wordCountAnswer.text)}`);
                menu();
                break;

              //! Check if text is a palindrome
              case "Check if text is a palindrome":
                const palindromeAnswer = await inquirer.prompt([
                  {
                    type: "input",
                    name: "text",
                    message: "Enter the text to check for palindrome:",
                  },
                ]);
                console.log(
                  isPalindrome(palindromeAnswer.text)
                    ? chalk.greenBright(
                        `'${palindromeAnswer.text}' is a palindrome!`
                      )
                    : chalk.redBright(
                        `'${palindromeAnswer.text}' is not a palindrome!`
                      )
                );
                menu();
                break;

              //! Get a Random Joke
              case "Get a Random Joke":
                const spinner3 = ora(
                  "Getting a funny joke for you...😂"
                ).start();
                const res = await fetchJoke();
                spinner3.succeed(chalk.italic.yellow(res));
                menu();
                break;

              //! Exit
              case "Exit":
                inquirer
                  .prompt([
                    {
                      type: "confirm",
                      name: "exit",
                      message: "Are you sure you want to exit?",
                    },
                  ])
                  .then((answer) => {
                    if (answer.exit) {
                      console.log(chalk.magenta(`Goodbye! ${userName} 🙋🏻‍♂️`));
                      process.exit(0);
                    }
                    menu();
                  });
            }
          });
      }
      menu();
    });
});

program.parse(process.argv);
