/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
function removeElement(nums, val) {
    // Edge case: if array is empty
    if (nums.length === 0) {
        return 0;
    }
    
    // Initialize two pointers
    let k = 0; // pointer for next position to place non-val element
    
    // Iterate through the array
    for (let i = 0; i < nums.length; i++) {
        // If current element is not val, place it at position k
        if (nums[i] !== val) {
            nums[k] = nums[i];
            k++;
        }
    }
    
    return k;
}

// Test helper function to validate the solution
function testRemoveElement() {
    const testCases = [
        {
            nums: [3, 2, 2, 3],
            val: 3,
            expectedK: 2,
            expectedNums: [2, 2]
        },
        {
            nums: [0, 1, 2, 2, 3, 0, 4, 2],
            val: 2,
            expectedK: 5,
            expectedNums: [0, 1, 3, 0, 4]
        },
        {
            nums: [],
            val: 1,
            expectedK: 0,
            expectedNums: []
        },
        {
            nums: [1],
            val: 1,
            expectedK: 0,
            expectedNums: []
        },
        {
            nums: [1],
            val: 2,
            expectedK: 1,
            expectedNums: [1]
        }
    ];
    
    for (let i = 0; i < testCases.length; i++) {
        const { nums: originalNums, val, expectedK, expectedNums } = testCases[i];
        console.log(`\nTest Case ${i + 1}:`);
        
        // Create a copy of input for testing
        const nums = [...originalNums];
        console.log('Input array:', nums);
        console.log('Value to remove:', val);
        
        // Call the function
        const k = removeElement(nums, val);
        
        // Get the first k elements and sort them for comparison
        const resultElements = nums.slice(0, k).sort((a, b) => a - b);
        const expectedSorted = [...expectedNums].sort((a, b) => a - b);
        
        console.log('Output:', k);
        console.log('Modified array (first k elements):', nums.slice(0, k));
        
        // Validate the result
        if (k === expectedK && 
            JSON.stringify(resultElements) === JSON.stringify(expectedSorted)) {
            console.log('✓ Test passed');
        } else {
            console.log('✗ Test failed');
            console.log('Expected k:', expectedK);
            console.log('Expected elements (sorted):', expectedSorted);
        }
    }
}

// Run the tests
testRemoveElement();
