/**
 * @param {number[]} arr
 * @return {boolean}
 */
var checkIfExist = function(arr) {
    // Create a hash set to track numbers we've seen
    const seen = new Set();
    
    // Track if we've seen zero before (special case)
    let zeroCount = 0;
    
    for (let num of arr) {
        // Count zeros separately
        if (num === 0) {
            zeroCount++;
            // If we've seen more than one zero, return true (0 * 2 = 0)
            if (zeroCount > 1) return true;
            continue;
        }
        
        // Check if double of current number exists in set
        if (seen.has(num * 2)) return true;
        
        // Check if half of current number exists in set
        // Only check for even numbers since we need integers
        if (num % 2 === 0 && seen.has(num / 2)) return true;
        
        // Add current number to set
        seen.add(num);
    }
    
    // If no such pair found, return false
    return false;
};
