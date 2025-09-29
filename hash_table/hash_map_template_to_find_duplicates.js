/**
 * @param {Array} keys - An array of elements to check for duplicates
 * @return {ReturnType} - Return type depends on the specific requirement
 */

function findFirstDuplicate(keys) {
  const hashmap = new Map();

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (hashmap.has(key)) {
      return key; // Return the first duplicate found
    }
    hashmap.set(key, i); // Store the index as the value
  }

  return null; // No duplicates found
}

// Example usage:
console.log(findFirstDuplicate([1, 2, 3, 2, 1])); // Output: 2

function aggregateByKey_hashmap(keys) {
  // Create a new Map to store key-value pairs
  const hashmap = new Map();

  for (const key of keys) {
    if (hashmap.has(key)) {
      // If the key already exists in the map
      const value = hashmap.get(key);
      //  if (/* value satisfies the requirement */) {
      //    return /* needed_information */;
      //}
    }
    // Add the key to the map with any needed information (e.g., index)
    hashmap.set(key /* value */);
  }

  return /* needed_information */;
}

// Example usage:
// const result = aggregateByKey_hashmap([1, 2, 3, 2, 1]);
// console.log(result);
