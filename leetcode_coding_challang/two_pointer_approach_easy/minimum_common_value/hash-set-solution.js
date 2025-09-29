/**
 * Find the minimum common value using Hash Set approach
 * @param {number[]} nums1 - First array
 * @param {number[]} nums2 - Second array
 * @return {number} - Minimum common value or -1
 */
var getCommonValue = function(nums1, nums2) {
    // Create a hash set from the first array for O(1) lookup
    const nums1Set = new Set(nums1);
    
    // Track the minimum common value
    let minCommon = Infinity;
    
    // Iterate through the second array
    for (const num of nums2) {
        // Check if the current number exists in the first array's set
        if (nums1Set.has(num)) {
            // Update minimum common value if found
            minCommon = Math.min(minCommon, num);
        }
    }
    
    // Return minimum common value or -1 if no common value found
    return minCommon === Infinity ? -1 : minCommon;
};

// Test cases
console.log(getCommonValue([1,2,3], [2,4])); // Output: 2
console.log(getCommonValue([1,2,3,6], [2,3,4,5])); // Output: 2
console.log(getCommonValue([1,2,3], [4,5,6])); // Output: -1
