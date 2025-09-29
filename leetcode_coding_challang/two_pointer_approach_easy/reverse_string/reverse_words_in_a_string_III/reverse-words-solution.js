/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    // Approach 1: Split, reverse, join
    // Split the string by spaces to get an array of words
    const words = s.split(' ');
    
    // Reverse each word in the array
    for (let i = 0; i < words.length; i++) {
        // Convert word to array, reverse it, and convert back to string
        words[i] = words[i].split('').reverse().join('');
    }
    
    // Join the words back with spaces
    return words.join(' ');
    
    // Approach 2: Character-by-character reversal (commented out)
    /*
    // Convert string to array for easier manipulation
    const chars = s.split('');
    let start = 0;
    
    // Iterate through the string
    for (let i = 0; i <= chars.length; i++) {
        // If we reach a space or the end of the string
        if (i === chars.length || chars[i] === ' ') {
            // Reverse the word from start to current position - 1
            reverseRange(chars, start, i - 1);
            // Update start to the beginning of the next word
            start = i + 1;
        }
    }
    
    // Join the array back into a string and return
    return chars.join('');
    */
};

/**
 * Helper function to reverse characters in an array within a range
 * @param {character[]} chars - Array of characters
 * @param {number} start - Start index
 * @param {number} end - End index
 */
function reverseRange(chars, start, end) {
    while (start < end) {
        // Swap characters at start and end positions
        const temp = chars[start];
        chars[start] = chars[end];
        chars[end] = temp;
        
        // Move pointers towards the center
        start++;
        end--;
    }
}

// Example usage:
console.log(reverseWords("Let's take LeetCode contest")); // "s'teL ekat edoCteeL tsetnoc"
console.log(reverseWords("Mr Ding")); // "rM gniD"
