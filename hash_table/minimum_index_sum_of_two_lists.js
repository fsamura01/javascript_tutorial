/**
 * @param {string[]} list1
 * @param {string[]} list2
 * @return {string[]}
 */
function findRestaurant(list1, list2) {
  // Step 1: Create a map to store strings from list1 and their indices
  const map = new Map();
  for (let i = 0; i < list1.length; i++) {
    map.set(list1[i], i);
  }

  // Step 2: Initialize variables to track minimum index sum and result
  let minIndexSum = Infinity;
  let result = [];

  // Step 3: Iterate through list2
  for (let j = 0; j < list2.length; j++) {
    if (map.has(list2[j])) {
      // Step 4: Calculate index sum for common strings
      const indexSum = j + map.get(list2[j]);

      if (indexSum < minIndexSum) {
        // Step 5: Update result if we found a smaller index sum
        minIndexSum = indexSum;
        result = [list2[j]];
      } else if (indexSum === minIndexSum) {
        // Step 6: Add to result if index sum equals the minimum
        result.push(list2[j]);
      }
    }
  }

  // Step 7: Return the result
  return result;
}

// Example usage:
console.log(
  findRestaurant(
    ["Shogun", "Tapioca Express", "Burger King", "KFC"],
    [
      "Piatti",
      "The Grill at Torrey Pines",
      "Hungry Hunter Steakhouse",
      "Shogun",
    ]
  )
); // Output: ["Shogun"]

console.log(
  findRestaurant(
    ["Shogun", "Tapioca Express", "Burger King", "KFC"],
    ["KFC", "Shogun", "Burger King"]
  )
); // Output: ["Shogun"]

console.log(findRestaurant(["happy", "sad", "good"], ["sad", "happy", "good"])); // Output: ["sad","happy"]
