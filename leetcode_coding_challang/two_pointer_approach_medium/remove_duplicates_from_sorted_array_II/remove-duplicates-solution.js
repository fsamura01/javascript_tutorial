/**
 * Remove Duplicates from Sorted Array II
 * Time Complexity: O(n) - single pass through array
 * Space Complexity: O(1) - only using constant extra variables
 * 
 * @param {number[]} nums - sorted array in non-decreasing order
 * @return {number} - length of array after removing excess duplicates
 */
function removeDuplicates(nums) {
    // Edge case: empty array or single element
    if (nums.length <= 2) {
        return nums.length;
    }
    
    // writeIndex: points to where we should place the next valid element
    // We start at index 2 because first two elements are always valid
    let writeIndex = 2;
    
    // Iterate through array starting from index 2
    // We compare current element with element two positions back
    for (let i = 2; i < nums.length; i++) {
        // Key insight: if current element is different from element
        // two positions back in our result array, it's safe to include
        // This automatically handles the "at most 2 duplicates" rule
        if (nums[i] !== nums[writeIndex - 2]) {
            // Place current element at write position
            nums[writeIndex] = nums[i];
            // Move write pointer forward
            writeIndex++;
        }
        // If nums[i] === nums[writeIndex - 2], we skip this element
        // because including it would create a third duplicate
    }
    
    return writeIndex;
}

/**
 * Alternative implementation with explicit counting
 * This approach is more intuitive but slightly more verbose
 */
function removeDuplicatesWithCounter(nums) {
    if (nums.length <= 2) {
        return nums.length;
    }
    
    let writeIndex = 1; // Position to write next valid element
    let count = 1;      // Count of current element occurrences
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) {
            // Same element as previous
            count++;
        } else {
            // New element found
            count = 1;
        }
        
        // Only write if we haven't exceeded limit of 2
        if (count <= 2) {
            nums[writeIndex] = nums[i];
            writeIndex++;
        }
    }
    
    return writeIndex;
}

// Test cases to verify our solution
function testSolution() {
    console.log("Testing Remove Duplicates Solution:");
    
    // Test Case 1: Example from problem
    let test1 = [1, 1, 1, 2, 2, 3];
    let result1 = removeDuplicates(test1);
    console.log(`Test 1: [${test1.slice(0, result1)}], length: ${result1}`);
    // Expected: [1, 1, 2, 2, 3], length: 5
    
    // Test Case 2: Second example
    let test2 = [0, 0, 1, 1, 1, 1, 2, 3, 3];
    let result2 = removeDuplicates(test2);
    console.log(`Test 2: [${test2.slice(0, result2)}], length: ${result2}`);
    // Expected: [0, 0, 1, 1, 2, 3, 3], length: 7
    
    // Test Case 3: Edge case - all same elements
    let test3 = [1, 1, 1, 1, 1];
    let result3 = removeDuplicates(test3);
    console.log(`Test 3: [${test3.slice(0, result3)}], length: ${result3}`);
    // Expected: [1, 1], length: 2
    
    // Test Case 4: No duplicates
    let test4 = [1, 2, 3, 4, 5];
    let result4 = removeDuplicates(test4);
    console.log(`Test 4: [${test4.slice(0, result4)}], length: ${result4}`);
    // Expected: [1, 2, 3, 4, 5], length: 5
}

// Uncomment to run tests
// testSolution();