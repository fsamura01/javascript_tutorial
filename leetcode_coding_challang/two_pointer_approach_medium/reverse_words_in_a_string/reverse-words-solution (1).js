/**
 * Reverses the order of words in a string
 * @param {string} s - Input string
 * @return {string} String with words reversed
 */
function reverseWords(s) {
    // 1. Trim the string and split into words
    // Use regex to split on one or more spaces and filter out empty strings
    const words = s.trim().split(/\s+/);
    
    // 2. Reverse the array of words
    return words.reverse().join(' ');
}

// Test cases
console.log(reverseWords("the sky is blue")); // "blue is sky the"
console.log(reverseWords("  hello world  ")); // "world hello"
console.log(reverseWords("a good   example")); // "example good a"
