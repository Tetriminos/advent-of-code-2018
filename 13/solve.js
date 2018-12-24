const solve = input => {
  const { map, cartLocations } = initialize(input);

  let biggestWidth = input.reduce((max, row) => {
    return Math.max(max, row.length);
  }, 0);

  console.log(biggestWidth);
  let collisionLocation;
  let time = 0;
  while (!collisionLocation) {
    console.log(cartLocations);
    // printMap(map, cartLocations, biggestWidth, input.length);
    tick(map, cartLocations, biggestWidth, input.length, time);
    if (cartLocations.size < 2) {
      console.log(cartLocations);
      collisionLocation = 1;
    }
    time++;
  }

  printMap(map, cartLocations, biggestWidth, input.length);

  console.log(collisionLocation);

  // console.log(cartLocations);

  return collisionLocation;
};

const tick = (map, cartLocations, biggestWidth, biggestHeight, time) => {
  for (let x = 0; x < biggestWidth; x++) {
    for (let y = 0; y < biggestHeight; y++) {
      let currentLocation = `${x},${y}`;
      if (cartLocations.has(currentLocation)) {
        let cart = cartLocations.get(currentLocation);
        if (cart.time > time) {
          continue;
        }
        let orientation = cart.orientation;
        let newLocation;

        switch (orientation) {
          case "^":
            newLocation = `${x},${y - 1}`;
            if (cartLocations.has(newLocation)) {
              cartLocations.delete(currentLocation);
              cartLocations.delete(newLocation);
              return;
            }

            if (map.get(newLocation) === "+") {
              cart.intersection();
            } else if (map.get(newLocation) === "/") {
              cart.orientation = ">";
            } else if (map.get(newLocation) === "\\") {
              cart.orientation = "<";
            }
            cartLocations.delete(currentLocation);
            cartLocations.set(newLocation, cart);
            cart.time++;
            break;
          case ">":
            newLocation = `${x + 1},${y}`;
            if (cartLocations.has(newLocation)) {
              cartLocations.delete(currentLocation);
              cartLocations.delete(newLocation);
              return;
            }

            if (map.get(newLocation) === "+") {
              cart.intersection();
            } else if (map.get(newLocation) === "/") {
              cart.orientation = "^";
            } else if (map.get(newLocation) === "\\") {
              cart.orientation = "v";
            }
            cartLocations.delete(currentLocation);
            cartLocations.set(newLocation, cart);
            cart.time++;
            break;
          case "v":
            newLocation = `${x},${y + 1}`;
            if (cartLocations.has(newLocation)) {
              cartLocations.delete(currentLocation);
              cartLocations.delete(newLocation);
              return;
            }

            if (map.get(newLocation) === "+") {
              cart.intersection();
            } else if (map.get(newLocation) === "/") {
              cart.orientation = "<";
            } else if (map.get(newLocation) === "\\") {
              cart.orientation = ">";
            }
            cartLocations.delete(currentLocation);
            cartLocations.set(newLocation, cart);
            cart.time++;
            break;
          case "<":
            newLocation = `${x - 1},${y}`;
            if (cartLocations.has(newLocation)) {
              cartLocations.delete(currentLocation);
              cartLocations.delete(newLocation);
              return;
            }

            if (map.get(newLocation) === "+") {
              cart.intersection();
            } else if (map.get(newLocation) === "/") {
              cart.orientation = "v";
            } else if (map.get(newLocation) === "\\") {
              cart.orientation = "^";
            }
            cartLocations.delete(currentLocation);
            cartLocations.set(newLocation, cart);
            cart.time++;
            break;
        }
      }
    }
  }
};

const initialize = input => {
  const map = new Map();
  const cartLocations = new Map();

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      switch (input[y][x]) {
        case ">":
          map.set(`${x},${y}`, "-");
          cartLocations.set(`${x},${y}`, new Cart(input[y][x]));
          break;
        case "<":
          map.set(`${x},${y}`, "-");
          cartLocations.set(`${x},${y}`, new Cart(input[y][x]));
          break;
        case "^":
          map.set(`${x},${y}`, "|");
          cartLocations.set(`${x},${y}`, new Cart(input[y][x]));
          break;
        case "v":
          map.set(`${x},${y}`, "|");
          cartLocations.set(`${x},${y}`, new Cart(input[y][x]));
          break;
        default:
          map.set(`${x},${y}`, input[y][x]);
          break;
      }
    }
  }

  return { map, cartLocations };
};

leftMap = {
  "^": "<",
  "<": "v",
  v: ">",
  ">": "^"
};

rightMap = {
  "^": ">",
  "<": "^",
  v: "<",
  ">": "v"
};

class Cart {
  constructor(orientation) {
    this.count = 0;
    this.time = 0;
    this.orientation = orientation;
  }

  intersection() {
    if (this.count === 2) {
      this.count = 0;
    } else {
      this.count++;
    }

    switch (this.count) {
      case 1:
        this.orientation = leftMap[this.orientation];
        break;
      case 2:
        break;
      case 0:
        this.orientation = rightMap[this.orientation];
        break;
    }
  }

  // turn(turnType) {
  //   switch (turnType)
  // }
}

const printMap = (map, cartLocations, biggestWidth, biggestHeight) => {
  for (let y = 0; y < biggestHeight; y++) {
    for (let x = 0; x < biggestWidth; x++) {
      process.stdout.write(
        cartLocations.has(`${x},${y}`)
          ? cartLocations.get(`${x},${y}`).orientation
          : map.get(`${x},${y}`)
      );
    }
    console.log();
  }
};

module.exports = { solve };
