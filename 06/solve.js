const solve = input => {
  const grid = {};

  let maxHeight = 0;
  let maxWidth = 0;
  for (const coordinate of input) {
    const [x, y] = coordinate.split(", ");
    maxHeight = Math.max(x, maxHeight);
    maxWidth = Math.max(y, maxWidth);
    grid[coordinate] = { set: new Set(), isInfinite: false, sizeBefore: 0 };
  }

  const region = [];

  for (let i = 0; i < maxWidth; i++) {
    for (let j = 0; j < maxHeight; j++) {
      let cummulativeDistance = 0;
      for (let coordinate in grid) {
        const [x, y] = coordinate.split(", ");
        cummulativeDistance += Math.abs(i - x) + Math.abs(j - y);
      }
      if (cummulativeDistance < 10000) {
        region.push([i, j]);
      }
    }
  }

  console.log(JSON.stringify(region, undefined, 4));
  console.log(region.length);

  // for (let i = 0; i < maxWidth + 5; i++) {
  //   for (let j = 0; j < maxHeight + 6; j++) {
  //     let minDistance = 3000;
  //     let multipleCoordinates = false;
  //     let minDistanceCoordinate;
  //     for (let coordinate in grid) {
  //       // console.log(coordinate);
  //       const [x, y] = coordinate.split(", ");
  //       const distance = Math.abs(i - x) + Math.abs(j - y);
  //       // console.log(distance);
  //       if (minDistance > distance) {
  //         minDistance = distance;
  //         minDistanceCoordinate = coordinate;
  //         multipleCoordinates = false;
  //       } else if (minDistance === distance) {
  //         minDistanceCoordinate = null;
  //         multipleCoordinates = true;
  //       }
  //     }
  //     // console.log(
  //     //   `for i ${i} and j ${j}, the minimum distance is ${minDistance}, to the coordinate ${minDistanceCoordinate}, multiple is ${multipleCoordinates}`
  //     // );
  //     if (!multipleCoordinates) {
  //       grid[minDistanceCoordinate].set.add(`${i}, ${j}`);
  //     }
  //   }
  // }

  // for (const coordinate in grid) {
  //   grid[coordinate].sizeBefore = grid[coordinate].set.size;
  // }

  // const extraCoordinates = [
  //   [-10, -10],
  //   [maxWidth + 10, -10],
  //   [maxWidth + 10, maxHeight + 10],
  //   [-10, maxHeight + 10]
  // ];

  // for (let i = -10; i < maxWidth + 10; i++) {
  //   let j = -10;
  //   let minDistance = 3000;
  //   let multipleCoordinates = false;
  //   let minDistanceCoordinate;
  //   for (let coordinate in grid) {
  //     // console.log(coordinate);
  //     const [x, y] = coordinate.split(", ");
  //     const distance = Math.abs(i - x) + Math.abs(j - y);
  //     // console.log(distance);
  //     if (minDistance > distance) {
  //       minDistance = distance;
  //       minDistanceCoordinate = coordinate;
  //       multipleCoordinates = false;
  //     } else if (minDistance === distance) {
  //       minDistanceCoordinate = null;
  //       multipleCoordinates = true;
  //     }
  //   }
  //   if (!multipleCoordinates) {
  //     grid[minDistanceCoordinate].set.add(`${i}, ${j}`);
  //   }
  // }

  // for (let j = maxWidth + 10; j < maxHeight + 10; j++) {
  //   let i = maxWidth + 10;
  //   let minDistance = 3000;
  //   let multipleCoordinates = false;
  //   let minDistanceCoordinate;
  //   for (let coordinate in grid) {
  //     // console.log(coordinate);
  //     const [x, y] = coordinate.split(", ");
  //     const distance = Math.abs(i - x) + Math.abs(j - y);
  //     // console.log(distance);
  //     if (minDistance > distance) {
  //       minDistance = distance;
  //       minDistanceCoordinate = coordinate;
  //       multipleCoordinates = false;
  //     } else if (minDistance === distance) {
  //       minDistanceCoordinate = null;
  //       multipleCoordinates = true;
  //     }
  //   }
  //   if (!multipleCoordinates) {
  //     grid[minDistanceCoordinate].set.add(`${i}, ${j}`);
  //   }
  // }

  // for (let i = -10; i < maxWidth + 10; i++) {
  //   let j = maxHeight + 10;
  //   let minDistance = 3000;
  //   let multipleCoordinates = false;
  //   let minDistanceCoordinate;
  //   for (let coordinate in grid) {
  //     // console.log(coordinate);
  //     const [x, y] = coordinate.split(", ");
  //     const distance = Math.abs(i - x) + Math.abs(j - y);
  //     // console.log(distance);
  //     if (minDistance > distance) {
  //       minDistance = distance;
  //       minDistanceCoordinate = coordinate;
  //       multipleCoordinates = false;
  //     } else if (minDistance === distance) {
  //       minDistanceCoordinate = null;
  //       multipleCoordinates = true;
  //     }
  //   }
  //   if (!multipleCoordinates) {
  //     grid[minDistanceCoordinate].set.add(`${i}, ${j}`);
  //   }
  // }

  // for (let j = -10; j < maxHeight + 10; j++) {
  //   let i = -10;
  //   let minDistance = 3000;
  //   let multipleCoordinates = false;
  //   let minDistanceCoordinate;
  //   for (let coordinate in grid) {
  //     // console.log(coordinate);
  //     const [x, y] = coordinate.split(", ");
  //     const distance = Math.abs(i - x) + Math.abs(j - y);
  //     // console.log(distance);
  //     if (minDistance > distance) {
  //       minDistance = distance;
  //       minDistanceCoordinate = coordinate;
  //       multipleCoordinates = false;
  //     } else if (minDistance === distance) {
  //       minDistanceCoordinate = null;
  //       multipleCoordinates = true;
  //     }
  //   }
  //   if (!multipleCoordinates) {
  //     grid[minDistanceCoordinate].set.add(`${i}, ${j}`);
  //   }
  // }

  // let biggestFiniteCoordinate;
  // let biggestFiniteCoordinateSize = 0;
  // for (const coordinate in grid) {
  //   console.log(
  //     `coordinate ${coordinate} had a size ${
  //       grid[coordinate].sizeBefore
  //     }, now has size ${grid[coordinate].set.size}`
  //   );
  //   if (grid[coordinate].sizeBefore === grid[coordinate].set.size) {
  //     if (biggestFiniteCoordinateSize < grid[coordinate].set.size) {
  //       biggestFiniteCoordinate = coordinate;
  //       biggestFiniteCoordinateSize = grid[coordinate].set.size;
  //     }
  //   }
  // }
  // return biggestFiniteCoordinateSize;
};

module.exports = { solve };
