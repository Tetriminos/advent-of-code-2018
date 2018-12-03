// const solve = input => {
//   const outsideCount = new Map([["twos", 0], ["threes", 0]]);

//   for (const id of input) {
//     const { twos, threes } = areThereTwosOrThrees(id);

//     if (twos) {
//       const currentCountTwos = outsideCount.get("twos");
//       outsideCount.set("twos", currentCountTwos + 1);
//     }

//     if (threes) {
//       const currentCountThrees = outsideCount.get("threes");
//       outsideCount.set("threes", currentCountThrees + 1);
//     }
//   }

//   return outsideCount.get("twos") * outsideCount.get("threes");
// };

// const areThereTwosOrThrees = id => {
//   const letterCount = new Map();

//   for (const letter of id) {
//     if (letterCount.has(letter)) {
//       const currentCount = letterCount.get(letter);
//       letterCount.set(letter, currentCount + 1);
//     } else {
//       letterCount.set(letter, 1);
//     }
//   }

//   let twos = false;
//   let threes = false;

//   letterCount.forEach((value, key) => {
//     if (value === 2) {
//       twos = true;
//     } else if (value === 3) {
//       threes = true;
//     }
//   });

//   return { twos, threes };
// };

// const solve = input => {
//   /* letterMap e.g.
//     [
//       [0, [['a', [0, 2, 4]], ['b', [1]]]],
//       [2, ['b', [2]]],
//       ...
//     ]
//     where the key is the position of the letter
//     whose value is also a map
//     where the keys are the letters
//     and the values are sets of input string indices for which those letters are at that position
//   */
//   const letterMap = {};
//   for (let i = 0; i < input[0].length; i++) {
//     letterMap[i] = {};
//   }

//   for (let idIndex = 0; idIndex < input.length; idIndex++) {
//     const id = input[idIndex];
//     const differencesWith = {};

//     for (let i = 0; i < idIndex - 1; i++) {
//       differencesWith[i] = 0;
//     }

//     for (let letterPosition = 0; letterPosition < id.length; letterPosition++) {
//       doStuff({ differencesWith, letterMap, letterPosition, id, idIndex });
//     }

//     for (let index in differencesWith) {
//       if (differencesWith[index] === 1) {
//         console.log(input[index], input[idIndex]);
//       }
//     }
//   }
// };

// const doStuff = ({ differencesWith, letterMap, letterPosition, id, idIndex }) => {
//   const letter = id[letterPosition];

//   if (letterMap[letterPosition][letter]) {
//     for (let property in differencesWith) {
//       if (!letterMap[letterPosition][letter].has(property)) {
//         differencesWith[property]++;
//       }
//     }
//   } else {
//     letterMap[letterPosition][letter] = new Set();
//     letterMap[letterPosition][letter].add(idIndex);
//   }
// };

const solve = input => {
  for (let idIndex = 0; idIndex < input.length; idIndex++) {
    const id = input[idIndex];
    for (
      let idOfIndexToCompareTo = 0;
      idOfIndexToCompareTo < idIndex;
      idOfIndexToCompareTo++
    ) {
      const comparedId = input[idOfIndexToCompareTo];
      if (!moreThanOneDifference(id, comparedId)) {
        return `${id} and ${comparedId}`;
      }
    }
  }
};

const moreThanOneDifference = (firstID, secondID) => {
  let flag = false;
  for (let i = 0; i < firstID.length; i++) {
    if (firstID[i] !== secondID[i]) {
      if (flag === true) {
        return true;
      }

      flag = true;
    }
  }

  return false;
};

module.exports = { solve, moreThanOneDifference };
