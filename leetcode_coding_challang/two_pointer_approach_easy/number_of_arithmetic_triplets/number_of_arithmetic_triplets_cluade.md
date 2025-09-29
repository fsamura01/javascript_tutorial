# LeetCode 2367: Number of Arithmetic Triplets

## 1. Problem Understanding

Let me start by explaining the problem in simple terms:

We're given an array of integers called `nums` and a positive integer `diff`. Our goal is to find the number of "arithmetic triplets" in the array.

An arithmetic triplet is defined as three indices (i, j, k) where:

- i < j < k (the indices are in strictly increasing order)
- nums[j] - nums[i] = diff (the difference between the second and first number equals diff)
- nums[k] - nums[j] = diff (the difference between the third and second number equals diff)

In other words, we need to find how many sets of three numbers exist in our array where the numbers form an arithmetic sequence with a common difference of exactly `diff`.

### Constraints

- 3 ≤ nums.length ≤ 200
- 0 ≤ nums[i] ≤ 200
- 1 ≤ diff ≤ 50
- The array `nums` is strictly increasing (which means all numbers are unique)

### Example

If `nums = [0,1,4,6,7,10]` and `diff = 3`, we have two arithmetic triplets:

1. (0,4,7) - The values at these indices are [0,4,7], and we can see that 4-0=3 and 7-4=3
2. (1,4,10) - The values are [1,4,10], and we see that 4-1=3 and 10-4=6 (this doesn't work because 6≠3)

Hmm, let me double-check this example...

Actually, the triplets should be:

1. (0,3,4) - The values are [0,6,9], and we see that 6-0=6 and 9-6=3 (doesn't work)
2. (1,2,5) - The values are [1,4,10], and 4-1=3 and 10-4=6 (doesn't work)

Let me verify once more with the example values: [0,1,4,6,7,10] with diff=3

The triplets should be:

1. (0,2,4) - The values are [0,4,7], and 4-0=4 and 7-4=3 (doesn't work)
2. (1,2,4) - The values are [1,4,7], and 4-1=3 and 7-4=3 (this works!)
3. (2,3,5) - The values are [4,6,10], and 6-4=2 and 10-6=4 (doesn't work)

It seems I've been making a mistake. Let me try once more carefully:

From [0,1,4,6,7,10] with diff=3:

- (i=0, j=2, k=4) → nums[i]=0, nums[j]=4, nums[k]=7: 4-0=4, 7-4=3 (not valid)
- (i=1, j=3, k=4) → nums[i]=1, nums[j]=6, nums[k]=7: 6-1=5, 7-6=1 (not valid)
- (i=0, j=1, k=2) → nums[i]=0, nums[j]=1, nums[k]=4: 1-0=1, 4-1=3 (not valid)
- (i=1, j=2, k=4) → nums[i]=1, nums[j]=4, nums[k]=7: 4-1=3, 7-4=3 (valid!)
- (i=2, j=4, k=5) → nums[i]=4, nums[j]=7, nums[k]=10: 7-4=3, 10-7=3 (valid!)

So there are 2 valid arithmetic triplets in this example.

## 2. Pattern Identification

Looking at this problem, there are several approaches we could consider:

1. **Brute Force**: Check all possible triplets (i,j,k)
2. **Hash Set/Map**: Use a set to quickly check if specific numbers exist
3. **Two Pointers**: Since the array is sorted, we could use a variation of this technique

Given that the array is already sorted and we're looking for specific differences between elements, a **Hash Set** approach would be most efficient. This pattern is commonly used when we need to quickly check for the existence of specific values.

## 3. Approach Discussion

Here's my step-by-step approach using a Hash Set:

1. Create an empty set to store the numbers we've seen
2. Initialize a counter for the triplets (starting at 0)
3. Iterate through each number in the array
4. For each number x, check if the set contains both (x-diff) and (x-2*diff)
5. If both exist, we've found an arithmetic triplet (x-2*diff, x-diff, x)
6. Increment our counter
7. Add the current number to our set
8. Return the final count

This approach works because if we're at a number `x` and we find that both `x-diff` and `x-2*diff` exist in our set, then these three numbers form an arithmetic triplet with the given difference.

Since the array is strictly increasing (all elements are unique), we don't need to worry about duplicate triplets.

## 4. Code Implementation

Let's implement this solution in JavaScript:

```javascript
/**
 * @param {number[]} nums - The input array of integers
 * @param {number} diff - The required difference between consecutive elements
 * @return {number} - The number of arithmetic triplets
 */
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
```

Let's trace through the algorithm with our example:

- `nums = [0,1,4,6,7,10]` and `diff = 3`
- We start with an empty set and count = 0

For num = 0:

- Check if (0-3) and (0-6) exist in the set: they don't
- Add 0 to the set: seen = {0}

For num = 1:

- Check if (1-3) and (1-6) exist in the set: they don't
- Add 1 to the set: seen = {0, 1}

For num = 4:

- Check if (4-3) and (4-6) exist in the set: (4-3)=1 exists but (4-6)=-2 doesn't
- Add 4 to the set: seen = {0, 1, 4}

For num = 6:

- Check if (6-3) and (6-6) exist in the set: (6-3)=3 doesn't exist but (6-6)=0 does
- Add 6 to the set: seen = {0, 1, 4, 6}

For num = 7:

- Check if (7-3) and (7-6) exist in the set: (7-3)=4 exists and (7-6)=1 exists
- Increment count: count = 1
- Add 7 to the set: seen = {0, 1, 4, 6, 7}

For num = 10:

- Check if (10-3) and (10-6) exist in the set: (10-3)=7 exists and (10-6)=4 exists
- Increment count: count = 2
- Add 10 to the set: seen = {0, 1, 4, 6, 7, 10}

We return count = 2, which matches our expected result.

## 5. Complexity Analysis

**Time Complexity**: O(n)

- We iterate through the array once, and each operation (checking if an element exists in a set and adding to a set) takes O(1) time on average.

**Space Complexity**: O(n)

- In the worst case, we might need to store all the elements of the array in our set.

## 6. Alternative Solutions

### Brute Force Approach

We could also use a brute force approach by checking all possible triplets:

```javascript
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
```

**Time Complexity**: O(n³) - We have three nested loops
**Space Complexity**: O(1) - We only use a constant amount of extra space

### Binary Search Approach

Since the array is sorted, we could also use binary search to find the required elements:

```javascript
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
```

**Time Complexity**: O(n log n) - For each of the n elements, we perform two binary searches, each taking O(log n) time
**Space Complexity**: O(1) - We only use a constant amount of extra space

Our Hash Set solution remains the most efficient in terms of time complexity.

## 7. Practice Recommendations

Here are some similar LeetCode problems that use the same or related patterns:

1. **1. Two Sum** - Finding pairs with a specific sum (Hash Map pattern)
2. **15. 3Sum** - Finding triplets that sum to zero (Sorting + Two Pointers)
3. **16. 3Sum Closest** - Finding triplets with sum closest to target
4. **532. K-diff Pairs in an Array** - Finding pairs with a specific difference
5. **1679. Max Number of K-Sum Pairs** - Finding pairs with a specific sum
6. **2006. Count Number of Pairs With Absolute Difference K** - Counting pairs with specific difference

These problems will help you strengthen your understanding of Hash Sets/Maps and how they can be used to efficiently solve array-based problems.

## 8. Flowchart Design

This flowchart illustrates the key steps of our hash set solution:

1. We start by initializing our set and counter
2. For each number in the array, we check if we can form a triplet with it as the last element
3. If we can form a triplet, we increment our counter
4. We add the current number to our set
5. We continue iterating until we've processed all numbers
6. Finally, we return the total count of triplets

## Summary

The "Number of Arithmetic Triplets" problem is an excellent example of how using the right data structure (in this case, a Hash Set) can significantly improve the efficiency of our solution.

The key insight is recognizing that when we're at a particular number `num`, we need to check if the two numbers `num-diff` and `num-2*diff` have already appeared in the array. Using a Hash Set allows us to perform these checks in constant time.

In an interview setting, it's essential to first identify the pattern (checking for existence of specific values), then choose the appropriate data structure (Hash Set), and finally implement the solution efficiently.

The pattern of using Hash Sets to quickly check for the existence of values is widely applicable to many other problems, particularly those involving finding pairs or triplets with specific relationships within an array.

## **I'll clarify the conditional statement in your code step by step:**

```javascript
if (seen.has(num - diff) && seen.has(num - 2 * diff))
```

This line is checking whether we can form an arithmetic triplet ending with the current number (`num`). Let's break it down:

1. **Context**: This code is inside a loop that processes each number in the array one by one. For each number, it's checking if this number can be the third element of an arithmetic triplet.

2. **What is an arithmetic triplet?** An arithmetic triplet consists of three numbers where the difference between consecutive elements is constant. In this case, that constant difference is specified by the `diff` parameter.

3. **What the conditional is checking**:
   - `seen.has(num - diff)`: This checks if we've already encountered a number that is exactly `diff` less than the current number. This would be the second element of our potential triplet.
   - `seen.has(num - 2 * diff)`: This checks if we've already encountered a number that is exactly `2 * diff` less than the current number. This would be the first element of our potential triplet.
   - The `&&` (logical AND) means that both conditions must be true for the entire condition to be true.

4. **Example**:
   Let's say:
   - `nums = [1, 3, 5, 7, 9]`
   - `diff = 2`
   - We're currently processing `num = 5`

   The condition checks:
   - Is `3` (which is `5 - 2`) in our set? Yes.
   - Is `1` (which is `5 - 2*2`) in our set? Yes.
   - So `[1, 3, 5]` forms an arithmetic triplet with difference `2`.

5. **Why this works**:
   - The code uses a clever approach that processes the array in one pass.
   - Instead of looking forward for potential triplets, it looks backward to see if the current number completes a triplet.
   - This is efficient because by the time we reach any number, we've already added all previous numbers to the `seen` set.

The elegance of this solution is that it has O(n) time complexity, where n is the length of the array, because we only need to iterate through the array once and Set lookups are O(1) operations.

## **Let me break down those two key lines of code step-by-step:**

```javascript
const first = binarySearch(nums, 0, j - 1, nums[j] - diff);
const third = binarySearch(nums, j + 1, n - 1, nums[j] + diff);
```

These lines are searching for potential elements that could form an arithmetic triplet with `nums[j]` at the center.

## First Line Explained

```javascript
const first = binarySearch(nums, 0, j - 1, nums[j] - diff);
```

This line is searching for the first element of a potential arithmetic triplet.

1. `nums[j]` is our middle element in the potential triplet.
2. `nums[j] - diff` is the value we're searching for as the first element. If we find this value, and later find `nums[j] + diff`, we'll have a valid arithmetic triplet with equal differences.
3. We're searching only in the portion of the array that comes before the middle element (index 0 to j-1) because we want the triplet to be in ascending order of indices.
4. The binary search returns the index of the element if found, or -1 if not found.

## Second Line Explained

```javascript
const third = binarySearch(nums, j + 1, n - 1, nums[j] + diff);
```

This line is searching for the third element of the potential triplet.

1. Again, `nums[j]` is our middle element.
2. `nums[j] + diff` is the value we need for the third element to make a valid arithmetic triplet.
3. We're searching only in the portion of the array that comes after the middle element (index j+1 to n-1).
4. Just like before, the binary search returns the index if found, or -1 if not found.

## How These Lines Work Together

The function is looking for sets of three elements (i, j, k) where:

- The indices are in ascending order: i < j < k
- The values form an arithmetic sequence: nums[j] - nums[i] = nums[k] - nums[j] = diff

For each potential middle element `nums[j]`:

1. We check if there's an element with value `nums[j] - diff` before it
2. We also check if there's an element with value `nums[j] + diff` after it
3. If both exist, we've found a valid arithmetic triplet and increment the counter

The binary search optimization makes this efficient. Instead of checking every possible combination (which would be O(n³)), we're leveraging binary search to find the specific values we need in O(log n) time, resulting in an overall O(n log n) algorithm.
