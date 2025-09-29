/**
 * @param {number[]} nums - The input array of integers
 * @param {number} target - The target sum to get close to
 * @return {number} - The sum of three integers closest to target
 */
function threeSumClosest(nums, target) {
    // Sort the array to enable two-pointer approach
    nums.sort((a, b) => a - b);
    
    // Initialize variables
    const n = nums.length;
    let closestSum = nums[0] + nums[1] + nums[2]; // Start with first three elements
    
    // Loop through the array for the first number
    for (let i = 0; i < n - 2; i++) {
        // Skip duplicates for the first position to avoid redundant calculations
        if (i > 0 && nums[i] === nums[i-1]) continue;
        
        // Initialize two pointers for the remaining two numbers
        let left = i + 1;
        let right = n - 1;
        
        while (left < right) {
            // Calculate current sum of three numbers
            const currentSum = nums[i] + nums[left] + nums[right];
            
            // If we found exact match, return it immediately
            if (currentSum === target) {
                return currentSum;
            }
            
            // Update closestSum if current sum is closer to target
            if (Math.abs(currentSum - target) < Math.abs(closestSum - target)) {
                closestSum = currentSum;
            }
            
            // Adjust pointers based on comparison with target
            if (currentSum < target) {
                left++; // Increase sum by moving left pointer right
                
                // Skip duplicates from left
                while (left < right && nums[left] === nums[left - 1]) {
                    left++;
                }
            } else {
                right--; // Decrease sum by moving right pointer left
                
                // Skip duplicates from right
                while (left < right && nums[right] === nums[right + 1]) {
                    right--;
                }
            }
        }
    }
    
    return closestSum;
}