#!/usr/bin/env node

import menuLoop from "./timer/menuLoop.js";
import startup from "./ui/startup.js";


async function main() {
  console.clear();

  await startup();  
  await menuLoop(); 
}

main();