// Approach Comparison: Finding Minimum Common Value

// 1. Two-Pointer Method (Sorted Arrays)
// Best for: Minimal space complexity, sorted arrays
function twoPointerSolution(nums1, nums2) {
    let i = 0, j = 0;
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] === nums2[j]) return nums1[i];
        nums1[i] < nums2[j] ? i++ : j++;
    }
    return -1;
}

// 2. Hash Set Method (Flexible, Unsorted Arrays)
// Best for: Unsorted arrays, when memory isn't a constraint
function hashSetSolution(nums1, nums2) {
    const set = new Set(nums1);
    return nums2.find(num => set.has(num)) || -1;
}

// 3. Binary Search Method (Logarithmic Search)
// Best for: Large sorted arrays, when reducing search space
function binarySearchSolution(nums1, nums2) {
    // Ensure smaller array is first
    if (nums1.length > nums2.length) 
        [nums1, nums2] = [nums2, nums1];
    
    // Binary search each element
    for (const num of nums1) {
        if (binarySearch(nums2, num)) return num;
    }
    return -1;
}

// Helper Binary Search Function
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return true;
        arr[mid] < target ? left = mid + 1 : right = mid - 1;
    }
    return false;
}

// Performance Characteristics:
// - Two-Pointer: O(m+n) time, O(1) space
// - Hash Set: O(m+n) time, O(m) space
// - Binary Search: O(m*log(n)) time, O(1) space
