#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";

console.clear();

const sleep = (ms: number = 2000): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

async function welcome(): Promise<void> {
  const title = "🍅 Pomodoro CLI\n";

  const rainbowTitle = chalkAnimation.rainbow(title);

  await sleep();
  rainbowTitle.stop();

  console.clear();

  console.log(chalk.green(title));
}

welcome();
