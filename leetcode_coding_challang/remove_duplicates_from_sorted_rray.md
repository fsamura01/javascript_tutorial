# **26. Remove Duplicates from Sorted Array**

<!--To solve this problem, I'll help you identify
the key pattern and develop a solution in JavaScript.
Let's break down the problem and analyze the pattern:-->

## **Key Observations:**

1. The array is already sorted in non-decreasing order
2. We need to remove duplicates in-place
3. We want to keep the relative order of unique elements
4. We should modify the array such that unique elements are at the beginning

## **The key pattern here is a two-pointer approach:**

- One pointer (slow) to track the position where unique elements should be placed
- Another pointer (fast) to iterate through the array and find unique elements

## **Here's a solution that implements this pattern:**

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  // If the array is empty, return 0
  if (nums.length === 0) return 0;

  // Slow pointer starts at the first element
  let k = 1;

  // Fast pointer starts from the second element
  for (let i = 1; i < nums.length; i++) {
    // If current element is different from the previous unique element
    if (nums[i] !== nums[k - 1]) {
      // Place the unique element at the slow pointer position
      nums[k] = nums[i];
      // Move the slow pointer forward
      k++;
    }
  }

  // Return the number of unique elements
  return k;
};
```

## **Let's break down the pattern and solution:**

1. Pattern Analysis:

   - Use two pointers: a slow pointer `k` and a fast pointer `i`
   - `k` represents the position where the next unique element should be placed
   - `i` iterates through the array to find unique elements

2. How the Solution Works:

   - Start `k` at 1 (first element is always unique)
   - Iterate through the array starting from the second element
   - Compare each element with the last unique element (at `nums[k-1]`)
   - If different, it's a unique element:
     - Place it at the `k` position
     - Increment `k`
   - Return `k`, which is the count of unique elements

3. Time and Space Complexity:
   - Time Complexity: O(n), where n is the length of the array
   - Space Complexity: O(1), as we modify the array in-place

## **Example Walkthrough:**

1. For `nums = [0,0,1,1,1,2,2,3,3,4]`:

- First iteration: 0 is already at the first position
- `k` becomes 1 when first unique element (1) is found
- 2 is placed at index 2
- 3 is placed at index 3
- 4 is placed at index 4
- Final array: `[0,1,2,3,4,_,_,_,_,_]`
- Returns `k = 5`

## **This solution elegantly handles the problem by:**

- Preserving the order of unique elements
- Modifying the array in-place
- Returning the count of unique elements
