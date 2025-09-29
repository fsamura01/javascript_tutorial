/*
"The Kth smallest pair distance" refers to finding the absolute 
difference between two elements within an array, 
where the pair of elements that creates this difference is the Kth 
smallest pair when all possible pairs are considered in ascending order 
of their distance (absolute difference) - essentially, it's finding the 
Kth smallest "gap" between any two elements in the array. 
Key points about the Kth smallest pair distance: 

Pair definition:
Only pairs where the first element comes before the second in the array 
are considered to avoid counting the same distance twice. 

Distance calculation:
The distance between a pair (a, b) is calculated as the absolute difference 
between their values: |a - b|. 
Finding the Kth smallest:
To find the Kth smallest pair distance, you need to sort all possible pair 
distances in ascending order and then retrieve the element at index K-1.

How to solve it: 
Brute Force:
Generate all possible pairs of elements from the array.
Calculate the absolute difference for each pair.
Sort the calculated distances in ascending order.
Return the Kth smallest distance from the sorted list.

Optimized approach (using sorting and binary search):
Sort the original array in ascending order.
Use a binary search to find the Kth smallest distance by:
Initialize a low and high bound for the possible distance range (minimum and maximum difference in the array).
For a given mid-point distance, count the number of pairs with a distance smaller than or equal to the mid-point.
Adjust the low or high bound depending on whether the count is less than K or greater than K. 

Example: 
Consider the array nums = [1, 3, 1] and K = 1. 
Possible pairs and their distances: 
(1, 3) -> 2 
(1, 1) -> 0 
(3, 1) -> 2 
The Kth smallest distance (K = 1) is 0. 
*/

function smallestDistancePair(nums, k) {
  // Step 1: Sort the array
  nums.sort((a, b) => a - b);

  // Step 2: Binary search on the distance
  let low = 0;
  let high = nums[nums.length - 1] - nums[0];

  while (low < high) {
    let mid = Math.floor((low + high) / 2);

    // Step 3: Use sliding window to count pairs with distance <= mid
    let count = 0;
    let j = 0;
    for (let i = 0; i < nums.length; i++) {
      while (j < nums.length && nums[j] - nums[i] <= mid) {
        j++;
      }
      count += j - i - 1;
    }

    // Step 4: Adjust search range
    if (count >= k) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return low;
}

// Example usage:
const nums = [1, 3, 1];
const k = 1;
console.log(smallestDistancePair(nums, k)); // Output: 0
