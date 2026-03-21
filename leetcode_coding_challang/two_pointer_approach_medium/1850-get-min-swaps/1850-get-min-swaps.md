# LeetCode 1850 — Minimum Adjacent Swaps to Reach the Kth Smallest Number

**Pattern:** Next Permutation + Bubble Sort (Adjacent Swaps)  
**Difficulty:** Medium

---

## Problem

Given a string `num` representing a large integer and an integer `k`, return the minimum number of adjacent digit swaps needed to transform `num` into its kth smallest wonderful integer (kth next permutation).

***Example 1***

```Javascript
Input:  num = "5489355142", k = 4
Output: 2

Explanation: 4th wonderful number is "5489355421"
  - Swap index 7 with index 8: "5489355142" → "5489355412"
  - Swap index 8 with index 9: "5489355412" → "5489355421"
```

***Example 2***

```Javascript
Input:  num = "11112", k = 4
Output: 4

Explanation: 4th wonderful number is "21111"
  - "11112" → "11121" → "11211" → "12111" → "21111"
  - '2' bubbles from index 4 to index 0 = 4 swaps
```

***Example 3***

```Javascript
Input:  num = "00123", k = 1
Output: 1

Explanation: 1st wonderful number is "00132"
  - Swap index 3 with index 4: "00123" → "00132"
```

***Constraints***

- `2 <= num.length <= 1000`
- `1 <= k <= 1000`
- `num` only consists of digits

---

## Key Concepts

**Two distinct parts:**

```Javascript
Part 1 → Find kth next permutation (apply next permutation k times)
Part 2 → Count minimum adjacent swaps from num to target
```

**Why adjacent swaps only?**  
We can only move digits one position at a time — like bubbling a digit through its neighbors. If we could swap any two positions, the answer would always be at most 1 swap.

**Next Permutation — 4 steps:**

```Javascript
Step 1 → Find pivot:   scan right to left, first digit < right neighbor
Step 2 → Find target:  smallest digit RIGHT of pivot that is > pivot
Step 3 → Swap:         swap pivot with target
Step 4 → Reverse:      reverse everything AFTER pivot's original index
```

**Why reverse after pivot?**  
After the swap, everything to the right of pivot is in descending order. Reversing it gives the smallest possible arrangement — ensuring we get the NEXT permutation, not a larger one!

---

## Next Permutation Walkthrough

Full sequence for `"123"`:

```Javascript
"123" → "132" → "213" → "231" → "312" → "321"
```

Trace of `"231" → "312"`:

```Javascript
digits = ['2', '3', '1']

Step 1 — Find pivot (scan right to left):
  i=1: digits[1]='3' >= digits[2]='1' → i-- → i=0
  i=0: digits[0]='2' >= digits[1]='3' → NO → stop!
  pivot = 0, digits[0]='2'

Step 2 — Find swap target:
  j=2: digits[2]='1' <= digits[pivot]='2' → j-- → j=1
  j=1: digits[1]='3' <= digits[pivot]='2' → NO → stop!
  swap target = digits[1]='3'

Step 3 — Swap:
  ['2','3','1'] → ['3','2','1']

Step 4 — Reverse after pivot index 0:
  ['3', | '2','1'] → reverse → ['3','1','2'] = "312" ✅
```

---

## Counting Adjacent Swaps Walkthrough

For each position in `target`, find that digit in current `num` and bubble it into place:

```Javascript
num    = "5489355 | 1 4 2"   (suffix differs from index 7)
target = "5489355 | 4 2 1"

i=7: target[7]='4', find in num → j=8
     swaps += 8-7 = 1
     bubble: swap index 8↔7 → "...5 4 1 2"

i=8: target[8]='2', find in num → j=9
     swaps += 9-8 = 1
     bubble: swap index 9↔8 → "...5 4 2 1"

i=9: target[9]='1', already at j=9
     swaps += 0

Total = 1 + 1 = 2 ✅
```

**Why `j > i` in bubble loop?**

```Javascript
j > i  → digit still traveling → keep swapping left
j === i → digit arrived at destination → STOP!

Without j > i: digit overshoots its target position! ❌
```

