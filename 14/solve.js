const solve = input => {
  console.time("a");
  let recipeScores = [3, 7];
  const inputAsString = input.toString();
  const inputLength = inputAsString.length;

  const elves = {
    first: 0,
    second: 1
  };

  while (true) {
    // for (let i = 0; i < 50000000; i++) {
    const newScore = recipeScores[elves.first] + recipeScores[elves.second];

    let tenth = Math.floor((newScore / 10) % 10);
    let first = Math.floor(newScore % 10);

    if (tenth !== 0) {
      recipeScores.push(tenth);
      updateString(tenth);
    }

    recipeScores.push(first);
    updateString(first);

    elves.first = getIndex(
      elves.first,
      1 + recipeScores[elves.first],
      recipeScores.length
    );
    elves.second = getIndex(
      elves.second,
      1 + recipeScores[elves.second],
      recipeScores.length
    );

    // console.log(
    //   `first elf index = ${elves.first}. Second elf index = ${
    //     elves.second
    //   }. Tenth = ${tenth}. First = ${first}`
    // );
    // console.log(recipeScores);

    // console.log(recipeScores);
    // console.log("lel", recipeScores.slice(recipeScores.length - inputLength));
    // if (thisString === inputAsString) {
    //   break;
    // }
    if (recipeScores.length % 100000 === 0) {
      if (recipeScores.join("").indexOf(inputAsString) !== -1) {
        console.log(recipeScores.join("").indexOf(inputAsString));
        break;
      }
    }
  }

  // console.log(recipeScores);
  // return recipeScores.slice(input, input + 10).join("");
  // return recipeScores.length - inputLength;
  // console.log(recipeScores);
  console.timeEnd("a");
  return recipeScores.join("").indexOf(inputAsString);
};

const getIndex = (currentIndex, amount, arraySize) => {
  return (currentIndex + amount) % arraySize;
};

let thisString = "";

const updateString = char => {
  if (thisString.length < 5) {
    thisString += char;
  } else {
    thisString = thisString.substring(1) + char;
  }
};

module.exports = { solve };

console.log(solve(51589), "should be", "9");
// console.log(solve(01245), "should be", "5");
console.log(solve(92510), "should be", "18");
console.log(solve(59414), "should be", "2018");
console.log(solve(509671), "should be", "5941429882");
