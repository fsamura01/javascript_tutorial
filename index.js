/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var threeSumMulti = function (arr, target) {
  const MOD = 1_000_000_007;

  // Step 1: Build frequency map
  const freq = new Array(101).fill(0);
  for (let num of arr) {
    freq[num]++;
  }

  let result = 0;

  // Step 2: Iterate through all possible triplets (x, y, z) where x <= y <= z
  for (let x = 0; x <= 100; x++) {
    if (freq[x] === 0) continue;

    for (let y = x; y <= 100; y++) {
      if (freq[y] === 0) continue;

      let z = target - x - y;

      // z must be valid and maintain x <= y <= z
      if (z < 0 || z > 100 || z < y) continue;
      if (freq[z] === 0) continue;

      // Count combinations based on cases
      if (x === y && y === z) {
        // Case 1: All three same (x, x, x)
        // Need at least 3 occurrences: C(n, 3) = n*(n-1)*(n-2)/6
        if (freq[x] >= 3) {
          result += (freq[x] * (freq[x] - 1) * (freq[x] - 2)) / 6;
        }
      } else if (x === y) {
        // Case 2a: Two same, one different (x, x, z)
        // Need at least 2 of x: C(n, 2) = n*(n-1)/2
        if (freq[x] >= 2) {
          result += ((freq[x] * (freq[x] - 1)) / 2) * freq[z];
        }
      } else if (y === z) {
        // Case 2b: One different, two same (x, y, y)
        // Need at least 2 of y: C(n, 2) = n*(n-1)/2
        if (freq[y] >= 2) {
          result += (freq[x] * freq[y] * (freq[y] - 1)) / 2;
        }
      } else {
        // Case 3: All different (x, y, z)
        result += freq[x] * freq[y] * freq[z];
      }

      // Apply modulo
      result %= MOD;
    }
  }

  return result;
};
