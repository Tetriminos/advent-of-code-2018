const assert = require("assert");

const solve = (players, lastMarble) => {
  const highScores = new Map();
  let marbles = [0, 1];
  let currentMarbleIndex = 1;
  for (let i = 0; i < players; i++) {
    highScores.set(i + 1, 0);
  }

  // console.log(highScores);

  let player = 2;

  for (let i = 2; i <= lastMarble; i++) {
    if (i % 100000 === 0) console.log(i);
    if (i % 23 === 0) {
      currentMarbleIndex =
        currentMarbleIndex - 7 >= 0
          ? currentMarbleIndex - 7
          : marbles.length + currentMarbleIndex - 7;

      highScores.set(
        player,
        highScores.get(player) + i + marbles[currentMarbleIndex]
      );
      marbles.splice(currentMarbleIndex, 1);
    } else {
      currentMarbleIndex =
        currentMarbleIndex + 2 <= marbles.length
          ? currentMarbleIndex + 2
          : currentMarbleIndex + 2 - marbles.length;
      marbles.splice(currentMarbleIndex, 0, i);
    }

    if (player + 1 > players) {
      player = 1;
    } else {
      player++;
    }
  }

  // console.log(highScores);
  // console.log(Array.from(highScores.values()));

  const max = Math.max(...Array.from(highScores.values()));
  console.log(max);
  return max;
};

module.exports = { solve };

// assert.equal(solve(9, 23), 32);
// assert.equal(solve(10, 1618), 8317);
// assert.equal(solve(13, 7999), 146373);
// assert.equal(solve(17, 1104), 2764);
// assert.equal(solve(21, 6111), 54718);
// assert.equal(solve(30, 5807), 37305);
assert.equal(solve(423, 7194400), 37305);
