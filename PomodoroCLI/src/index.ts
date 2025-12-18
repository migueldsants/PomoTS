#!/usr/bin/env node

import menuLoop from "./ui/menuLoop.js";
import startup from "./ui/startup.js";


async function main() {
  console.clear();

  const title = "🍅 Pomodoro CLI\n";

  await startup(title);  
  await menuLoop(title); 
}

main();