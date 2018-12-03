const solve = input => {
  const fabric = new Map();

  for (let inputIndex = 0; inputIndex < input.length; inputIndex++) {
    const claim = parseClaim(input[inputIndex]);
    addClaimToFabric(claim, fabric);
  }

  getIntactClaim(fabric);
  return numberOfOverlapping(fabric);
};

const addClaimToFabric = (claim, fabric) => {
  let multiplesCounter = 0;

  for (let x = claim.leftMargin + 1; x <= claim.leftMargin + claim.width; x++) {
    for (
      let y = claim.topMargin + 1;
      y <= claim.topMargin + claim.height;
      y++
    ) {
      const mapKey = x.toString() + "," + y.toString();
      if (!fabric.has(mapKey)) {
        fabric.set(mapKey, new Set([claim.id]));
      } else {
        const setForKey = fabric.get(mapKey);
        setForKey.add(claim.id);
        multiplesCounter++;
      }
    }
  }

  return multiplesCounter;
};

const parseClaim = claim => {
  // const expected = {
  //   id: "1",
  //   leftMargin: 1,
  //   topMargin: 3,
  //   width: 4,
  //   height: 4
  // };

  const split = claim.split(" ");
  const id = split[0].slice(1);
  const leftMargin = parseInt(split[2].slice(0, split[2].indexOf(",")));
  const topMargin = parseInt(
    split[2].slice(split[2].indexOf(",") + 1, split[2].indexOf(":"))
  );
  const width = parseInt(split[3].slice(0, split[3].indexOf("x")));
  const height = parseInt(split[3].slice(split[3].indexOf("x") + 1));

  return {
    id,
    leftMargin,
    topMargin,
    width,
    height
  };
};

const numberOfOverlapping = fabric => {
  let count = 0;
  fabric.forEach(value => {
    if (value.size > 1) {
      count++;
    }
  });
  return count;
};

const getIntactClaim = fabric => {
  const claims = {
    true: new Set(),
    false: new Set()
  };

  fabric.forEach(value => {
    claimsForSquareInch = Array.from(value);
    if (claimsForSquareInch.length > 1) {
      for (let claimForSquareInch of claimsForSquareInch) {
        claims.false.add(claimForSquareInch);
        if (claims.true.has(claimForSquareInch)) {
          claims.true.delete(claimForSquareInch);
        }
      }
    } else {
      if (!claims.false.has(claimsForSquareInch[0])) {
        claims.true.add(claimsForSquareInch[0]);
      }
    }
  });

  console.log(`true claims ${Array.from(claims.true)}`);
};

module.exports = { solve, parseClaim, getIntactClaim };
