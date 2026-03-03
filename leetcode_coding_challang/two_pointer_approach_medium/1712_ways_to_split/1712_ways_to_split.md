
# CODING INTERVIEW STUDY NOTES

  LeetCode1712 — Ways to Split Array Into Three Subarrays
  Pattern: Prefix Sum + Binary Search | Difficulty: Hard

----------------------------------------------------------------

1. PROBLEM STATEMENT

----------------------------------------------------------------

A split of an integer array is good if:

- The array is split into three non-empty contiguous subarrays
    named left, mid, right respectively from left to right.
- sum(left) <= sum(mid) <= sum(right)

Given nums, an array of non-negative integers, return the number
of good ways to split nums modulo 10^9 + 7.

Example 1:
  Input:  nums = [1,1,1]
  Output: 1
  Explanation: Only good split is [1] [1] [1]

Example 2:
  Input:  nums = [1,2,2,2,5,0]
  Output: 3
  Explanation:
    [1] [2] [2,2,5,0]
    [1] [2,2] [2,5,0]
    [1,2] [2,2] [5,0]

Example 3:
  Input:  nums = [3,2,1]
  Output: 0
  Explanation: No good way to split exists.

Constraints:

- 3 <= nums.length <= 10^5
- 0 <= nums[i] <= 10^4

----------------------------------------------------------------

1. CLARIFYING QUESTIONS & ANSWERS

----------------------------------------------------------------

Q: What is the minimum size of each subarray?
A: Each part must have AT LEAST 1 element (non-empty).
   Minimum total length needed is 3.

Q: What changes between each split? What stays the same?
A: The original array NEVER changes — we just choose where
   to place our two cut points. Think of it like cutting a
   bread loaf at different positions!

- What CHANGES  → where we place the two cuts
- What STAYS    → the original array and its values

Q: Why return modulo 10^9 + 7?
A: The number of valid splits could be astronomically large —
   too big to store in a normal integer. Modulo keeps it manageable.

Q: If we have two split points i and j, what are valid ranges?
   [0...i] [i+1...j] [j+1...n-1]
     left      mid       right

A: i → from 0 to n-3  (leaves room for mid AND right)
   j → from i+1 to n-2  (leaves room for right)

   Example with length 6:
   If i=4: left=[0-4], mid=[5], right=EMPTY ❌
   So i can go at most to n-3 (index 3 in length 6 array)

----------------------------------------------------------------

1. KEY CONCEPT: PREFIX SUM

----------------------------------------------------------------

A prefix sum array stores the sum of all elements up to each index.

Example:
  nums:   [1, 2, 2, 2, 5, 0]
  index:   0  1  2  3  4  5

  prefix: [1, 3, 5, 7, 12, 12]
  index:   0  1  2  3   4   5

How to build it:
  prefix[0] = nums[0]
  prefix[i] = prefix[i-1] + nums[i]

Step by step:
  prefix[0] = 1
  prefix[1] = prefix[0] + nums[1] = 1 + 2 = 3
  prefix[2] = prefix[1] + nums[2] = 3 + 2 = 5
  prefix[3] = prefix[2] + nums[3] = 5 + 2 = 7
  prefix[4] = prefix[3] + nums[4] = 7 + 5 = 12
  prefix[5] = prefix[4] + nums[5] = 12 + 0 = 12

General formula for sum of subarray from index i to j:
  sum(i, j) = prefix[j] - prefix[i-1]

WHY prefix[i-1]?
  Because prefix[i] already INCLUDES nums[i].
  If we subtract prefix[i], we accidentally remove nums[i].
  We need to subtract everything BEFORE index i → prefix[i-1]

  Example: sum(2, 4) = prefix[4] - prefix[1] = 12 - 3 = 9
  Verify:  nums[2] + nums[3] + nums[4] = 2 + 2 + 5 = 9 ✅

Using prefix sums for our three parts:
  sum(left)  = prefix[i]
  sum(mid)   = prefix[j] - prefix[i]
  sum(right) = prefix[n-1] - prefix[j]

----------------------------------------------------------------

1. PATTERN: PREFIX SUM + BINARY SEARCH

