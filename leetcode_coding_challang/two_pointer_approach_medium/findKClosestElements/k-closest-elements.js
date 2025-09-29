/**
 * Find k closest elements to x in a sorted array
 * @param {number[]} arr - Sorted input array
 * @param {number} k - Number of elements to return
 * @param {number} x - Target value
 * @return {number[]} k closest elements
 */
var findClosestElements = function(arr, k, x) {
    // Start with full window at the beginning
    let left = 0;
    let right = arr.length - k;
    
    // Binary search to find optimal window
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        
        // Compare distances at window boundaries
        // If x is closer to left side's right boundary, 
        // shift window left
        if (x - arr[mid] > arr[mid + k] - x) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    // Return the k-length subarray starting at left
    return arr.slice(left, left + k);
};

// Test cases
console.log(findClosestElements([1,2,3,4,5], 4, 3));  // [1,2,3,4]
console.log(findClosestElements([1,1,2,3,4,5], 4, -1));  // [1,1,2,3]
