/**
 * LeetCode 567: Permutation in String
 * Pattern: Fixed-Size Sliding Window
 */

function checkInclusion(s1, s2) {
    // Edge case: s1 longer than s2
    if (s1.length > s2.length) return false;
    
    // Create frequency maps
    const s1Freq = new Array(26).fill(0);
    const windowFreq = new Array(26).fill(0);
    
    // Helper function to convert char to index
    const charToIndex = (char) => char.charCodeAt(0) - 'a'.charCodeAt(0);
    
    // Count frequencies in s1 and first window of s2
    for (let i = 0; i < s1.length; i++) {
        s1Freq[charToIndex(s1[i])]++;
        windowFreq[charToIndex(s2[i])]++;
    }
    
    // Check if first window matches
    if (arraysEqual(s1Freq, windowFreq)) return true;
    
    // Slide the window
    for (let i = s1.length; i < s2.length; i++) {
        // Add new character (right side of window)
        windowFreq[charToIndex(s2[i])]++;
        
        // Remove old character (left side of window)
        windowFreq[charToIndex(s2[i - s1.length])]--;
        
        // Check if current window matches
        if (arraysEqual(s1Freq, windowFreq)) return true;
    }
    
    return false;
}

// Helper function to compare frequency arrays
function arraysEqual(arr1, arr2) {
    for (let i = 0; i < 26; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

// Alternative optimized solution using matches counter
function checkInclusionOptimized(s1, s2) {
    if (s1.length > s2.length) return false;
    
    const s1Freq = new Array(26).fill(0);
    const windowFreq = new Array(26).fill(0);
    
    const charToIndex = (char) => char.charCodeAt(0) - 'a'.charCodeAt(0);
    
    // Count s1 frequencies
    for (const char of s1) {
        s1Freq[charToIndex(char)]++;
    }
    
    let matches = 0; // Count of characters with correct frequency
    
    // Process sliding window
    for (let i = 0; i < s2.length; i++) {
        const rightIndex = charToIndex(s2[i]);
        windowFreq[rightIndex]++;
        
        // Check if this character now has correct frequency
        if (windowFreq[rightIndex] === s1Freq[rightIndex]) {
            matches++;
        } else if (windowFreq[rightIndex] === s1Freq[rightIndex] + 1) {
            matches--; // Was correct, now overcounted
        }
        
        // Remove left character if window too large
        if (i >= s1.length) {
            const leftIndex = charToIndex(s2[i - s1.length]);
            
            if (windowFreq[leftIndex] === s1Freq[leftIndex]) {
                matches--;
            } else if (windowFreq[leftIndex] === s1Freq[leftIndex] + 1) {
                matches++;
            }
            
            windowFreq[leftIndex]--;
        }
        
        // Check if all 26 characters have correct frequency
        if (matches === 26) return true;
    }
    
    return false;
}

// Test cases
console.log(checkInclusion("ab", "eidbaooo")); // true
console.log(checkInclusion("ab", "eidboaoo")); // false