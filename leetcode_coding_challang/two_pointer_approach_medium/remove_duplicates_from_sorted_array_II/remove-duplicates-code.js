/**
 * @param {number[]} nums - Input array sorted in non-decreasing order
 * @return {number} - Length of array after removing duplicates (keeping at most 2)
 */
function removeDuplicates(nums) {
    // Handle edge cases
    if (nums.length <= 2) {
        return nums.length; // Already meets our criteria
    }
    
    // Initialize the slow pointer (position to place next element)
    let slow = 2; // Start at 2 because we always keep at least first two elements (if they exist)
    
    // Fast pointer starts at the third element
    for (let fast = 2; fast < nums.length; fast++) {
        // Check if current element is different from the element two positions back
        // If it is, or if it's the same but we've seen it less than twice, we keep it
        if (nums[fast] !== nums[slow - 2]) {
            nums[slow] = nums[fast]; // Place the element at the slow pointer position
            slow++; // Move slow pointer forward
        }
        // If current element is the same as element two positions back,
        // we've already seen it twice, so we skip it
    }
    
    // The slow pointer now points to the position after the last valid element
    // So it represents the new length of the modified array
    return slow;
}

// Example usage:
const example1 = [1, 1, 1, 2, 2, 3];
const k1 = removeDuplicates(example1);
console.log(`Output: ${k1}, nums = [${example1.slice(0, k1).join(',')}${example1.length > k1 ? ',_'.repeat(example1.length - k1) : ''}]`);

const example2 = [0, 0, 1, 1, 1, 1, 2, 3, 3];
const k2 = removeDuplicates(example2);
console.log(`Output: ${k2}, nums = [${example2.slice(0, k2).join(',')}${example2.length > k2 ? ',_'.repeat(example2.length - k2) : ''}]`);
