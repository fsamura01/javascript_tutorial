// Solution 1: Using Set
/**
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
function numJewelsInStones_Set(jewels, stones) {
  // Create a Set of jewels for O(1) lookup
  const jewelSet = new Set(jewels);

  // Count stones that are also jewels
  return stones
    .split("")
    .reduce((count, stone) => count + (jewelSet.has(stone) ? 1 : 0), 0);
}

// Solution 2: Using Hash Map
function numJewelsInStones_Map(jewels, stones) {
  // Create frequency map of stones
  const stoneCount = new Map();
  for (const stone of stones) {
    stoneCount.set(stone, (stoneCount.get(stone) || 0) + 1);
  }

  // Sum up counts of stones that are jewels
  let total = 0;
  for (const jewel of jewels) {
    total += stoneCount.get(jewel) || 0;
  }
  return total;
}

// Solution 3: Using Array (if we know characters are only letters)
function numJewelsInStones_Array(jewels, stones) {
  // Create array for lowercase and uppercase letters
  const isJewel = new Array(128).fill(false);

  // Mark all jewels
  for (const jewel of jewels) {
    isJewel[jewel.charCodeAt(0)] = true;
  }

  // Count stones that are jewels
  let count = 0;
  for (const stone of stones) {
    if (isJewel[stone.charCodeAt(0)]) {
      count++;
    }
  }
  return count;
}

// Solution 4: Direct string methods (simple but less efficient)
function numJewelsInStones_Simple(jewels, stones) {
  return stones.split("").filter((stone) => jewels.includes(stone)).length;
}

// Test cases
const testCases = [
  { jewels: "aA", stones: "aAAbbbb" },
  { jewels: "z", stones: "ZZ" },
];

for (const { jewels, stones } of testCases) {
  console.log(`Input: jewels = "${jewels}", stones = "${stones}"`);
  console.log("Output (Set):", numJewelsInStones_Set(jewels, stones));
  console.log("Output (Map):", numJewelsInStones_Map(jewels, stones));
  console.log("Output (Array):", numJewelsInStones_Array(jewels, stones));
  console.log("Output (Simple):", numJewelsInStones_Simple(jewels, stones));
  console.log("---");
}
