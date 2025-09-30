/**
 * @param {string} s - The target stretchy string
 * @param {string[]} words - Array of query words to check
 * @return {number} - Count of stretchy words
 */
function expressiveWords(s, words) {
    // Main function that counts how many words can be stretched to match s
    let count = 0;
    
    // Check each word individually to see if it's stretchy
    for (let word of words) {
        if (isStretchy(s, word)) {
            count++;
        }
    }
    
    return count;
}

/**
 * Helper function to determine if a word can be stretched to match target
 * Uses two-pointer technique to compare character groups
 */
function isStretchy(target, word) {
    // Initialize pointers for both strings
    let i = 0; // pointer for target string
    let j = 0; // pointer for word string
    
    // Process both strings character group by character group
    while (i < target.length && j < word.length) {
        // First, verify that the characters at both pointers match
        // If they don't match, this word cannot be stretchy
        if (target[i] !== word[j]) {
            return false;
        }
        
        // Count the size of the character group in target string
        // This tells us how many consecutive identical characters we have
        let targetGroupLength = getGroupLength(target, i);
        
        // Count the size of the character group in word string
        let wordGroupLength = getGroupLength(word, j);
        
        // Now apply the stretching rules to validate this pair of groups
        // Rule 1: If target group is smaller than word group, impossible to stretch
        // We can only add characters, never remove them
        if (targetGroupLength < wordGroupLength) {
            return false;
        }
        
        // Rule 2: If target group is larger but less than 3, also impossible
        // We cannot extend a group to size 2 (minimum extension is to size 3)
        // Exception: if both groups are the same size, no stretching is needed
        if (targetGroupLength > wordGroupLength && targetGroupLength < 3) {
            return false;
        }
        
        // If we've passed both validation checks, this group pair is valid
        // Move both pointers past the current groups to check the next groups
        i += targetGroupLength;
        j += wordGroupLength;
    }
    
    // For the word to be stretchy, both pointers must reach the end simultaneously
    // If one string has remaining characters, the structures don't match
    return i === target.length && j === word.length;
}

/**
 * Helper function to count consecutive identical characters
 * Returns the length of the character group starting at position start
 */
function getGroupLength(str, start) {
    let end = start;
    // Keep advancing while we see the same character
    while (end < str.length && str[end] === str[start]) {
        end++;
    }
    // Return the count of identical characters
    return end - start;
}

// Example usage and testing
console.log(expressiveWords("heeellooo", ["hello", "hi", "helo"])); // Output: 1
console.log(expressiveWords("zzzzzyyyyy", ["zzyy","zy","zyy"])); // Output: 3