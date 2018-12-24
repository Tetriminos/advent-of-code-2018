const solve = input => {
    const array = [];
    // fill
    for (let y = 0; y < 300; y++) {
        array.push([]);
        
        for (let x = 0; x < 300; x++) {
            array[y].push(getPower(x, y, input));
        }
    }
    
    const squareTotals = new Map();
    let biggestTotal = -10000;
    let biggestTotalCoordinate;
    for (let y = 0; y < 300; y++) {
        for (let x = 0; x < 300; x++) {
            for (let i = 1; i <= 300 - Math.max(x, y); i++) {
                let total = 0;
                for (let py = y; py < i + y; py++) {
                    for (let px = x; px < i + x; px++) {
                        // console.log(py, px, i);
                        total += array[py][px];
                    }
                }
                squareTotals.set(`${x},${y},${i}`, total);
                biggestTotal = Math.max(biggestTotal, total);
                if (biggestTotal === total) {
                    biggestTotalCoordinate = `${x},${y},${i}`;
                }
            }
        }
        console.log(`y is ${y}`);
    }
    
    console.log(biggestTotal);
    console.log(biggestTotalCoordinate);
    
    
};

const getDigit = (number, n) => {
    return Math.floor((number / Math.pow(10, n - 1)) % 10) || 0;
};

const getPower = (x, y, serial) => {
    // Find the fuel cell's rack ID, which is its X coordinate plus 10.
    // Begin with a power level of the rack ID times the Y coordinate.
    // Increase the power level by the value of the grid serial number (your puzzle input).
    // Set the power level to itself multiplied by the rack ID.
    // Keep only the hundreds digit of the power level (so 12345 becomes 3; numbers with no hundreds digit become 0).
    // Subtract 5 from the power level.
    return getDigit(((x + 10) * y + serial) * (x + 10), 3) - 5;
};

console.log(getPower(3, 5, 8));
console.log(getPower(122, 79, 57));

console.log(solve(18), 'expected 90,269,16');
console.log(solve(42), 'expected 232,251,12');
console.log(solve(7400), 'expected 233,187,13');

module.exports = { solve };