----------------------------------------------------------------

WHY PREFIX SUM?
  Instead of computing subarray sums from scratch each time O(n),
  prefix sum gives us any subarray sum in O(1)!

WHY BINARY SEARCH?
  Since nums contains non-negative integers, prefix sum array
  is always SORTED (non-decreasing).
  This means for each fixed i, valid j values form a
  CONTIGUOUS RANGE — so we can binary search for its boundaries!

KEY INSIGHT:
  For each fixed i, instead of scanning every possible j → O(n),
  we binary search for the MINIMUM and MAXIMUM valid j because
  the prefix sum array is sorted — giving us the entire valid
  range in O(log n) instead of O(n)!

----------------------------------------------------------------

1. BRUTE FORCE vs OPTIMIZED

----------------------------------------------------------------

  Approach   | Brute Force                  | Optimized
  -----------|------------------------------|------------------
  Method     | Try every i and j            | Prefix sum +

             | combination                  | Binary search
  Time       | O(n^2) — too slow ❌        | O(n log n) ✅
  Space      | O(1)                         | O(n)

Why O(n^2)?
  n values of i × n values of j = n^2 combinations

Why O(n log n)?
  Build prefix sum        → O(n)
  For each i              → O(n) iterations
  Two binary searches     → O(log n) each
  Total                   → O(n log n)

----------------------------------------------------------------

1. FINDING VALID J RANGE — THE ALGEBRA

----------------------------------------------------------------

For each fixed i, we need:
  sum(left) <= sum(mid) <= sum(right)

MINIMUM J — from condition: sum(left) <= sum(mid)
  prefix[i] <= prefix[j] - prefix[i]
  prefix[i] + prefix[i] <= prefix[j]
  2 * prefix[i] <= prefix[j]

  → Find smallest j where prefix[j] >= 2 * prefix[i]

MAXIMUM J — from condition: sum(mid) <= sum(right)
  prefix[j] - prefix[i] <= prefix[n-1] - prefix[j]
  prefix[j] + prefix[j] <= prefix[n-1] + prefix[i]
  2 * prefix[j] <= prefix[n-1] + prefix[i]
  prefix[j] <= (prefix[n-1] + prefix[i]) / 2

  → Find largest j where prefix[j] <= (prefix[n-1] + prefix[i]) / 2

Number of valid j values for each i:
  max_j - min_j + 1   (if min_j <= max_j)

----------------------------------------------------------------

1. BINARY SEARCH EXPLAINED

----------------------------------------------------------------

REGULAR BINARY SEARCH — finds exact target in sorted array:

- Look at middle element
- If middle == target → found it!
- If middle > target  → search LEFT half
- If middle < target  → search RIGHT half
- Each step cuts search space in HALF → O(log n)

LOWER BOUND — finds SMALLEST index where condition is met:
  result = -1
  while left <= right:
    mid = floor((left + right) / 2)
    if condition met:
      result = mid     ← save potential answer
      right = mid - 1  ← keep searching LEFT for smaller index
    else:
      left = mid + 1   ← search RIGHT

UPPER BOUND — finds LARGEST index where condition is met:
  result = -1
  while left <= right:
    mid = floor((left + right) / 2)
    if condition met:
      result = mid     ← save potential answer
      left = mid + 1   ← keep searching RIGHT for larger index
    else:
      right = mid - 1  ← search LEFT

KEY DIFFERENCE:
  Lower bound → when condition met, search LEFT  (right = mid - 1)
  Upper bound → when condition met, search RIGHT (left = mid + 1)

----------------------------------------------------------------

1. ALGORITHM STEPS

----------------------------------------------------------------

1. Build prefix sum array from nums
2. For each valid i (0 to n-3):
   a. Find min_j using lower bound binary search
      target = 2 * prefix[i]
      range  = i+1 to n-2
   b. Find max_j using upper bound binary search
      target = Math.floor((prefix[n-1] + prefix[i]) / 2)
      range  = i+1 to n-2
   c. If min_j != -1 AND max_j != -1 AND min_j <= max_j:
      count += (max_j - min_j + 1)
      count %= MOD
