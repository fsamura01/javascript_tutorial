/**
 * @param {string} dominoes
 * @return {string}
 */
var pushDominoes = function (dominoes) {
  const n = dominoes.length;
  console.log("🚀 ~ pushDominoes ~ n:", n);

  const rightForce = new Array(n).fill(Infinity);

  const leftForce = new Array(n).fill(Infinity);

  let rightDistance = Infinity;

  for (let i = 0; i < dominoes.length; i++) {
    if (dominoes[i] === "R") {
      rightDistance = 0;
    } else if (dominoes[i] === "L") {
      rightDistance = Infinity;
    } else {
      if (rightDistance !== Infinity) {
        rightDistance++;
      }
    }

    rightForce[i] = rightDistance;
  }

  let lefttDistance = Infinity;

  for (let i = n - 1; i >= 0; i--) {
    if (dominoes[i] === "R") {
      lefttDistance = Infinity;
    } else if (dominoes[i] === "L") {
      lefttDistance = 0;
    } else {
      if (lefttDistance !== Infinity) {
        lefttDistance++;
      }
    }

    leftForce[i] = lefttDistance;
  }

  const result = [];

  for (let i = 0; i < dominoes.length; i++) {
    const rightwardForce = rightForce[i];
    const lefttwardForce = leftForce[i];

    if (rightwardForce < lefttwardForce) {
      result.push("R");
    } else if (lefttwardForce < rightwardForce) {
      result.push("L");
    } else {
      result.push(".");
    }
  }

  return result.join("");
};

// Test cases
console.log(pushDominoes("RR.L")); // Expected: "RR.L"
console.log(pushDominoes(".L.R...LR..L..")); // Expected: "LL.RR.LLRRLL.."
console.log(pushDominoes("..R..")); // Expected: "..RRR"
console.log(pushDominoes("..L..")); // Expected: "LLL.."
