/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    // Normalize k to handle cases where k > nums.length
    k = k % nums.length;
    
    // If k is 0 or array has only one element, no rotation needed
    if (k === 0 || nums.length <= 1) return;
    
    // Helper function to reverse part of the array
    const reverse = (arr, start, end) => {
        while (start < end) {
            [arr[start], arr[end]] = [arr[end], arr[start]];
            start++;
            end--;
        }
    };
    
    // Step 1: Reverse the entire array
    reverse(nums, 0, nums.length - 1);
    
    // Step 2: Reverse the first k elements
    reverse(nums, 0, k - 1);
    
    // Step 3: Reverse the remaining elements
    reverse(nums, k, nums.length - 1);
};

// Example usage
let nums1 = [1,2,3,4,5,6,7];
rotate(nums1, 3);
console.log(nums1); // Expected: [5,6,7,1,2,3,4]

let nums2 = [-1,-100,3,99];
rotate(nums2, 2);
console.log(nums2); // Expected: [3,99,-1,-100]
