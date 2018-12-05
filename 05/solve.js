const solve = input => {
    let originalPolymer = input[0];
    
    let letterWithShortest;
    let shortestPolymer = 99999999999;
    for (let j = 0; j < 26; j++) {
        let letterNum = j + 10;
        const letter = letterNum.toString(36);
        const regex = new RegExp(letter, 'ig');
        let polymer = originalPolymer.replace(regex, '');
        let i = 0;
        while (i < polymer.length - 1) {
            if (polymer[i] === polymer[i].toLowerCase()) {
                if (
                    polymer[i + 1] !== polymer[i] &&
                    polymer[i + 1].toLowerCase() === polymer[i]
                ) {
                    if (i + 1 === polymer.length) {
                        polymer = polymer.slice(0, i);
                    } else {
                        polymer = polymer.slice(0, i) + polymer.slice(i + 2);
                    }
                    i = i - 1 < 0 ? 0 : i - 1;
                } else {
                    i++;
                }
            } else if (polymer[i] === polymer[i].toUpperCase()) {
                if (
                    polymer[i + 1] !== polymer[i] &&
                    polymer[i + 1].toUpperCase() === polymer[i]
                ) {
                    if (i + 1 === polymer.length) {
                        polymer = polymer.slice(0, i);
                    } else {
                        polymer = polymer.slice(0, i) + polymer.slice(i + 2);
                    }
                    i = i - 1 < 0 ? 0 : i - 1;
                } else {
                    i++;
                }
            }
            // console.log(polymer);
        }
        console.log(letter, polymer.length);
        if (polymer.length < shortestPolymer) {
            shortestPolymer = polymer.length;
            letterWithShortest = letter;
        }
    }
    
    // i = 0;
    // while (i < polymer.length - 1) {
    //     if (polymer[i] === polymer[i].toLowerCase()) {
    //         if (
    //             polymer[i + 1] !== polymer[i] &&
    //             polymer[i + 1].toLowerCase() === polymer[i]
    //         ) {
    //             if (i + 1 === polymer.length) {
    //                 polymer = polymer.slice(0, i);
    //             } else {
    //                 polymer = polymer.slice(0, i) + polymer.slice(i + 2);
    //             }
    //             i = 0;
    //         }
    //     } else if (polymer[i] === polymer[i].toUpperCase()) {
    //         if (
    //             polymer[i + 1] !== polymer[i] &&
    //             polymer[i + 1].toUpperCase() === polymer[i]
    //         ) {
    //             if (i + 1 === polymer.length) {
    //                 polymer = polymer.slice(0, i);
    //             } else {
    //                 polymer = polymer.slice(0, i) + polymer.slice(i + 2);
    //             }
    //             i = 0;
    //         }
    //     }
    //
    //     i++;
    //     // console.log(polymer);
    // }
    
    console.log(`the shortest polymer is ${shortestPolymer} long and is achieved by removing the letter ${letterWithShortest}`);
    
    return shortestPolymer;
};

// console.log(solve(["dabAcCaCBAcCcaDAaZ"]));

module.exports = { solve };