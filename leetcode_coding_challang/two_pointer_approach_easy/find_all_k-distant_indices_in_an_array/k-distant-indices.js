/**
 * @param {number[]} nums - Input array
 * @param {number} key - Target value to find
 * @param {number} k - Maximum distance allowed
 * @return {number[]} - Array of k-distant indices
 */
var findKDistantIndices = function(nums, key, k) {
    // Step 1: Find all indices where nums[j] == key
    const keyIndices = [];
    for (let j = 0; j < nums.length; j++) {
        if (nums[j] === key) {
            keyIndices.push(j);
        }
    }
    
    // Step 2: Use Set to store unique valid indices
    const validIndices = new Set();
    
    // Step 3: For each key index, add all indices within range k
    for (const j of keyIndices) {
        // Calculate valid range: [max(0, j-k), min(n-1, j+k)]
        const start = Math.max(0, j - k);
        const end = Math.min(nums.length - 1, j + k);
        
        // Add all indices in range to set
        for (let i = start; i <= end; i++) {
            validIndices.add(i);
        }
    }
    
    // Step 4: Convert set to sorted array
    return Array.from(validIndices).sort((a, b) => a - b);
};

// Example usage:
const nums = [3,4,9,1,3,9,5];
const key = 9;
const k = 1;
console.log(findKDistantIndices(nums, key, k)); // [1,2,3,4,5]
