const assert = require("assert");

const { parseClaim } = require("./solve");

const expected = {
  id: "1",
  leftMargin: 1,
  topMargin: 3,
  width: 4,
  height: 4
};

assert.deepStrictEqual(parseClaim("#1 @ 1,3: 4x4"), expected);
