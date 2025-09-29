/**
 * @param {number[]} nums
 * @return {number}
 */
var distinctAverages = function(nums) {
    // 1. Sort the array in ascending order
    nums.sort((a, b) => a - b);
    
    // 2. Create a Set to store unique averages
    const averageSet = new Set();
    
    // 3. Use two pointers to generate averages
    let left = 0;
    let right = nums.length - 1;
    
    // Continue until pointers cross
    while (left < right) {
        // Calculate average of smallest and largest current elements
        const average = (nums[left] + nums[right]) / 2;
        
        // Add to set (duplicates automatically eliminated)
        averageSet.add(average);
        
        // Move pointers towards center
        left++;
        right--;
    }
    
    // 4. Return the number of unique averages
    return averageSet.size;
};

// Example usage
console.log(distinctAverages([4,1,4,0,3,5])); // Expected output: 2
console.log(distinctAverages([1,100])); // Expected output: 1
