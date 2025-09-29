/**
 * @param {number[]} nums - Input array sorted in non-decreasing order
 * @param {number} k - Maximum allowed duplicates
 * @return {number} - Length of array after removing duplicates (keeping at most k)
 */
function removeDuplicatesGeneralized(nums, k) {
    // Handle edge cases
    if (nums.length <= k) {
        return nums.length;
    }
    
    let index = k; // Start after the first k elements
    
    // Iterate from the k+1 element
    for (let i = k; i < nums.length; i++) {
        // If current element is different from the element k positions back
        if (nums[i] !== nums[index - k]) {
            nums[index] = nums[i]; // Write current element
            index++;
        }
    }
    
    return index;
}

// Example usage for k=2:
const example1 = [1, 1, 1, 2, 2, 3];
const k1 = removeDuplicatesGeneralized(example1, 2);
console.log(`Output: ${k1}, nums = [${example1.slice(0, k1).join(',')}${example1.length > k1 ? ',_'.repeat(example1.length - k1) : ''}]`);

const example2 = [0, 0, 1, 1, 1, 1, 2, 3, 3];
const k2 = removeDuplicatesGeneralized(example2, 2);
console.log(`Output: ${k2}, nums = [${example2.slice(0, k2).join(',')}${example2.length > k2 ? ',_'.repeat(example2.length - k2) : ''}]`);
