/**
 * Find the minimum common value between two sorted arrays
 * @param {number[]} nums1 - First sorted array
 * @param {number[]} nums2 - Second sorted array
 * @return {number} - Minimum common value or -1
 */
var getCommonValue = function(nums1, nums2) {
    // Initialize two pointers
    let i = 0, j = 0;
    
    // Traverse both arrays
    while (i < nums1.length && j < nums2.length) {
        // If current elements are equal, we found the minimum common value
        if (nums1[i] === nums2[j]) {
            return nums1[i];
        }
        
        // Move pointer of array with smaller value
        if (nums1[i] < nums2[j]) {
            i++;
        } else {
            j++;
        }
    }
    
    // No common value found
    return -1;
};

// Example test cases
console.log(getCommonValue([1,2,3], [2,4])); // Output: 2
console.log(getCommonValue([1,2,3,6], [2,3,4,5])); // Output: 2
console.log(getCommonValue([1,2,3], [4,5,6])); // Output: -1
