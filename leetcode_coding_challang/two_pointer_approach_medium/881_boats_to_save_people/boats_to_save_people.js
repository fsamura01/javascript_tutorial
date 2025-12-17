/**
 * @param {number[]} people - array of people's weights
 * @param {number} limit - maximum weight capacity per boat
 * @return {number} - minimum number of boats needed
 */
function numRescueBoats(people, limit) {
  // Step 1: Sort people by weight (ascending order)
  // This allows us to efficiently access lightest and heaviest people
  people.sort((a, b) => a - b);

  // Step 2: Initialize two pointers at the extremes
  let left = 0; // Points to lightest person
  let right = people.length - 1; // Points to heaviest person
  let boats = 0; // Counter for boats needed

  // Step 3: Process people from both ends toward the middle
  while (left <= right) {
    // Try to pair the heaviest with the lightest
    if (people[left] + people[right] <= limit) {
      // Success! They can share a boat
      // Move left pointer right (lightest person is assigned)
      left++;
    }
    // Whether paired or not, the heaviest person gets on a boat
    // If paired, both are assigned; if not, heavy person goes alone
    right--;
    boats++;
  }

  return boats;
}

// Example usage with detailed trace:
console.log(numRescueBoats([3, 2, 2, 1], 3)); // Output: 3
// Trace: sorted = [1,2,2,3]
// Iteration 1: 1+3=4 > 3, send 3 alone, boats=1, right=2
// Iteration 2: 1+2=3 ≤ 3, pair them, boats=2, left=1, right=1
// Iteration 3: 2 alone (left==right), boats=3, right=0
