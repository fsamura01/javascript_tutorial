/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function(s, t) {
    // Helper function to get the next valid character index
    const getNextValidChar = (str, index) => {
        let backspaceCount = 0;
        
        // Move backwards, counting backspaces
        while (index >= 0) {
            if (str[index] === '#') {
                backspaceCount++;
            } else if (backspaceCount > 0) {
                // Skip this character due to backspaces
                backspaceCount--;
            } else {
                // Found a valid character to compare
                break;
            }
            index--;
        }
        
        return index;
    };
    
    // Start from the end of both strings
    let i = s.length - 1;
    let j = t.length - 1;
    
    while (i >= 0 || j >= 0) {
        // Find next valid characters in both strings
        i = getNextValidChar(s, i);
        j = getNextValidChar(t, j);
        
        // Compare characters
        if (i >= 0 && j >= 0 && s[i] !== t[j]) {
            return false;
        }
        
        // Check if we've reached the beginning of one string but not the other
        if ((i >= 0) !== (j >= 0)) {
            return false;
        }
        
        // Move to previous characters
        i--;
        j--;
    }
    
    // Strings are equivalent after processing
    return true;
};

// Test cases
console.log(backspaceCompare("ab#c", "ad#c")); // true
console.log(backspaceCompare("ab##", "c#d#")); // true
console.log(backspaceCompare("a#c", "b")); // false
