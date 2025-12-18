import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import inquirer from 'inquirer';
import chalk from 'chalk';

const CONFIG_PATH = path.join(os.homedir(), '.pomots-config.json');

export interface AppSettings {
    workDuration: number; 
    breakDuration: number;
}

const DEFAULT_SETTINGS: AppSettings = {
    workDuration: 25,
    breakDuration: 5
};

export async function loadSettings(): Promise<AppSettings> {
    try {
        const data = await fs.readFile(CONFIG_PATH, 'utf-8');
        const settings = JSON.parse(data);
        return { ...DEFAULT_SETTINGS, ...settings };
    } catch (error) {
        return DEFAULT_SETTINGS;
    }
}

export async function saveSettings(settings: AppSettings): Promise<void> {
    try {
        await fs.writeFile(CONFIG_PATH, JSON.stringify(settings, null, 2), 'utf-8');
    } catch (error) {
        console.error(chalk.red('Error saving settings:'), error);
    }
}

export async function settingsMenu(): Promise<void> {
    const currentSettings = await loadSettings();
    
    console.log(chalk.cyan('Current Settings:'));
    console.log(`Work Duration: ${currentSettings.workDuration} minutes`);
    console.log(`Break Duration: ${currentSettings.breakDuration} minutes\n`);

    const answers = await inquirer.prompt([
        {
            type: 'number',
            name: 'workDuration',
            message: 'Enter work duration (in minutes):',
            default: currentSettings.workDuration,
            validate: (value) => {
                if (typeof value === 'number' && value > 0) return true;
                return 'Please enter a valid number greater than 0';
            }
        },
        {
            type: 'number',
            name: 'breakDuration',
            message: 'Enter break duration (in minutes):',
            default: currentSettings.breakDuration,
            validate: (value) => {
                if (typeof value === 'number' && value > 0) return true;
                return 'Please enter a valid number greater than 0';
            }
        }
    ]);

    await saveSettings({
        workDuration: answers.workDuration,
        breakDuration: answers.breakDuration
    });

    console.log(chalk.green('\nSettings saved successfully!'));
    
    await new Promise(resolve => setTimeout(resolve, 1500));
}