---

## Pseudocode

```Javascript
// Part 1: Next Permutation
function nextPermutation(digits):
  i = digits.length - 2
  while i >= 0 AND digits[i] >= digits[i+1]:
    i--
  pivot = i

  j = digits.length - 1
  while digits[j] <= digits[pivot]:
    j--

  swap digits[pivot] with digits[j]

  left = pivot + 1, right = digits.length - 1
  while left < right:
    swap digits[left] with digits[right]
    left++, right--

  return digits


// Part 2: Count Swaps
function getMinSwaps(num, k):
  target = num.split("")

  repeat k times:
    target = nextPermutation(target)

  digits = num.split("")
  swaps = 0

  for i from 0 to target.length:
    j = i
    while digits[j] !== target[i]:   // search for match
      j++
    swaps += j - i                    // distance to travel
    while j > i:                      // bubble into place
      swap digits[j] with digits[j-1]
      j--

  return swaps
```

**Why `while` instead of `for` + `if` for searching?**

```javascript
// for loop — two levels:
for (let j = i; j < digits.length; j++) {
  if (digits[j] === target[i]) {  // extra level!
    break;
  }
}

// while loop — one level:
while (digits[j] !== target[i]) {  // condition IS the search!
  j++;
}
// arrives here exactly when match found — no break needed!
```

---

## Solution

```javascript
function nextPermutation(digits) {
  let i = digits.length - 2;
  while (i >= 0 && digits[i] >= digits[i + 1]) {
    i--;
  }
  let pivot = i;

  let j = digits.length - 1;
  while (digits[j] <= digits[pivot]) {
    j--;
  }

  [digits[pivot], digits[j]] = [digits[j], digits[pivot]];

  let left = pivot + 1;
  let right = digits.length - 1;
  while (left < right) {
    [digits[left], digits[right]] = [digits[right], digits[left]];
    left++;
    right--;
  }

  return digits;
}

function getMinSwaps(num, k) {
  let target = num.split("");

  // Part 1: find kth next permutation
  for (let i = 0; i < k; i++) {
    target = nextPermutation(target);
  }

  // Part 2: count minimum adjacent swaps
  let digits = num.split("");
  let swaps = 0;

  for (let i = 0; i < target.length; i++) {
    let j = i;
    while (digits[j] !== target[i]) {
      j++;
    }
    swaps += j - i;
    while (j > i) {
      [digits[j], digits[j - 1]] = [digits[j - 1], digits[j]];
      j--;
    }
  }

  return swaps;
}
```

---

## Complexity

|       | Part 1 | Part 2 | Total       |
|-------|--------|--------|-------------|
| Time  | O(n·k) | O(n²)  | O(n·k + n²) |
| Space | O(n)   | O(n)   | O(n)        |

**With max constraints (n=1000, k=1000):**

```Javascript
n·k = 1,000,000 ✅
n²  = 1,000,000 ✅
→ fast enough!
```

---

## Reflection

**Next Permutation insight:**  
The algorithm always works from the RIGHT side — find the first ascending pair from the right, swap with the smallest valid digit to the right, then reverse the suffix to get the smallest possible next arrangement.

**Adjacent swaps insight:**  
Moving a digit from position `j` to position `i` always costs exactly `j - i` adjacent swaps — it must bubble past every digit in between, one step at a time. This is exactly one pass of bubble sort!

**Common mistakes to avoid:**

- Using `pivot = i` instead of `pivot = i - 1` when scanning with `digits[i] <= digits[i-1]`
- Reversing the entire array instead of just the suffix after pivot
- Using `for + if + break` instead of the cleaner `while` loop for searching
- Forgetting `j > i` condition in bubble loop — digit overshoots without it!
- Not splitting `num` separately for `digits` — modifying `target` would corrupt the original!

---

## Related Problems

| #    | Title                      | Pattern          |
|------|----------------------------|------------------|
| 31   | Next Permutation           | Next Permutation |
| 46   | Permutations               | Permutations     |
| 1217 | Minimum Cost to Move Chips | Adjacent Swaps   |
| 179  | Largest Number             | Greedy + Sorting |
