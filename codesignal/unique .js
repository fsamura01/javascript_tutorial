const uniqueEcho = (words) => {
  let wordsSet = new Set();
  let duplicatesSet = new Set();

  // Iterate over the input array and add words to the wordSet and duplicatesSet.
  for (const word of words) {
    if (wordsSet.has(word)) {
      duplicatesSet.add(word);
    } else {
      wordsSet.add(word);
    }
  }

  // Use a loop to remove all duplicated word from the wordSet
  duplicatesSet.forEach((word) => wordsSet.delete(word));
  // Find the last unique word by iterating through tthe original word list from the end
  let lastUniqueWord = "";
  for (let i = words.length - 1; i >= 0; i--) {
    if (wordsSet.has(words[i])) {
      lastUniqueWord = words[i];
      break;
    }
  }
  return lastUniqueWord;
};

const words = ["X123", "A456", "X123", "B789", "A456", "C111"];

console.log(uniqueEcho(words)); // Output: "abc"
