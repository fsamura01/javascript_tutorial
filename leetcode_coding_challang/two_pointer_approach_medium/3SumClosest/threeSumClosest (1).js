/**
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target value
 * @return {number} - Sum of three integers closest to target
 */
function threeSumClosest(nums, target) {
    // Initialize variables to keep track of the closest sum
    let closestSum = nums[0] + nums[1] + nums[2]; // Initial sum with first three elements
    let minDifference = Math.abs(closestSum - target); // Initial difference from target
    
    const n = nums.length;
    
    // Brute force approach: check all possible triplets (i, j, k)
    for (let i = 0; i < n - 2; i++) {
        for (let j = i + 1; j < n - 1; j++) {
            for (let k = j + 1; k < n; k++) {
                // Calculate current sum
                const currentSum = nums[i] + nums[j] + nums[k];
                
                // Calculate difference from target
                const currentDifference = Math.abs(currentSum - target);
                
                // Update closestSum if we found a better (closer) sum
                if (currentDifference < minDifference) {
                    minDifference = currentDifference;
                    closestSum = currentSum;
                    
                    // If difference is 0, we found an exact match, can't get better than this
                    if (minDifference === 0) {
                        return closestSum;
                    }
                }
            }
        }
    }
    
    return closestSum;
}

// Test cases
console.log(threeSumClosest([-1, 2, 1, -4], 1)); // Expected output: 2
console.log(threeSumClosest([0, 0, 0], 1));      // Expected output: 0
