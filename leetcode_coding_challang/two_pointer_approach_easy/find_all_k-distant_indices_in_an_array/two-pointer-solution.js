/**
 * @param {number[]} nums - Input array
 * @param {number} key - Target value to find
 * @param {number} k - Maximum distance allowed
 * @return {number[]} - Array of k-distant indices
 */
var findKDistantIndices = function(nums, key, k) {
    // First, collect all indices where nums[j] == key
    const keyIndices = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === key) {
            keyIndices.push(i);
        }
    }
    
    // Initialize result array and pointers
    const result = [];
    let currentIndex = 0;  // Tracks current position in nums
    let keyPtr = 0;        // Tracks which key index we're processing
    
    // Process all indices
    while (currentIndex < nums.length && keyPtr < keyIndices.length) {
        // Calculate distance to current key index
        const distance = Math.abs(currentIndex - keyIndices[keyPtr]);
        
        if (distance <= k) {
            // Current index is within k distance of current key
            result.push(currentIndex);
            currentIndex++;
        } else if (currentIndex < keyIndices[keyPtr]) {
            // Current index is too far left of key index
            currentIndex++;
        } else {
            // Current index is too far right of key index
            // Move to next key index
            keyPtr++;
        }
    }
    
    return result;
};

// Example usage and test cases
const testCases = [
    {
        nums: [3,4,9,1,3,9,5],
        key: 9,
        k: 1
    },
    {
        nums: [2,2,2,2,2],
        key: 2,
        k: 2
    }
];

for (const test of testCases) {
    console.log(`Input: nums = [${test.nums}], key = ${test.key}, k = ${test.k}`);
    console.log(`Output: [${findKDistantIndices(test.nums, test.key, test.k)}]`);
    console.log('---');
}