3. Return count

----------------------------------------------------------------

1. PSEUDOCODE

----------------------------------------------------------------

function waysToSplit(nums):
  n = nums.length
  MOD = 1000000007

  prefix = buildPrefixSum(nums)

  count = 0
  for i from 0 to n-3:
    min_j = lowerBound(prefix, i+1, n-2, 2*prefix[i])
    max_j = upperBound(prefix, i+1, n-2,
            Math.floor((prefix[n-1] + prefix[i])/2))

    if min_j !== -1 AND max_j !== -1 AND min_j <= max_j:
      count = (count + max_j - min_j + 1) % MOD

  return count

function lowerBound(prefix, left, right, target):
  result = -1
  while left <= right:
    mid = floor((left + right) / 2)
    if prefix[mid] >= target:
      result = mid
      right = mid - 1
    else:
      left = mid + 1
  return result

function upperBound(prefix, left, right, target):
  result = -1
  while left <= right:
    mid = floor((left + right) / 2)
    if prefix[mid] <= target:
      result = mid
      left = mid + 1
    else:
      right = mid - 1
  return result

----------------------------------------------------------------

1. CLARIFICATION: WHY WE FIX i AND MOVE j

----------------------------------------------------------------

Think of i and j as TWO FENCES in your array:

- Fence 1 at i → separates left from mid
- Fence 2 at j → separates mid from right

When we fix i and only move j, we keep fence 1 in place
and slide fence 2 to the right!

With nums = [1, 2, 2, 2, 5, 0] and i = 0:

  [0...i] [i+1...j] [j+1...n-1]
    left      mid       right

When j = 1:
  [1] | [2] | [2, 2, 5, 0]
   i=0  j=1
  left=1 element, mid=1 element, right=4 elements

When j = 2:
  [1] | [2, 2] | [2, 5, 0]
   i=0   j=2
  left=1 element, mid=2 elements, right=3 elements

When j = 3:
  [1] | [2, 2, 2] | [5, 0]
   i=0    j=3
  left=1 element, mid=3 elements, right=2 elements

As j increases:

- left  → always ends at i=0 → NEVER CHANGES ✅
- mid   → grows because j moves right → GETS BIGGER ✅
- right → shrinks because j steals elements → GETS SMALLER ✅

That's exactly why we fix i and binary search for valid j values:

- i controls where LEFT ends
- j controls where MID ends

----------------------------------------------------------------

1. DRY RUN — Example 2

----------------------------------------------------------------

Input: nums = [1, 2, 2, 2, 5, 0]
prefix:       [1, 3, 5, 7, 12, 12]

--- i = 0, prefix[0] = 1 ---

min_j target = 2 * 1 = 2
max_j target = Math.floor((12 + 1) / 2) = Math.floor(6.5) = 6

Binary search for min_j (prefix[j] >= 2, range 1 to 4):
  left=1, right=4, mid=2 → prefix[2]=5 >= 2 ✅ result=2, right=1
  left=1, right=1, mid=1 → prefix[1]=3 >= 2 ✅ result=1, right=0
  left=1 > right=0 → STOP
  min_j = 1

Binary search for max_j (prefix[j] <= 6, range 1 to 4):
  left=1, right=4, mid=2 → prefix[2]=5 <= 6 ✅ result=2, left=3
  left=3, right=4, mid=3 → prefix[3]=7 <= 6 ❌ right=2
  left=3 > right=2 → STOP
  max_j = 2

min_j=1 <= max_j=2 ✅
count += (2 - 1 + 1) = 2

Verify:
  j=1: [1] [2] [2,2,5,0] → 1<=2<=9 ✅
  j=2: [1] [2,2] [2,5,0] → 1<=4<=7 ✅

--- i = 1, prefix[1] = 3 ---

min_j target = 2 * 3 = 6
max_j target = Math.floor((12 + 3) / 2) = Math.floor(7.5) = 7

Binary search for min_j (prefix[j] >= 6, range 2 to 4):
  left=2, right=4, mid=3 → prefix[3]=7 >= 6 ✅ result=3, right=2
  left=2, right=2, mid=2 → prefix[2]=5 >= 6 ❌ left=3
  left=3 > right=2 → STOP
  min_j = 3

