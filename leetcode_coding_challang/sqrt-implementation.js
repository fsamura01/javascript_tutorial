/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    // Handle edge cases
    if (x === 0) return 0;
    if (x === 1) return 1;
    
    // Initialize binary search boundaries
    let left = 1;
    let right = Math.floor(x / 2);
    
    // Binary search
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        // Calculate square using multiplication
        const square = mid * mid;
        
        if (square === x) {
            // Exact square root found
            return mid;
        } else if (square < x) {
            // If square is less than x, check if (mid + 1)² is greater than x
            // This helps us find the floor value
            const nextSquare = (mid + 1) * (mid + 1);
            if (nextSquare > x) {
                return mid;
            }
            left = mid + 1;
        } else {
            // If square is greater than x, search in lower half
            right = mid - 1;
        }
    }
    
    // This line should never be reached given the constraints
    return right;
};

// Test cases
console.log(mySqrt(4));  // Output: 2
console.log(mySqrt(8));  // Output: 2
console.log(mySqrt(0));  // Output: 0
console.log(mySqrt(1));  // Output: 1
console.log(mySqrt(16)); // Output: 4
console.log(mySqrt(25)); // Output: 5
console.log(mySqrt(26)); // Output: 5
