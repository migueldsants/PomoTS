import chalk from "chalk";
import inquirer from "inquirer";

async function handleStart(): Promise<void> {
    console.log("\nplaceholder)\n");
}

async function handleSettings(): Promise<void> {
    console.log("\nplaceholder\n");
}

export async function menuLoop(): Promise<void> {
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
                await handleStart();
                console.log(chalk.red("Starting pomodoro...\n"));
                break;

            case "settings":
                await handleSettings();
                console.log(chalk.yellow("Starting settings...\n"));
                break;

            case "exit":
                shouldExit = true;
                console.log("\nFinishing pomodoro...\n");
                break;

            default:
                console.log("Eror: Invalid option selected.");
                break;
        }
        if (!shouldExit) {
            console.clear();
        }
    }
}

export default menuLoop;
