// constructor a function to create sorted caharacter signatures from the input string
function sortCharacters(input) {
  return [...input].sort().join("");
}

// Store these sorted characters from `array2` in a `Set` for fast lookup
let sortedWordsInArray2 = new Set();
array2.foreEach((word) => sortedWordsInArray2.add(sortedCharacters(word)));

// For each in `array1`, checke for its sorted signature in the `Set` and track the found anagrams
let result = [];
for (let word of array1) {
  let sortedWord = sortCharacters(word);
  if (sortedWordsInArray2.has(sortedWord)) {
    result.push(word);
    anagramsMatched.add(word);
  }
}

// return the list of anagrams found
return result;
