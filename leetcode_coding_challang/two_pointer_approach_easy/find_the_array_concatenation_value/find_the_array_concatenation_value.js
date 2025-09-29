/**
 * @param {number[]} nums
 * @return {number}
 */
function findTheArrayConcVal(nums) {
    let result = 0;
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        // If there's only one element left (odd-length array)
        if (left === right) {
            result += nums[left];
            break;
        }
        
        // Concatenate the numbers as strings, then convert back to number
        const concatenated = parseInt(nums[left].toString() + nums[right].toString());
        result += concatenated;
        
        // Move pointers inward
        left++;
        right--;
    }
    
    return result;
}

var findTheArrayConcVal = function(nums) {
    let left = 0, right = nums.length - 1;
    let sum = 0;
    
    while (left < right) {
        // Concatenating first and last element
        let concatValue = parseInt(nums[left].toString() + nums[right].toString());
        sum += concatValue;
        left++;
        right--;
    }
    
    // If an element is left in the middle (odd length case)
    if (left === right) {
        sum += nums[left];
    }
    
    return sum;
};

/* Using a Queue (Less Efficient) */
var findTheArrayConcVal = function(nums) {
    let sum = 0;
    while (nums.length > 1) {
        let concatValue = parseInt(nums.shift().toString() + nums.pop().toString());
        sum += concatValue;
    }
    if (nums.length === 1) sum += nums[0];
    return sum;
};
