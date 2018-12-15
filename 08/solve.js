const solve = inputRow => {
  const input = inputRow[0].split(" ").map(s => Number(s));
  const metadataSum = sumMetadata(input, 0, 0);
  return metadataSum;
};

const sumMetadata = (input, currentSum) => {
  // console.log(input);
  let childNodes = input[0];
  // console.log("childNodes", childNodes);
  let numOfMetadata = input[1];
  // console.log("numOfMetadata", numOfMetadata);
  let shiftAmount = 0;

  let i = 2;

  const childNodeSums = [-10000];

  for (let j = 0; j < childNodes; j++) {
    let { currentSum: sum, shiftAmount } = sumMetadata(
      input.slice(i),
      currentSum
    );
    // childNodes--;
    // currentSum = sum;
    childNodeSums.push(sum);
    i += shiftAmount - 2;
  }

  if (childNodes === 0) {
    for (let j = i; j < i + numOfMetadata; j++) {
      currentSum += input[j];
    }
  } else {
    for (let j = i; j < i + numOfMetadata; j++) {
      if (childNodeSums[input[j]]) {
        currentSum += childNodeSums[input[j]];
      }
    }
  }

  shiftAmount = numOfMetadata + 2 + i;

  // const metadata = input.slice(input[i], numOfMetadata + 3);
  // metadata.forEach(meta => (currentSum += meta));

  return { currentSum, shiftAmount };
};

module.exports = { solve };
