const assert = require("assert");

const { moreThanOneDifference } = require("./solve");

assert.equal(moreThanOneDifference("AAAA", "AAAB"), false);
assert.equal(moreThanOneDifference("AAAA", "AABB"), true);
assert.equal(moreThanOneDifference("AAAA", "AAAA"), false);
