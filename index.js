const fs = require("fs");

const args = process.argv.slice(2);
const day = args[0];
const puzzleNumber = args[1];

const inputPath = `./${day}/input${puzzleNumber}.txt`;

if (!fs.existsSync(inputPath)) {
  console.error(`No input text for day ${day}, puzzle number ${puzzleNumber}`);
  process.exit(1);
}

// split input file into an array by row
const input = fs
  .readFileSync(inputPath)
  .toString()
  .split("\n")
  .map(s => s.replace(/\r$/, ""))
  .filter(s => s.length > 0);

const solve = require(`./${day}/solve.js`);

console.log(solve(input));
