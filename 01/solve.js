const solve = input => {
  const frequencySet = new Set();
  let accumulator = 0;
  let iterator = 0;

  while (!frequencySet.has(accumulator)) {
    frequencySet.add(accumulator);

    if (iterator === input.length) {
      iterator = 0;
    }

    change = input[iterator];

    const operator = change.slice(0, 1);
    const value = parseInt(change.slice(1));

    switch (operator) {
      case "+":
        accumulator = accumulator + value;
        break;
      case "-":
        accumulator = accumulator - value;
        break;
    }

    iterator++;
  }

  return accumulator;
};

module.exports = solve;
