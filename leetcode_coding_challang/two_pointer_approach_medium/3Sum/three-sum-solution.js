/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums) {
    // Edge case: if array has fewer than 3 elements, return empty array
    if (nums.length < 3) return [];
    
    const result = [];
    
    // Step 1: Sort the array
    nums.sort((a, b) => a - b);
    
    // Step 2: Iterate through the array
    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicate values for i to avoid duplicate triplets
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        // If the current element is positive, all subsequent elements will be positive
        // and we can't form a triplet that sums to zero
        if (nums[i] > 0) break;
        
        // Use two pointers technique to find pairs that sum to -nums[i]
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum < 0) {
                // Sum is too small, increment left pointer
                left++;
            } else if (sum > 0) {
                // Sum is too large, decrement right pointer
                right--;
            } else {
                // Found a triplet that sums to zero
                result.push([nums[i], nums[left], nums[right]]);
                
                // Skip duplicate values for left and right
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                
                // Move both pointers inward
                left++;
                right--;
            }
        }
    }
    
    return result;
}

// Example usage:
console.log(threeSum([-1, 0, 1, 2, -1, -4])); // Output: [[-1, -1, 2], [-1, 0, 1]]
console.log(threeSum([0, 1, 1])); // Output: []
console.log(threeSum([0, 0, 0])); // Output: [[0, 0, 0]]
