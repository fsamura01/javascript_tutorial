================================================================
  CODING INTERVIEW STUDY NOTES
  LeetCode #1679 — Max Number of K-Sum Pairs
  Pattern: Two Pointers | Difficulty: Medium
================================================================

----------------------------------------------------------------

1. PROBLEM STATEMENT

----------------------------------------------------------------

You are given an integer array nums and an integer k.
In one operation, you can pick two numbers from the array
whose sum equals k and remove them from the array.
Return the maximum number of operations you can perform.

Example 1:
  Input:  nums = [1, 2, 3, 4], k = 5
  Output: 2

- Remove 1 and 4 → nums = [2, 3]
- Remove 2 and 3 → nums = []
  → 2 operations total

Example 2:
  Input:  nums = [3, 1, 3, 4, 3], k = 6
  Output: 1

- Remove first two 3s → nums = [1, 4, 3]
  → 1 operation total

Constraints:

- 1 <= nums.length <= 10^5
- 1 <= nums[i] <= 10^9
- 1 <= k <= 10^9

----------------------------------------------------------------

1. KEY CLARIFICATIONS

----------------------------------------------------------------

- Each element can only be used in ONE pair
- Order of removal does NOT matter — final count is always the same
- Goal is to MAXIMIZE the number of valid pairs removed

----------------------------------------------------------------

1. PATTERN: TWO POINTERS

----------------------------------------------------------------

After sorting the array:

- Smallest value is at the LEFT
- Largest value is at the RIGHT

Pointer movement logic:

- sum == k  → found a pair! count++, move BOTH pointers inward
- sum >  k  → move RIGHT pointer left  (need a smaller number)
- sum <  k  → move LEFT pointer right  (need a bigger number)

Why it works:
  Sorting lets us know which direction to move instead of
  checking every possible pair.

----------------------------------------------------------------

1. BRUTE FORCE vs OPTIMIZED

----------------------------------------------------------------

  Approach   | Brute Force              | Two Pointers (Optimized)
  -----------|--------------------------|-------------------------
  Method     | Nested loops             | Sort + two pointers
  Time       | O(n^2) — too slow ❌     | O(n log n) — efficient ✅
  Space      | O(1)                     | O(1)

----------------------------------------------------------------

1. ALGORITHM STEPS

----------------------------------------------------------------

  1. Sort the array in ascending order
  2. Set left = 0, right = nums.length - 1, count = 0
  3. While left < right:
       - If nums[left] + nums[right] === k
           → count++, left++, right--
       - If sum > k
           → right--  (need smaller number)
       - If sum < k
           → left++   (need bigger number)
  4. Return count

----------------------------------------------------------------

1. DRY RUN — Example 2

----------------------------------------------------------------

Input: nums = [3, 1, 3, 4, 3], k = 6
After sorting: [1, 3, 3, 3, 4]

  Step | Left      | Right     | Sum   | Action
  -----|-----------|-----------|-------|----------------------
  1    | idx 0 → 1 | idx 4 → 4 | 1+4=5 | < 6, move left →
  2    | idx 1 → 3 | idx 4 → 4 | 3+4=7 | > 6, move right ←
  3    | idx 1 → 3 | idx 3 → 3 | 3+3=6 | = 6 ✅ count=1, both move
  4    | idx 2     | idx 2     |  —    | left = right → STOP

Result: count = 1 ✅ (matches expected output)

----------------------------------------------------------------

1. FINAL JAVASCRIPT SOLUTION

----------------------------------------------------------------

var maxOperations = function(nums, k) {
  // Step 1: Sort the array
  nums.sort((a, b) => a - b);

  // Step 2: Initialize two pointers and count
  let left = 0, right = nums.length - 1, count = 0;

  // Step 3: Move pointers inward
  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === k) {
      count++;    // Found a valid pair!
      left++;     // Move both pointers inward
      right--;
    } else if (sum > k) {
      right--;    // Sum too big, need smaller number
    } else {
      left++;     // Sum too small, need bigger number
    }
  }

  return count;
};

NOTE: Flipping the else-if condition also works!
  } else if (sum < k) {
      left++;
  } else {        // Only remaining case is sum > k
      right--;
  }
Both versions are logically correct.

----------------------------------------------------------------

1. COMPLEXITY ANALYSIS

----------------------------------------------------------------

  Time:  O(n log n)
         - Sorting     → O(n log n)
         - Two pointers → O(n)
         - Total        → O(n log n)  [keep the dominant term]

  Space: O(1)
         - Only a few variables (left, right, count)
         - No extra data structures used

Why O(n log n) + O(n) = O(n log n)?
  We always drop the smaller term because it becomes
  insignificant. Example with n = 1,000,000:
    n         = 1,000,000
    n log n   = 20,000,000   ← dominates

Big O Growth Order (slowest → fastest growing):
  O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n)

----------------------------------------------------------------

1. EDGE CASES

----------------------------------------------------------------

- No valid pairs       → count stays 0, loop ends naturally
- All same elements    → works fine (e.g. [2,2,2,2], k=4 → 2 pairs)
- Only 2 elements      → one check, pointers meet, loop ends
- k < two smallest     → no pairs found, count = 0

----------------------------------------------------------------

1. KEY TAKEAWAYS

----------------------------------------------------------------

- Sort first — it unlocks the two pointer pattern
- Two pointers avoids the O(n^2) brute force
- Too big = shrink right, too small = grow left
- You can flip the conditions as long as all cases are covered

================================================================
