# LeetCode1764 — Form Array by Concatenating Subarrays of Another Array

**Pattern:** Greedy + Two Pointers + Pattern Matching  
**Difficulty:** Medium

---

## Problem

Given a 2D integer array `groups` and an integer array `nums`, check if you can choose `n` disjoint subarrays from `nums` such that the `ith` subarray equals `groups[i]`, they appear in the same order as `groups`, and no indices are shared.

***Example 1***

```Javascript
Input:  groups = [[1,-1,-1],[3,-2,0]]
        nums   = [1,-1,0,1,-1,-1,3,-2,0]
Output: true

Explanation:
  - [1,-1,-1] found at index 3-5
  - [3,-2,0]  found at index 6-8
  - In order and disjoint ✅
```

***Example 2***

```Javascript
Input:  groups = [[10,-2],[1,2,3,4]]
        nums   = [1,2,3,4,10,-2]
Output: false

Explanation:
  - groups wants [10,-2] BEFORE [1,2,3,4]
  - nums has [1,2,3,4] first → ORDER fails ❌
```

***Example 3***

```Javascript
Input:  groups = [[1,2,3],[3,4]]
        nums   = [7,7,1,2,3,4,7,7]
Output: false

Explanation:
  - [1,2,3] uses index 2,3,4
  - [3,4]   uses index 4,5 → index 4 shared! ❌
```

***Constraints***

- `1 <= n <= 10³`
- `1 <= groups[i].length, sum(groups[i].length) <= 10³`
- `1 <= nums.length <= 10³`
- `-10⁷ <= groups[i][j], nums[k] <= 10⁷`

---

## Clarifying Questions & Answers

**Q: Why is Example 2 false if both groups exist in nums?**  
The ORDER condition fails. Groups requires `[10,-2]` BEFORE `[1,2,3,4]`, but in nums `[1,2,3,4]` appears first.

**Q: What does disjoint mean?**  
Each element of `nums` can belong to AT MOST ONE subarray. No sharing of indices — each subarray is standalone.

**Q: Why `pos <= nums.length - group.length` instead of `pos < nums.length`?**  
Prevents trying to match at positions where the group can't possibly fit:

```Javascript
nums.length=9, group.length=3 → last valid start = 9-3 = 6
At pos=7: needs nums[7], nums[8], nums[9] → OUT OF BOUNDS ❌
```

Also handles groups longer than nums — `nums.length - group.length` becomes negative, while loop never runs → returns false automatically ✅

---

## Key Concepts

**Three rules to return `true`:**

1. Each group must exist as a **contiguous subarray** in `nums`
2. Groups must appear in **same order** as `groups`
3. Subarrays must be **disjoint** — no shared indices

**Greedy insight:**  
Taking the EARLIEST valid match leaves maximum remaining space for subsequent groups. Skipping a valid match can only hurt, never help!

**Two pointers — one explicit, one implicit:**

```javascript
let pos = 0;                    // explicit → moves through nums
for (const group of groups) {  // implicit → moves through groups
```

Written explicitly the second pointer would be:

```javascript
let groupIndex = 0;
while (groupIndex < groups.length) {
  groupIndex++;
}
```

Both pointers only move **forward** — hallmark of the two pointer pattern!

---

## Brute Force vs Optimized

|        | Brute Force                        | Greedy                 |
|--------|------------------------------------|------------------------|
| Method | Try every position for every group | Take first valid match |
| Time   |         O(n·m·k)                   | O(m·k)                 |
| Space  | O(1)                               | O(1)                   |

**With max constraints (n=m=k=1000):**

```Javascript
Brute force: 1000 × 1000 × 1000 = 1,000,000,000 ❌
Greedy:      1000 × 1000         = 1,000,000 ✅
```

---

## Algorithm Steps

