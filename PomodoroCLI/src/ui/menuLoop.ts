import chalk from "chalk";
import inquirer from "inquirer";
import { timer } from "../timer/pomodoro.js";
export async function menuLoop(title: string): Promise<void> {
    let shouldExit = false;
    
    while (!shouldExit) {

        const { option } = await inquirer.prompt<{ option: string }>([
            {
                type: "rawlist",
                name: "option",
                message: "Select an option:",
                choices: [
                    { name: "start", value: "start" },
                    { name: "settings", value: "settings" },
                    { name: "exit", value: "exit" },
                ],
                pageSize: 10,
            },
        ]);
        switch (option) {
            case "start":
                console.log(chalk.red("Starting pomodoro...\n"));
                console.clear();
                console.log(chalk.green(title));
                await timer(10, 10);
                break;

            case "settings":
                console.log(chalk.yellow("Starting settings...\n"));
                console.clear();
                console.log(chalk.green(title));
                break;

            case "exit":
                shouldExit = true;
                console.log(chalk.red("\nFinishing pomodoro...\n"));
                break;

            default:
                console.log(chalk.red("Error: Invalid option selected."));
                break;
        }
        if (!shouldExit) {
            console.clear();
        }
    }
}

export default menuLoop;
