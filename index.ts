import { program } from "commander";
import chalk from "chalk";
import figlet from "figlet";

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

program
  .name("Yash's Node CLI")
  .description(
    "Yash's Node CLI is a handy command-line tool for everyday tasks like file compression, string manipulation, and API integration."
  )
  .version("1.0.0");
