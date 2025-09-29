// LeetCode 611: Valid Triangle Number - JavaScript Solutions

// Approach 1: Brute Force - O(n³)
function triangleNumberBruteForce(nums) {
    const n = nums.length;
    let count = 0;
    
    // Try all possible triplets
    for (let i = 0; i < n - 2; i++) {
        for (let j = i + 1; j < n - 1; j++) {
            for (let k = j + 1; k < n; k++) {
                // Check if three sides can form a triangle
                const a = nums[i], b = nums[j], c = nums[k];
                if (a + b > c && a + c > b && b + c > a) {
                    count++;
                }
            }
        }
    }
    
    return count;
}

// Approach 2: Optimized Two Pointers - O(n²)
function triangleNumber(nums) {
    const n = nums.length;
    if (n < 3) return 0;
    
    // Step 1: Sort the array
    nums.sort((a, b) => a - b);
    
    let count = 0;
    
    // Step 2: Fix the largest side (iterate from right to left)
    for (let k = n - 1; k >= 2; k--) {
        let left = 0;
        let right = k - 1;
        
        // Step 3: Use two pointers to find valid combinations
        while (left < right) {
            // Check if current combination forms a valid triangle
            if (nums[left] + nums[right] > nums[k]) {
                // All combinations from (left, left+1, ..., right-1) 
                // with nums[right] are valid
                count += right - left;
                right--; // Try smaller right value
            } else {
                // Sum too small, need larger left value
                left++;
            }
        }
    }
    
    return count;
}

// Test cases
console.log("Test Case 1:");
console.log("Input: [2,2,3,4]");
console.log("Brute Force:", triangleNumberBruteForce([2,2,3,4])); // 3
console.log("Optimized:", triangleNumber([2,2,3,4])); // 3

console.log("\nTest Case 2:");
console.log("Input: [4,2,3,4]");
console.log("Brute Force:", triangleNumberBruteForce([4,2,3,4])); // 4
console.log("Optimized:", triangleNumber([4,2,3,4])); // 4

console.log("\nEdge Cases:");
console.log("Input: [1,1,1]");
console.log("Result:", triangleNumber([1,1,1])); // 1

console.log("Input: [0,1,1,1]");
console.log("Result:", triangleNumber([0,1,1,1])); // 1