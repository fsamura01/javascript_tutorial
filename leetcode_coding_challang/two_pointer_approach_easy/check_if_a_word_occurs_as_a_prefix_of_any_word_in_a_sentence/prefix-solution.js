/**
 * @param {string} sentence - A string of words separated by spaces
 * @param {string} searchWord - The word to search for as a prefix
 * @return {number} - 1-indexed position of the first matching word, or -1 if not found
 */
var isPrefixOfWord = function(sentence, searchWord) {
    // Split the sentence into an array of words
    const words = sentence.split(' ');
    
    // Iterate through each word
    for (let i = 0; i < words.length; i++) {
        // Check if the current word starts with the searchWord
        if (words[i].startsWith(searchWord)) {
            // Return 1-indexed position (i + 1)
            return i + 1;
        }
    }
    
    // If no match is found, return -1
    return -1;
};

// Example test cases
console.log(isPrefixOfWord("i love eating burger", "burg")); // Output: 4
console.log(isPrefixOfWord("this problem is an easy problem", "pro")); // Output: 2
console.log(isPrefixOfWord("i am tired", "you")); // Output: -1
