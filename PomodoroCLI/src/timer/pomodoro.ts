import inquirer from 'inquirer';
import { Cronometer } from './cronometer.js';
import figlet from 'figlet';
import chalk from "chalk";
import readline from 'readline';

let isTimerRunning = false;

export async function timer(initialTime: number, breakInitialTime: number): Promise<string> {
    if (isTimerRunning) {
        console.log(chalk.yellow('\nA timer is already running. Please complete or stop it before starting a new one.\n'));
        return 'back';
    }

    isTimerRunning = true;
    let timeRemaining = initialTime;
    let isPaused = false;
    let isBreakTime = false;
    let currentInitialTime = initialTime;

    const cronometer = new Cronometer(currentInitialTime, (seconds: number) => {
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
                console.clear();
                console.log(chalk.green(`${isBreakTime ? '🍅 Break Time' : '🍅 Work Time'}`));
                console.log(chalk[isBreakTime ? 'green' : 'red']("\n" + data));
            }
        );
    });

    cronometer.start();

    while (timeRemaining > 0) {
        
        const action = isPaused
            ? await showTimerMenuPaused(isBreakTime)
            : await showTimerMenu(isBreakTime);

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
                cronometer.reset(currentInitialTime);
                timeRemaining = currentInitialTime;
                break;
            case 'breaktime':
                isBreakTime = true;
                currentInitialTime = breakInitialTime;
                cronometer.reset(breakInitialTime);
                timeRemaining = currentInitialTime;
                cronometer.start();
                break;
            case 'backToWork':
                if (isBreakTime) {
                    isBreakTime = false;
                    currentInitialTime = initialTime;
                    cronometer.reset(initialTime);
                    timeRemaining = initialTime;
                    cronometer.start();
                }
                break;
            case 'back':
                cronometer.destroy();
                isTimerRunning = false;
                return 'back';
        }
    }

    cronometer.destroy();
    isTimerRunning = false;
    return 'completed';
}

export async function showTimerMenu(isBreakTime: boolean = false): Promise<string> {
    const choices = isBreakTime
        ? [
            { name: 'Pause', value: 'pause' },
            { name: 'Restart', value: 'restart' },
            { name: 'Back to Work', value: 'backToWork' },
            { name: 'Go Back', value: 'back' }
        ]
        : [
            { name: 'Pause', value: 'pause' },
            { name: 'Break Time', value: 'breaktime' },
            { name: 'Restart', value: 'restart' },
            { name: 'Go Back', value: 'back' }
        ];

    const { action } = await inquirer.prompt([
        {
            type: 'rawlist',
            name: 'action',
            message: `Options:`,
            choices: choices,
        }
    ]);

    return action;
}

export async function showTimerMenuPaused(isBreakTime: boolean = false): Promise<string> {
    const choices = isBreakTime
        ? [
            { name: 'Resume', value: 'resume' },
            { name: 'Restart', value: 'restart' },
            { name: 'Back to Work', value: 'backToWork' },
            { name: 'Go Back', value: 'back' }
        ]
        : [
            { name: 'Resume', value: 'resume' },
            { name: 'Break Time', value: 'breaktime' },
            { name: 'Restart', value: 'restart' },
            { name: 'Go Back', value: 'back' }
        ];

    const { action } = await inquirer.prompt([
        {
            type: 'rawlist',
            name: 'action',
            message: `Options:`,
            choices: choices,
        }
    ]);

    return action;
}
//SecretTomato.🍅
