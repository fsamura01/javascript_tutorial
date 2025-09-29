/**
 * Find the minimum common value using Binary Search approach
 * @param {number[]} nums1 - First sorted array
 * @param {number[]} nums2 - Second sorted array
 * @return {number} - Minimum common value or -1
 */
var getCommonValue = function(nums1, nums2) {
    // Ensure nums1 is the smaller array for optimization
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    
    // Binary search for each element of the smaller array in the larger array
    for (const num of nums1) {
        if (binarySearch(nums2, num)) {
            return num;
        }
    }
    
    // No common value found
    return -1;
};

/**
 * Perform binary search to find a target in a sorted array
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Value to find
 * @return {boolean} - Whether target exists in array
 */
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        // Calculate middle index
        const mid = Math.floor((left + right) / 2);
        
        // Check if target is found
        if (arr[mid] === target) {
            return true;
        }
        
        // Adjust search boundaries
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    // Target not found
    return false;
}

// Test cases
console.log(getCommonValue([1,2,3], [2,4])); // Output: 2
console.log(getCommonValue([1,2,3,6], [2,3,4,5])); // Output: 2
console.log(getCommonValue([1,2,3], [4,5,6])); // Output: -1
