/**
 * @param {number[]} nums
 * @return {number}
 */
/* HashSet Approach */
function findMaxK(nums) {
    // Create a hash set to store all numbers in the array
    const numSet = new Set(nums);
    
    // Initialize the result to -1 (default return value if no valid number is found)
    let maxK = -1;
    
    // Iterate through each number in the array
    for (const num of nums) {
        // We only need to check positive numbers
        if (num > 0) {
            // Check if its negative counterpart exists in the set
            if (numSet.has(-num)) {
                // Update maxK if this number is larger than the current maximum
                maxK = Math.max(maxK, num);
            }
        }
    }
    
    // Return the largest valid number found, or -1 if none exists
    return maxK;
}

/* Alternative Approach 1: Two-Pass with Single Set */
function findMaxK(nums) {
    const numSet = new Set(nums);
    let maxK = -1;
    
    // Only check positive numbers in the set
    for (const num of numSet) {
        if (num > 0 && numSet.has(-num)) {
            maxK = Math.max(maxK, num);
        }
    }
    
    return maxK;
}

/* Alternative Approach 2: Single-Pass Solution */
function findMaxK(nums) {
    const positives = new Set();
    const negatives = new Set();
    
    // Populate both sets in a single pass
    for (const num of nums) {
        if (num > 0) positives.add(num);
        else negatives.add(num);
    }
    
    let maxK = -1;
    
    // Check each positive number against the negatives set
    for (const num of positives) {
        if (negatives.has(-num)) {
            maxK = Math.max(maxK, num);
        }
    }
    
    return maxK;
}

findMaxK([-1,2,-3,3])
findMaxK([-1,10,6,7,-7,1])
findMaxK([-10,8,6,7,-2,-3])
findMaxK([-9, -43, 24, -23, -16, -30, -38, -30])

/* Two-Pointer Approach */
/**
 * @param {number[]} nums
 * @return {number}
 */
function findMaxK(nums) {
    // Sort the array in ascending order
    nums.sort((a, b) => a - b);
    
    // Initialize pointers
    let left = 0;
    let right = nums.length - 1;
    
    // Initialize result
    let maxK = -1;
    
    // While the pointers haven't crossed
    while (left < right) {
        // Calculate the sum
        const sum = nums[left] + nums[right];
        
        if (sum === 0) {
            // If sum is 0, we found a valid pair
            // Update maxK with the positive number (which is at the right pointer)
            maxK = Math.max(maxK, nums[right]);
            
            // Move both pointers inward to check for more pairs
            left++;
            right--;
        } else if (sum < 0) {
            // If sum is negative, the left value is too small (too negative)
            // Move left pointer to the right to get a less negative value
            left++;
        } else {
            // If sum is positive, the right value is too large
            // Move right pointer to the left to get a smaller positive value
            right--;
        }
    }
    
    return maxK;
}