const fs = require('fs');
const readline = require('readline');
const process = require('process');

const writeStream = fs.createWriteStream('02-write-file/new-text.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function userInput() {
  rl.question('Please enter your text -> ', (text) => {
    if (text == 'exit') {
      console.log('Well done');
      process.exitCode = 1;
      rl.close();
    } else {
      writeStream.write(text + ' ');
      userInput();
    }
  });
}

rl.on('SIGINT', () => {
  console.log('\nWell done');
  process.exitCode = 1;
  rl.close();
});

userInput();
