const solve = input => {
    // initial state: ###..#...####.#..###.....####.######.....##.#####.##.##..###....#....##...##...##.#..###..#.#...#..#
    //
    // .###. => .
    // ..#.. => .
    // .#### => .
    // .##.. => #
    
    let initialState = [];
    const patterns = new Map();
    for (let i = 0; i < 1002; i++) {
        initialState.push('.');
    }
    
    for (let char of input[0].substring(15)) {
        initialState.push(char);
    }
    
    for (let i = 0; i < 1002; i++) {
        initialState.push('.');
    }
    
    for (let i = 1; i < input.length; i++) {
        patterns.set(input[i].substring(0, 5), input[i].charAt(9));
    }
    console.log(initialState.join(''));
    console.log(patterns);
    
    for (let j = 0; j < 999; j++) {
        // if (j % 10 === 0) {
        //     console.log(j);
        // }
        let newState = JSON.parse(JSON.stringify(initialState));
        for (let i = 0; i < initialState.length - 5; i++) {
            let currentPattern = initialState.join('').substring(i, i + 5);
            // console.log(currentPattern);
            let value = patterns.get(currentPattern);
            if (value) {
                newState.splice(i + 2, 1, value);
                // console.log(i, value);
            } else {
                newState.splice(i + 2, 1, '.');
            }
        }
        initialState = newState;
        // console.log(initialState.join(''));
        let number = 0;
        for (let i = 0; i < initialState.length; i++) {
            if (initialState[i] === '#') {
                number += i - 1002;
            }
        }
        // console.log('number', number);
    }
    
    
    let number = 0;
    for (let i = 0; i < initialState.length; i++) {
        if (initialState[i] === '#') {
            number += i - 1002;
        }
    }
    
    // console.log(initialState.join(''));
    
    return number + 49999999001 * 26;
};

module.exports = { solve };