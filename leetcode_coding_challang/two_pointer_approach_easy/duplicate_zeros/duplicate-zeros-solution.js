/**
 * @param {number[]} arr
 * @return {void} Do not return anything, modify arr in-place instead.
 */
function duplicateZeros(arr) {
    // Step 1: Count the number of zeros in the array
    let zeroCount = 0;
    for (let num of arr) {
        if (num === 0) {
            zeroCount++;
        }
    }
    
    // If there are no zeros, no modification needed
    if (zeroCount === 0) return;
    
    // Step 2: Set up two pointers for the array traversal
    const n = arr.length;
    
    // Starting from the end of the array
    let i = n - 1;         // Read pointer (original array position)
    let j = n + zeroCount - 1;  // Write pointer (position after duplicating zeros)
    
    // Step 3: Traverse the array from right to left
    while (i >= 0 && j >= 0) {
        // Copy the current element
        if (arr[i] !== 0) {
            // If j is within bounds of our original array, copy the element
            if (j < n) {
                arr[j] = arr[i];
            }
            // Move both pointers
            i--;
            j--;
        } else {
            // Current element is 0, duplicate it
            
            // Write the first zero (if within bounds)
            if (j < n) {
                arr[j] = 0;
            }
            j--;
            
            // Write the duplicated zero (if within bounds)
            if (j < n) {
                arr[j] = 0;
            }
            j--;
            
            // Move read pointer
            i--;
        }
    }
}

// Test with example
const arr = [1, 0, 2, 3, 0, 4, 5, 0];
console.log("Before:", [...arr]);
duplicateZeros(arr);
console.log("After:", arr);
