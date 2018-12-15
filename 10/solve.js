const solve = input => {
  const stars = [];
  input.forEach((line, index) => {
    const [position, velocity] = line.split("velocity=<");
    const x = Number(position.slice(10, position.indexOf(",")));
    const y = Number(
      position.slice(position.indexOf(",") + 1, position.indexOf(">"))
    );
    const xVel = Number(velocity.slice(0, velocity.indexOf(",")));
    const yVel = Number(
      velocity.slice(velocity.indexOf(",") + 1, velocity.indexOf(">"))
    );
    stars.push({
      x,
      y,
      xVel,
      yVel
    });
  });

  let iteration = 0;
  let something = 0;
  let flag = true;
  while (flag) {
    for (let star of stars) {
      star.x += star.xVel;
      star.y += star.yVel;
    }
    console.log(iteration);
    flag = draw(stars);
    // if (!flag) {
    //   something++;
    // }
    iteration++;
  }
};

const draw = stars => {
  const allX = stars.map(value => value.x);
  const allY = stars.map(value => value.y);
  let minX = Math.min(...allX);
  let minY = Math.min(...allY);
  let maxX = Math.max(...allX);
  let maxY = Math.max(...allY);
  const starSet = new Set();
  allX.forEach((value, index) => {
    starSet.add(value.toString() + "," + allY[index].toString());
  });

  console.log("x diff", Math.abs(minX - maxX));
  console.log("y diff", Math.abs(minY - maxY));

  if (Math.abs(minX - maxX) < 64 && Math.abs(minY - maxY) < 64) {
    for (let j = minY; j <= maxY; j++) {
      for (let i = minX; i <= maxX; i++) {
        if (starSet.has(i.toString() + "," + j.toString())) {
          process.stdout.write("#");
        } else {
          process.stdout.write(".");
        }
      }
      process.stdout.write("\n");
    }
    console.log("==============");
    return false;
  } else {
    return true;
  }
};

module.exports = { solve };
