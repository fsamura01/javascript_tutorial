/**
 * @param {number[]} nums - The input array of integers
 * @param {number} diff - The required difference between consecutive elements
 * @return {number} - The number of arithmetic triplets
 */
/* Hashset Approach */
function arithmeticTriplets(nums, diff) {
    // Create a set to store numbers we've seen
    const seen = new Set();
    
    // Initialize counter for triplets
    let count = 0;
    
    // Iterate through the array
    for (const num of nums) {
        // Check if we can form an arithmetic triplet ending with current number
        if (seen.has(num - diff) && seen.has(num - 2 * diff)) {
            // If both required previous numbers exist, increment counter
            count++;
        }
        
        // Add current number to the set
        seen.add(num);
    }
    
    return count;
}

/* Brute Force Approach */
function arithmeticTripletsNaive(nums, diff) {
    const n = nums.length;
    let count = 0;
    
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (nums[j] - nums[i] === diff) {
                for (let k = j + 1; k < n; k++) {
                    if (nums[k] - nums[j] === diff) {
                        count++;
                    }
                }
            }
        }
    }
    
    return count;
}
/* Binary Search Approach */
function arithmeticTripletsBinarySearch(nums, diff) {
    const n = nums.length;
    let count = 0;
    
    for (let j = 0; j < n; j++) {
        const first = binarySearch(nums, 0, j - 1, nums[j] - diff);
        const third = binarySearch(nums, j + 1, n - 1, nums[j] + diff);
        
        if (first !== -1 && third !== -1) {
            count++;
        }
    }
    
    return count;
}

function binarySearch(nums, left, right, target) {
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}