Binary search for max_j (prefix[j] <= 7, range 2 to 4):
  left=2, right=4, mid=3 → prefix[3]=7 <= 7 ✅ result=3, left=4
  left=4, right=4, mid=4 → prefix[4]=12 <= 7 ❌ right=3
  left=4 > right=3 → STOP
  max_j = 3

min_j=3 <= max_j=3 ✅
count += (3 - 3 + 1) = 1

Verify:
  j=3: [1,2] [2,2] [5,0] → 3<=4<=5 ✅

Total count = 2 + 1 = 3 ✅ matches expected output!

----------------------------------------------------------------

1. EDGE CASES

----------------------------------------------------------------

- min_j > max_j        → no valid j for this i, skip it (add 0)
- Total sum is 0       → all splits give 0<=0<=0, always valid ✅
- Binary search = -1   → no valid j found, skip this i
- Integer division     → always use Math.floor() for max_j target

----------------------------------------------------------------

1. FINAL JAVASCRIPT SOLUTION

----------------------------------------------------------------

function buildPrefixSum(nums) {
  const prefix = new Array(nums.length).fill(0);
  prefix[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    prefix[i] = prefix[i-1] + nums[i];
  }
  return prefix;
}

function lowerBound(prefix, left, right, target) {
  let result = -1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (prefix[mid] >= target) {
      result = mid;
      right = mid - 1;  // search left for smaller index
    } else {
      left = mid + 1;   // search right
    }
  }
  return result;
}

function upperBound(prefix, left, right, target) {
  let result = -1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (prefix[mid] <= target) {
      result = mid;
      left = mid + 1;   // search right for larger index
    } else {
      right = mid - 1;  // search left
    }
  }
  return result;
}

function waysToSplit(nums) {
  const n = nums.length;
  const MOD = 1000000007;
  const prefix = buildPrefixSum(nums);
  let count = 0;

  for (let i = 0; i <= n-3; i++) {
    const min_j = lowerBound(prefix, i+1, n-2, 2*prefix[i]);
    const max_j = upperBound(prefix, i+1, n-2,
                  Math.floor((prefix[n-1] + prefix[i]) / 2));

    if (min_j !== -1 && max_j !== -1 && min_j <= max_j) {
      count = (count + max_j - min_j + 1) % MOD;
    }
  }

  return count;
}

----------------------------------------------------------------

1. COMPLEXITY ANALYSIS

----------------------------------------------------------------

  Time:  O(n log n)
         - Build prefix sum      → O(n)
         - Loop through i        → O(n)
         - Two binary searches   → O(log n) each
         - Total                 → O(n log n)

  Space: O(n)
         - Prefix sum array of size n
         - All other variables are O(1)

----------------------------------------------------------------

1. REFLECTION — KEY LESSONS

----------------------------------------------------------------

PATTERNS USED:

>- Prefix Sum   → fast subarray sum computation O(1)
>- Binary Search → fast range boundary finding O(log n)

KEY INSIGHT:
> For each fixed i, instead of scanning every possible j → O(n),
> we binary search for min and max valid j boundaries because
> the prefix sum array is SORTED → O(log n) per i!

NEW CONCEPTS LEARNED:

>- Prefix sum array and how to build it
>- Lower bound binary search (find smallest valid index)
>- Upper bound binary search (find largest valid index)
>- How sorted property enables binary search optimization

FUTURE APPLICATIONS — look for prefix sum + binary search when:

- Problem involves "subarray sums"
- Problem involves "split array"
- Problem involves "count ways"
- Ask yourself:
      1. Can prefix sum avoid recomputing sums? → O(1) lookup
      2. Is resulting array sorted for binary search? → O(log n)

COMMON MISTAKES TO AVOID:

- Using ^ for exponent in JavaScript (^ is XOR, use 1000000007)
- Forgetting Math.floor() for integer division
- Loop range: i <= n-3 not i < n-3
- Storing value instead of INDEX in binary search result
- Mixing variable name cases (min_J vs min_j)
- Missing let/const declarations
