/**
 * Compare Version Numbers - LeetCode 165
 * 
 * This solution uses the two-pointer approach to compare version strings
 * by parsing revisions and handling different lengths gracefully.
 */

function compareVersion(version1, version2) {
    // Split both versions into arrays of revision strings
    const revisions1 = version1.split('.');
    const revisions2 = version2.split('.');
    
    // Get the maximum length to ensure we compare all revisions
    const maxLength = Math.max(revisions1.length, revisions2.length);
    
    // Compare each revision position
    for (let i = 0; i < maxLength; i++) {
        // Get current revision or default to 0 if array is shorter
        // parseInt automatically handles leading zeros
        const rev1 = i < revisions1.length ? parseInt(revisions1[i]) : 0;
        const rev2 = i < revisions2.length ? parseInt(revisions2[i]) : 0;
        
        // Compare the integer values
        if (rev1 < rev2) {
            return -1;
        } else if (rev1 > rev2) {
            return 1;
        }
        // If equal, continue to next revision
    }
    
    // All revisions are equal
    return 0;
}

// Alternative implementation using two pointers explicitly
function compareVersionTwoPointers(version1, version2) {
    const revisions1 = version1.split('.');
    const revisions2 = version2.split('.');
    
    let i = 0, j = 0;
    
    // Continue until we've processed all revisions from both versions
    while (i < revisions1.length || j < revisions2.length) {
        // Get current revision or 0 if we've exhausted this version
        const rev1 = i < revisions1.length ? parseInt(revisions1[i]) : 0;
        const rev2 = j < revisions2.length ? parseInt(revisions2[j]) : 0;
        
        if (rev1 < rev2) return -1;
        if (rev1 > rev2) return 1;
        
        // Move both pointers forward
        i++;
        j++;
    }
    
    return 0;
}

// Test cases to verify our solution
console.log(compareVersion("1.2", "1.10"));      // Expected: -1
console.log(compareVersion("1.01", "1.001"));    // Expected: 0
console.log(compareVersion("1.0", "1.0.0.0"));   // Expected: 0
console.log(compareVersion("1.0.1", "1"));       // Expected: 1