1. Initialize `pos = 0`
2. For each `group` in `groups`:
   - Set `found = false`
   - While `pos <= nums.length - group.length`:
     - If `matchesAt(nums, group, pos)` → jump `pos` past match, `found = true`, break
     - Else → `pos++`
   - If `!found` → return `false`
3. Return `true`

**matchesAt helper:**  
Compare each element of `group` against `nums` starting at `pos`. Return `false` on first mismatch, `true` if all match.

---

## Pseudocode

```Javascript
function canChoose(groups, nums):
  pos = 0

  for each group in groups:
    found = false

    while pos <= nums.length - group.length:
      if matchesAt(nums, group, pos):
        pos = pos + group.length   // jump past match
        found = true
        break
      pos++                        // move one step forward

    if not found:
      return false

  return true


function matchesAt(nums, group, pos):
  for i from 0 to group.length - 1:
    if nums[pos + i] !== group[i]:
      return false
  return true
```

> **Note:** `"for i from 0 to group.length - 1"` (pseudocode) is equivalent to `"for(let i = 0; i < group.length; i++)"` (JavaScript) — both stop at the same point!

---

## Solution

```javascript
function matchesAt(nums, group, pos) {
  for (let i = 0; i < group.length; i++) {
    if (nums[pos + i] !== group[i]) {
      return false;
    }
  }
  return true;
}

function canChoose(groups, nums) {
  let pos = 0;

  for (const group of groups) {
    let found = false;

    while (pos <= nums.length - group.length) {
      if (matchesAt(nums, group, pos)) {
        pos = pos + group.length;  // jump past match
        found = true;
        break;
      }
      pos++;  // move one step forward
    }

    if (!found) {
      return false;
    }
  }

  return true;
}
```

---

## Dry Run

`groups = [[1,-1,-1], [3,-2,0]]`, `nums = [1,-1,0,1,-1,-1,3,-2,0]`

**Group 0: `[1,-1,-1]`**

| pos | nums[pos] | Match?          | Action                       |
|-----|-----------|-----------------|------------------------------|
| 0   | 1,-1,0    | nums[2]=0≠-1 ❌ | pos++                        |
| 1   | -1,0,1    | nums[1]=-1≠1 ❌ | pos++                        |
| 2   | 0,1,-1    | nums[2]=0≠1 ❌  | pos++                        |
| 3   | 1,-1,-1   | all match ✅    | pos=3+3=6, found=true, break |

**Group 1: `[3,-2,0]`**

| pos | nums[pos] | Match?        | Action                      |
|-----|-----------|---------------|-----------------------------|
| 6   | 3,-2,0    | all match ✅  | pos=6+3=9, found=true, break|

All groups found → return `true` ✅

---

## Edge Cases

| Case | Behavior |
|------|----------|
| Group longer than nums | `nums.length - group.length` is negative → while never runs → `false` |
| Same subarray appears multiple times | pos jumps past first match → second occurrence available for next group |
| Single group | Loop runs once, finds group → `true` |

---

## Complexity

| | Value | Reason |
|---|---|---|
| Time | O(m·k) | m positions × k elements per match check |
| Space | O(1) | Only pos, found, i variables |

---

## Reflection

**Why greedy works here:**  
Taking the earliest valid match leaves maximum remaining space for subsequent groups. There is no scenario where skipping a valid match leads to a better outcome.

**Common mistakes to avoid:**

- Using `pos < nums.length` instead of `pos <= nums.length - group.length` — causes out-of-bounds!
- Moving `pos` backwards — breaks order and disjoint requirements
- Forgetting to `break` after finding a match
- Not returning `false` immediately when a group is not found

---

## Related Problems

| # | Title | Pattern |
|---|-------|---------|
| 392 | Is Subsequence | Greedy + Two Pointers |
| 28 | Find Index of First Occurrence in String | Pattern Matching |
| 796 | Rotate String | Pattern Matching |
| 455 | Assign Cookies | Greedy |
| 881 | Boats to Save People | Greedy + Two Pointers |
