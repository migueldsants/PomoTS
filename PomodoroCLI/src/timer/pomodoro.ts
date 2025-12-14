import inquirer from 'inquirer';
import { Cronometer } from './cronometer.js';
import figlet from 'figlet';
import chalk from "chalk";
import readline from 'readline';

export async function timer(initialTime: number): Promise<string> {
    let timeRemaining = initialTime;
    let isPaused = false;

    const cronometer = new Cronometer(initialTime, (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        const msg = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

        figlet.text(
            msg,
            { font: "ANSI Shadow" },
            (err: Error | null, data?: string) => {
                if (err || !data) {
                    console.error(err);
                    return;
                }
                clearLines(2, 7); 
                console.log(chalk.red("\n" + data));
            }
        );
    });

    cronometer.start();

    while (timeRemaining > 0) {
        const action = isPaused
            ? await showTimerMenuPaused()
            : await showTimerMenu();

        switch (action) {
            case 'pause':
                cronometer.pause();
                isPaused = true;
                break;
            case 'resume':
                cronometer.start();
                isPaused = false;
                break;
            case 'restart':
                cronometer.reset();
                timeRemaining = initialTime;
                break;
            case 'back':
                return 'back';
        }
    }

    return 'completed';
}

function clearLines(startLine: number, endLine: number) {
    for (let line = startLine; line <= endLine; line++) {
        readline.cursorTo(process.stdout, 0, line); 
        readline.clearLine(process.stdout, 0);    
    }
    readline.cursorTo(process.stdout, 0, 1);
}

export async function showTimerMenu(): Promise<string> {
    const choices = [
        { name: 'Pause', value: 'pause' },
        { name: 'Restart', value: 'restart' },
        { name: 'Go Back', value: 'back' }
    ];

    const { action } = await inquirer.prompt([
        {
            type: 'rawlist',
            name: 'action',
            message: `Options:`,
            choices: choices
        }
    ]);

    return action;
}

export async function showTimerMenuPaused(): Promise<string> {
    const choices = [
        { name: 'Resume', value: 'resume' },
        { name: 'Restart', value: 'restart' },
        { name: 'Go Back', value: 'back' }
    ];

    const { action } = await inquirer.prompt([
        {
            type: 'rawlist',
            name: 'action',
            message: `Options:`,
            choices: choices
        }
    ]);

    return action;
}
//SecretTomato.🍅