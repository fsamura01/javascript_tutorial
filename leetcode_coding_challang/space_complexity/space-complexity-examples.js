// 1. O(1) - Constant Space
function findMax(arr) {
    // Uses only a few variables, regardless of input size
    let max = arr[0];
    for (let num of arr) {
        if (num > max) {
            max = num;
        }
    }
    return max;
}

// 2. O(n) - Linear Space
function createCopy(arr) {
    // Creates a new array of the same size as input
    return [...arr];
}

// 3. O(n²) - Quadratic Space
function create2DMatrix(n) {
    // Creates a 2D array where space grows quadratically
    const matrix = [];
    for (let i = 0; i < n; i++) {
        matrix[i] = new Array(n).fill(0);
    }
    return matrix;
}

// 4. Recursive Space Complexity
function recursiveFibonacci(n) {
    // Space complexity is O(n) due to call stack
    if (n <= 1) return n;
    return recursiveFibonacci(n - 1) + recursiveFibonacci(n - 2);
}

// 5. Complex Space Usage
function processData(arr) {
    // Mixed space complexity scenario
    const seen = new Set(); // Additional O(n) space
    const result = [];      // Another O(n) space
    
    for (let num of arr) {
        if (!seen.has(num)) {
            seen.add(num);
            result.push(num);
        }
    }
    
    return result;
}
