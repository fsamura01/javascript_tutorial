/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    // Three pointers approach
    let low = 0;       // boundary for 0s
    let mid = 0;       // current element
    let high = nums.length - 1;  // boundary for 2s
    
    // Single pass sorting
    while (mid <= high) {
        switch(nums[mid]) {
            case 0:
                // Swap current element with low pointer
                [nums[low], nums[mid]] = [nums[mid], nums[low]];
                low++;
                mid++;
                break;
            case 1:
                // Just move mid pointer forward
                mid++;
                break;
            case 2:
                // Swap current element with high pointer
                [nums[mid], nums[high]] = [nums[high], nums[mid]];
                high--;
                break;
        }
    }
};

// Test cases
console.log("Test Case 1:");
let nums1 = [2,0,2,1,1,0];
sortColors(nums1);
console.log(nums1);  // Expected: [0,0,1,1,2,2]

console.log("Test Case 2:");
let nums2 = [2,0,1];
sortColors(nums2);
console.log(nums2);  // Expected: [0,1,2]
