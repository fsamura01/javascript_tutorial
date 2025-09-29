/**
 * @param {string} sentence - A string of words separated by spaces
 * @param {string} searchWord - The word to search for as a prefix
 * @return {number} - 1-indexed position of the first matching word, or -1 if not found
 */
var isPrefixOfWord = function(sentence, searchWord) {
    let wordCount = 1; // Start from the first word (1-indexed)
    let wordStart = 0; // Track the start of each word
    
    // Add a space at the end to simplify boundary checking
    sentence = sentence + ' ';
    
    for (let i = 0; i < sentence.length; i++) {
        // Check if we've reached a word boundary or the end of sentence
        if (sentence[i] === ' ') {
            // Get the current word
            const currentWord = sentence.substring(wordStart, i);
            
            // Check if the current word starts with the searchWord
            if (currentWord.startsWith(searchWord)) {
                return wordCount;
            }
            
            // Update for the next word
            wordStart = i + 1;
            wordCount++;
        }
    }
    
    // If no match is found, return -1
    return -1;
};

// Example test cases
console.log(isPrefixOfWord("i love eating burger", "burg")); // Output: 4
console.log(isPrefixOfWord("this problem is an easy problem", "pro")); // Output: 2
console.log(isPrefixOfWord("i am tired", "you")); // Output: -1
