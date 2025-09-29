/**
 * Simple Implementation
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
function strStr(haystack, needle) {
    // Edge cases
    if (needle.length === 0) return 0;
    if (needle.length > haystack.length) return -1;
    
    // Iterate through potential starting positions in haystack
    for (let i = 0; i <= haystack.length - needle.length; i++) {
        let match = true;
        // Check if substring starting at i matches needle
        for (let j = 0; j < needle.length; j++) {
            if (haystack[i + j] !== needle[j]) {
                match = false;
                break;
            }
        }
        if (match) return i;
    }
    return -1;
}

/**
 * KMP (Knuth-Morris-Pratt) Implementation
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
function strStrKMP(haystack, needle) {
    if (needle.length === 0) return 0;
    if (needle.length > haystack.length) return -1;
    
    // Build the LPS (Longest Proper Prefix which is also Suffix) array
    const lps = buildLPSArray(needle);
    
    let i = 0; // Index for haystack
    let j = 0; // Index for needle
    
    while (i < haystack.length) {
        if (haystack[i] === needle[j]) {
            i++;
            j++;
            if (j === needle.length) {
                return i - j; // Found a match
            }
        } else {
            if (j > 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    return -1;
}

/**
 * Helper function to build LPS array for KMP algorithm
 * @param {string} pattern
 * @return {number[]}
 */
function buildLPSArray(pattern) {
    const lps = new Array(pattern.length).fill(0);
    let len = 0;
    let i = 1;
    
    while (i < pattern.length) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

// Test function
function testStringSearch() {
    const testCases = [
        {
            haystack: "sadbutsad",
            needle: "sad",
            expected: 0
        },
        {
            haystack: "leetcode",
            needle: "leeto",
            expected: -1
        },
        {
            haystack: "hello",
            needle: "ll",
            expected: 2
        },
        {
            haystack: "aaaaa",
            needle: "bba",
            expected: -1
        },
        {
            haystack: "mississippi",
            needle: "issip",
            expected: 4
        }
    ];
    
    console.log("Testing Simple Implementation:");
    for (const {haystack, needle, expected} of testCases) {
        const result = strStr(haystack, needle);
        console.log(`\nHaystack: "${haystack}"`);
        console.log(`Needle: "${needle}"`);
        console.log(`Expected: ${expected}`);
        console.log(`Got: ${result}`);
        console.log(result === expected ? "✓ Test passed" : "✗ Test failed");
    }
    
    console.log("\nTesting KMP Implementation:");
    for (const {haystack, needle, expected} of testCases) {
        const result = strStrKMP(haystack, needle);
        console.log(`\nHaystack: "${haystack}"`);
        console.log(`Needle: "${needle}"`);
        console.log(`Expected: ${expected}`);
        console.log(`Got: ${result}`);
        console.log(result === expected ? "✓ Test passed" : "✗ Test failed");
    }
}

// Run the tests
testStringSearch();
