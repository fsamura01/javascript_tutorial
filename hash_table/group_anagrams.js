/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
  // Step 1: Create a hash map to store anagram groups
  const anagramGroups = new Map();

  // Step 2: Iterate through each string in the input array
  for (const str of strs) {
    // Step 3: Create a key by sorting the characters of the string
    const key = str.split("").sort().join("");

    // Step 4: Add the string to its anagram group in the hash map
    if (!anagramGroups.has(key)) {
      anagramGroups.set(key, []);
    }
    anagramGroups.get(key).push(str);
  }

  // Step 5: Return the grouped anagrams as an array
  return Array.from(anagramGroups.values());
}

// Example usage
const words = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log(groupAnagrams(words));
// Output: [["eat","tea","ate"],["tan","nat"],["bat"]]
