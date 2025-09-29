/**
 * LeetCode 2460: Apply Operations to an Array
 * @param {number[]} nums - Input array of integers
 * @return {number[]} - Modified array after operations
 */
var applyOperations = function(nums) {
    // Step 1: Merging Phase
    for (let i = 0; i < nums.length - 1; i++) {
        // If current and next elements are equal
        if (nums[i] === nums[i + 1]) {
            // Double the current element
            nums[i] *= 2;
            // Set next element to zero
            nums[i + 1] = 0;
        }
    }
    
    // Step 2: Shifting Phase
    const result = [];
    
    // Collect non-zero elements
    for (const num of nums) {
        if (num !== 0) {
            result.push(num);
        }
    }
    
    // Pad with zeros to maintain original length
    while (result.length < nums.length) {
        result.push(0);
    }
    
    return result;
};

// Example usage
console.log(applyOperations([1,2,2,1,1,0])); // Expected output: [1,4,2,0,0,0]
console.log(applyOperations([0,1])); // Expected output: [1,0]
