function getTotalEfficiency(skill) {
  // Step 1: Sort the array
  skill.sort((a, b) => a - b);

  let totalEfficiency = 0;
  let targetSum = skill[0] + skill[skill.length - 1]; // Target sum for all pairs

  let low = 0;
  let high = skill.length - 1;

  // Step 2: Pair and calculate efficiency
  while (low < high) {
    let sum = skill[low] + skill[high];

    // If the sum of the pair is not equal to the target sum, return -1
    if (sum !== targetSum) {
      return -1;
    }

    // Calculate efficiency and add to total
    totalEfficiency += skill[low] * skill[high];

    // Move pointers
    low++;
    high--;
  }

  // Step 3: Return total efficiency
  return totalEfficiency;
}

// Example Usage
let skill = [1, 2, 3, 2];
console.log(getTotalEfficiency(skill)); // Output: 7

function getTotalEfficiency(skill) {
  skill.sort((a, b) => a - b);

  let left = 0;
  let right = skill.length - 1;
  let targetSum = skill.reduce((acc, curr) => acc + curr, 0) / 2;
  let totalEfficiency = 0;

  while (left < right) {
    const currentSum = skill[left] + skill[right];

    if (currentSum === targetSum) {
      totalEfficiency += skill[left] * skill[right];
      left++;
      right--;
    } else if (currentSum < targetSum) {
      left++;
    } else {
      right--;
    }
  }

  return left === right ? -1 : totalEfficiency;
}
