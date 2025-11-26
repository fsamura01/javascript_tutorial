# LeetCode 825: Friends Of Appropriate Ages - A First-Principles Approach

Let me guide you through this problem step by step, building your understanding from the ground up.

---

## 1. Problem Understanding

Let's break down what this problem is really asking in plain language.

Imagine a social media platform with `n` users, each having an age. We need to count how many friend requests will be sent in total. Person `x` will send a friend request to person `y` **unless** any of these "blocking" conditions are true:

1. **`age[y] <= 0.5 * age[x] + 7`** — Person y is "too young" relative to x
2. **`age[y] > age[x]`** — Person y is older than x
3. **`age[y] > 100 && age[x] < 100`** — y is over 100 but x is under 100

If **none** of these conditions apply, x sends a request to y.

**Key insight:** Let's flip this around. Person x **will send** a request to y when:

- `age[y] > 0.5 * age[x] + 7` (y is old enough)
- `age[y] <= age[x]` (y is not older than x)
- The third condition becomes irrelevant when the first two are satisfied (I'll explain why shortly)

So the valid range for `age[y]` is: **`0.5 * age[x] + 7 < age[y] <= age[x]`**

---

## 2. Understanding the Constraints

The constraints give us crucial hints about the optimal approach:

- **`n <= 2 * 10⁴`** (up to 20,000 people) — An O(n²) brute force would be 400 million operations, which might be too slow.
- **`1 <= ages[i] <= 120`** — Ages are limited to just 120 possible values! This is a massive hint.

**Why the third condition is redundant:** If `age[y] <= age[x]` (condition 2 passes) and `age[x] < 100`, then `age[y] < 100` automatically. So condition 3 can never be the sole reason for blocking when conditions 1 and 2 already pass.

**Edge case discovery:** When can x actually send requests? We need `0.5 * age[x] + 7 < age[y]`. For x to send to *anyone* (even someone their own age), we need `0.5 * age[x] + 7 < age[x]`, which simplifies to `age[x] > 14`. So people aged 14 or younger never send requests!

---

## 3. Breaking Down the Problem

Let's decompose this into smaller pieces:

**Part A: Determine the valid age range for each sender**
For a person of age `A`, they can send requests to people with ages in range `(0.5*A + 7, A]`.

**Part B: Count how many people fall in that range**
Given any range, we need to efficiently count people whose ages fall within it.

**Part C: Handle same-age cases carefully**
If person x sends to someone of the same age, we must not count x sending to themselves.

---

## 4. Pattern Identification

This problem exhibits two key patterns:

**Pattern 1: Counting/Frequency Array** — Since ages are bounded (1-120), we can count how many people have each age. This transforms the problem from "n people" to "120 age buckets."

**Pattern 2: Prefix Sum** — To quickly count people in a range `(low, high]`, we can use prefix sums. If `prefix[i]` = count of people with age ≤ i, then count in range `(low, high]` = `prefix[high] - prefix[low]`.

The combination of these patterns reduces our complexity from O(n²) to O(n + 120²) ≈ O(n).

---

## 5. Approach Discussion

Here's our step-by-step strategy:

**Step 1: Build a frequency count array.** Create an array `count[121]` where `count[a]` = number of people with age `a`.

**Step 2: Build a prefix sum array.** Create `prefix[121]` where `prefix[a]` = total people with age ≤ `a`.

**Step 3: For each possible age A (from 15 to 120), calculate friend requests.** Find the valid range `(0.5*A + 7, A]`. Use prefix sums to count how many people are in this range. Multiply by `count[A]` (all people of age A can send to anyone in this range). Subtract `count[A]` because each person can't send to themselves (they're included in the range when we count people of their own age).

**Step 4: Sum up all requests.**

---

## 6. Code Implementation

```Javascript
/**
 * LeetCode 825: Friends Of Appropriate Ages
 * 
 * Core Insight: Use counting + prefix sums since ages are bounded [1, 120]
 * For age A, valid targets are in range (0.5*A + 7, A]
 */
var numFriendRequests = function(ages) {
    // Step 1: Count frequency of each age (ages range from 1 to 120)
    const count = new Array(121).fill(0);
    for (const age of ages) {
        count[age]++;
    }
    
    // Step 2: Build prefix sum array
    // prefix[i] = total number of people with age <= i
    const prefix = new Array(121).fill(0);
    for (let i = 1; i <= 120; i++) {
        prefix[i] = prefix[i - 1] + count[i];
    }
    
    let totalRequests = 0;
    
    // Step 3: For each possible sender age, count valid requests
    for (let age = 15; age <= 120; age++) {
        // Skip if no one has this age
        if (count[age] === 0) continue;
        
        // Calculate the valid range for recipients: (low, age]
        // Recipients must satisfy: age[y] > 0.5 * age[x] + 7
        const low = Math.floor(0.5 * age + 7);
        
        // Ensure valid range exists (low < age)
        if (low >= age) continue;
        
        // Count people in range (low, age] using prefix sums
        // This equals prefix[age] - prefix[low]
        const validRecipients = prefix[age] - prefix[low];
        
        // Each person of this age sends to all valid recipients
        // But subtract count[age] because they can't send to themselves
        // (themselves are included in validRecipients when age[y] == age[x])
        totalRequests += count[age] * (validRecipients - 1);
    }
    
    return totalRequests;
};

// ----- Test Cases -----
console.log(numFriendRequests([16, 16]));           // Expected: 2
console.log(numFriendRequests([16, 17, 18]));       // Expected: 2
console.log(numFriendRequests([20, 30, 100, 110, 120])); // Expected: 3
```

```Java
/**
 * LeetCode 825: Friends Of Appropriate Ages
 * 
 * Core Insight: Use counting + prefix sums since ages are bounded [1, 120]
 * For age A, valid targets are in range (0.5*A + 7, A]
 */
class Solution {
    public int numFriendRequests(int[] ages) {
        // Step 1: Count frequency of each age (ages range from 1 to 120)
        int[] count = new int[121];
        for (int age : ages) {
            count[age]++;
        }
        
        // Step 2: Build prefix sum array
        // prefix[i] = total number of people with age <= i
        int[] prefix = new int[121];
        for (int i = 1; i <= 120; i++) {
            prefix[i] = prefix[i - 1] + count[i];
        }
        
        int totalRequests = 0;
        
        // Step 3: For each possible sender age, count valid requests
        // Start from 15 because ages <= 14 can never send requests
        // (the valid range becomes empty: 0.5*14 + 7 = 14, so no y where 14 < y <= 14)
        for (int age = 15; age <= 120; age++) {
            // Skip if no one has this age
            if (count[age] == 0) continue;
            
            // Calculate the lower bound (exclusive) for valid recipients
            // Recipients must satisfy: age[y] > 0.5 * age[x] + 7
            int low = (int)(0.5 * age + 7);
            
            // Ensure valid range exists
            if (low >= age) continue;
            
            // Count people in range (low, age] using prefix sums
            // This equals prefix[age] - prefix[low]
            int validRecipients = prefix[age] - prefix[low];
            
            // Each person of this age sends to all valid recipients
            // Subtract 1 because they can't friend request themselves
            // (they're included in validRecipients since their own age is in range)
            totalRequests += count[age] * (validRecipients - 1);
        }
        
        return totalRequests;
    }
    
    // Test the solution
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.numFriendRequests(new int[]{16, 16}));           // Expected: 2
        System.out.println(sol.numFriendRequests(new int[]{16, 17, 18}));       // Expected: 2
        System.out.println(sol.numFriendRequests(new int[]{20, 30, 100, 110, 120})); // Expected: 3
    }
}
```

---

## 7. Complexity Analysis

**Time Complexity: O(n + A)** where n is the number of people and A is the age range (120).

- Building the count array: O(n) — we iterate through all ages once
- Building the prefix sum: O(A) — we iterate through 120 ages
- Processing each age: O(A) — we check each of the 120 possible ages
- Total: O(n + 120) = O(n)

***Space Complexity: O(A) = O(120) = O(1)***

- We use two arrays of fixed size 121
- This is constant space since it doesn't depend on n

The beauty of this approach is that even with 20,000 people, we only do ~20,120 operations instead of 400,000,000!

---

## 8. Alternative Solutions

***Alternative 1: Brute Force O(n²)***

Check every pair (x, y) and count valid requests. This works but is slow for large inputs.

```javascript
// Simple but slower approach
var numFriendRequestsBruteForce = function(ages) {
    let count = 0;
    for (let x = 0; x < ages.length; x++) {
        for (let y = 0; y < ages.length; y++) {
            if (x !== y && canSendRequest(ages[x], ages[y])) {
                count++;
            }
        }
    }
    return count;
};
```

***Alternative 2: Sorting + Binary Search O(n log n)***

Sort the ages, then for each age, use binary search to find the valid range boundaries. This is useful when the age range is very large but n is small.

***Alternative 3: Two Pointers O(n log n)***

After sorting, use two pointers to track the valid range as you iterate through senders. Both boundaries move monotonically, giving O(n) after the O(n log n) sort.

---

## 9. Practice Recommendations

Here are similar problems that use the same patterns:

| Problem                               | Pattern                    | Difficulty             |
|--------------------------------------------------------------------|------------------------|------------|
| **LC 1. Two Sum**                     | Counting/Hashing           | Easy                   |
| **LC 560. Subarray Sum Equals K**     | Prefix Sum                 | Medium                 |
| **LC 1094. Car Pooling**              | Counting + Range           | Medium                 |
| **LC 1854. Maximum Population Year**  | Counting + Prefix          | Easy                   |
| **LC 2055. Plates Between Candles**   | Prefix Sum + Binary Search | Medium                 |
| **LC 1288. Remove Covered Intervals** | Sorting + Counting         | Medium                 |

The key transferable skills from this problem are recognizing when bounded inputs allow counting arrays, and using prefix sums for efficient range queries.

---

## 10. Flowchart

---

## Summary: Key Takeaways

**The First-Principles Thinking Process:**

1. **Reframe the conditions** — Convert "when NOT to send" into "when TO send" for clearer logic
2. **Spot the constraint gift** — Ages bounded to 120 values is a huge hint toward counting
3. **Transform the problem space** — From n people to 120 age buckets
4. **Apply appropriate patterns** — Counting + Prefix Sum for efficient range queries
5. **Handle edge cases** — People ≤14 can't send; same-age self-requests

**The core insight:** When input values are bounded to a small range, consider mapping the problem to that range rather than processing each element individually. Combined with prefix sums, this often reduces O(n²) to O(n).

---
Great catch! Let me break down that algebraic step more clearly.

---

## The Simplification

We have:

```Javascript
7 < age[x] - 0.5 * age[x]
```

The right side has two terms that both involve `age[x]`:

- `age[x]` (which is the same as `1 * age[x]`)
- `0.5 * age[x]`

We're subtracting the second from the first, so we can factor out `age[x]`:

```Javascript
age[x] - 0.5 * age[x]
= 1 * age[x] - 0.5 * age[x]
= (1 - 0.5) * age[x]
= 0.5 * age[x]
```

**Think of it like combining like terms:**

Just as `x - 0.5x = 0.5x`, we have `age[x] - 0.5 * age[x] = 0.5 * age[x]`.

---

## Concrete Example

If `age[x] = 20`:

```Javascript
age[x] - 0.5 * age[x]
= 20 - 0.5 * 20
= 20 - 10
= 10

And:
0.5 * age[x]
= 0.5 * 20
= 10
```

Both expressions give us 10, confirming they're equivalent.

---

So the full derivation is:

```Javascript
0.5 * age[x] + 7 < age[x]

Step 1: Subtract 0.5 * age[x] from both sides
7 < age[x] - 0.5 * age[x]

Step 2: Simplify the right side (combine like terms)
7 < 0.5 * age[x]

Step 3: Multiply both sides by 2
14 < age[x]
```

---
You're absolutely right to point this out! Let me clarify — the two statements actually mean **exactly the same thing**, just phrased differently.

---

## They're Logically Equivalent

**Original problem statement:**
> "A Person x will **not send** a friend request to a person y (x != y) **if any** of the following conditions is true:"

**My rephrasing:**
> "Person x will **send** a friend request to person y **unless any** of these "blocking" conditions are true:"

Let me show why these are identical:

---

## Logical Equivalence

**Statement 1:** "X will NOT happen if condition C is true"

- If C is true → X does not happen
- If C is false → X happens

**Statement 2:** "X will happen unless condition C is true"

- If C is true → X does not happen  
- If C is false → X happens

They produce the same outcomes!

---

## Real-World Analogy

Think of a door with a lock:

**Version 1:** "You will **not enter** the building **if** the door is locked."

**Version 2:** "You will **enter** the building **unless** the door is locked."

Both statements describe the same situation — the lock prevents entry.

---

## In Our Problem Context

**Original:** Person x will **NOT** send a request **IF**:

1. `age[y] <= 0.5 * age[x] + 7` OR
2. `age[y] > age[x]` OR  
3. `age[y] > 100 && age[x] < 100`

**My version:** Person x **WILL** send a request **UNLESS**:

1. `age[y] <= 0.5 * age[x] + 7` OR
2. `age[y] > age[x]` OR
3. `age[y] > 100 && age[x] < 100`

The conditions themselves are identical — I just used "unless" instead of "if...not" to frame it more positively (from the perspective of when requests *are* sent rather than when they're blocked).

---

## Why I Rephrased It

I rephrased it as "unless" to make the logic flow more naturally when we later flip it to the positive case:

**Original blocking conditions** → **Positive sending conditions**

Person x **will send** a request when:

- `age[y] > 0.5 * age[x] + 7` (negation of condition 1)
- `age[y] <= age[x]` (negation of condition 2)
- (condition 3 becomes redundant)

This gives us the range: `0.5 * age[x] + 7 < age[y] <= age[x]`

---

Excellent question! Let me break down prefix sums step by step with concrete examples.

---

## What is a Prefix Sum?

A **prefix sum** at index `i` is the sum of all values from the start up to and including index `i`.

**Simple example with numbers:**

```Javascript
Original array: [3, 1, 4, 2, 5]

Prefix sum array:
prefix[0] = 3                    = 3
prefix[1] = 3 + 1                = 4
prefix[2] = 3 + 1 + 4            = 8
prefix[3] = 3 + 1 + 4 + 2        = 10
prefix[4] = 3 + 1 + 4 + 2 + 5    = 15

Result: [3, 4, 8, 10, 15]
```

---

## Applying Prefix Sum to Our Problem

In our problem, we're counting **people**, not adding numbers.

**Example: Let's say we have these people:**

```Javascript
ages = [16, 20, 20, 25, 30, 30, 30, 35]
```

***Step 1: Build the count array***

```Javascript
Age:     15  16  17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32  33  34  35
Count:   [0,  1,  0,  0,  0,  2,  0,  0,  0,  0,  1,  0,  0,  0,  0,  3,  0,  0,  0,  0,  1]
          ↑   ↑               ↑               ↑               ↑               ↑
         age 15: age 16:     age 20:        age 25:         age 30:         age 35:
         0 people 1 person   2 people       1 person        3 people        1 person
```

***Step 2: Build the prefix sum array***

`prefix[i]` = total number of people with age **≤ i**

```Javascript
Age:       15  16  17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32  33  34  35
Count:     [0,  1,  0,  0,  0,  2,  0,  0,  0,  0,  1,  0,  0,  0,  0,  3,  0,  0,  0,  0,  1]
Prefix:    [0,  1,  1,  1,  1,  3,  3,  3,  3,  3,  4,  4,  4,  4,  4,  7,  7,  7,  7,  7,  8]
```

Let me explain a few entries:

- `prefix[16] = 1`: There is **1 person** with age ≤ 16
- `prefix[20] = 3`: There are **3 people** with age ≤ 20 (one 16-year-old + two 20-year-olds)
- `prefix[25] = 4`: There are **4 people** with age ≤ 25 (1+2+1)
- `prefix[30] = 7`: There are **7 people** with age ≤ 30 (1+2+1+3)
- `prefix[35] = 8`: There are **8 people** with age ≤ 35 (all of them)

---

## The Magic: Counting People in a Range

Now here's the powerful part — we can count people in **any age range** instantly!

**The formula:**

```Javascript
Number of people with age in range (low, high] = prefix[high] - prefix[low]
```

Note: The range `(low, high]` means:

- **Exclude** `low` (the parenthesis means "not including")
- **Include** `high` (the bracket means "including")

---

## Examples of Range Queries

Using our prefix array from above:

**Example 1: How many people have age in range (20, 30]?**

- This means ages 21, 22, 23, ..., 30 (not including 20, including 30)

```Javascript
prefix[30] - prefix[20] = 7 - 3 = 4 people
```

Let's verify manually:

- Age 25: 1 person
- Age 30: 3 people
- Total: 4 people ✓

---

**Example 2: How many people have age in range (16, 25]?**

- This means ages 17, 18, 19, 20, 21, 22, 23, 24, 25

```Javascript
prefix[25] - prefix[16] = 4 - 1 = 3 people
```

Let's verify:

- Age 20: 2 people
- Age 25: 1 person
- Total: 3 people ✓

---

**Example 3: How many people have age in range (25, 35]?**

- This means ages 26, 27, 28, 29, 30, 31, 32, 33, 34, 35

```Javascript
prefix[35] - prefix[25] = 8 - 4 = 4 people
```

Let's verify:

- Age 30: 3 people
- Age 35: 1 person
- Total: 4 people ✓

---

## Why Does This Work?

Think of it visually:

```Javascript
prefix[high] = count of people with age ≤ high
prefix[low]  = count of people with age ≤ low

If we subtract:
prefix[high] - prefix[low] = people in range (low, high]
```

**Visual representation:**

```Javascript
Ages:  1 -------- low -------- high -------- 120
       |______________|__________|
       ↑              ↑          ↑
  prefix[low]    This part  prefix[high]
                 is what
                 we want!
```

By subtracting `prefix[low]`, we remove everyone aged ≤ low, leaving only people in the range (low, high].

---

## In Our LeetCode Solution

For a person aged 30, the valid recipient range is:

```Javascript
low = floor(0.5 * 30 + 7) = 22
high = 30

Valid recipients have age in range (22, 30]
This means ages: 23, 24, 25, 26, 27, 28, 29, 30
```

To count them:

```javascript
const validRecipients = prefix[30] - prefix[22];
```

**Why this is fast:**

- Without prefix sums: We'd need to loop through ages 23-30 and count → O(age range)
- With prefix sums: Just two array lookups and one subtraction → O(1)

---

## Complete Example Walkthrough

Let's trace through `ages = [16, 16]`:

**Build count:**

```Javascript
count[16] = 2
All others = 0
```

**Build prefix:**

```Javascript
prefix[0] = 0
prefix[1] = 0
...
prefix[15] = 0
prefix[16] = 2  (2 people with age ≤ 16)
prefix[17] = 2
...
prefix[120] = 2
```

**For sender age = 16:**

```Javascript
low = floor(0.5 * 16 + 7) = floor(15) = 15
high = 16

Valid recipients in range (15, 16]:
prefix[16] - prefix[15] = 2 - 0 = 2 people

But we subtract 1 (can't send to themselves):
validRecipients = 2 - 1 = 1

Total requests from age 16: count[16] * 1 = 2 * 1 = 2
```

So the answer is 2 ✓

---

## Summary

**Prefix sum allows us to answer "how many items in range (a, b]?" in O(1) time:**

1. Build prefix array once: O(max_value)
2. Answer any range query: `prefix[b] - prefix[a]` in O(1)

Without prefix sums, each range query would require looping through the range, making the solution much slower!

Excellent question! This line is the heart of the counting logic. Let me break it down step by step.

---

## The Line in Question

```javascript
totalRequests += count[age] * (validRecipients - 1);
```

Let's understand what each part means and **why** we use this formula.

---

## Breaking Down Each Component

### 1. `count[age]`

This is **how many people have this specific age**.

**Example:**

```javascript
ages = [20, 20, 20, 25, 30]

count[20] = 3  // 3 people are aged 20
count[25] = 1  // 1 person is aged 25
count[30] = 1  // 1 person is aged 30
```

---

### 2. `validRecipients`

This is **how many people fall in the valid age range** that a person of `age` can send requests to.

**Example:** For age = 20

```javascript
low = floor(0.5 * 20 + 7) = 17
high = 20

validRecipients = prefix[20] - prefix[17]
                = count of people with age in range (17, 20]
                = people aged 18, 19, or 20
```

From our example `ages = [20, 20, 20, 25, 30]`:

- People aged 18: 0
- People aged 19: 0  
- People aged 20: 3

So `validRecipients = 3`

---

### 3. Why `(validRecipients - 1)`?

Here's the crucial insight: **A person cannot send a friend request to themselves!**

When we count `validRecipients`, if the sender's age is within the valid range (which it always is, since `age[y] <= age[x]` is part of the condition), then **the sender is counted among the valid recipients**.

**We need to subtract 1 to exclude themselves.**

---

## Detailed Example

Let's work through `ages = [20, 20, 20]` step by step.

**Setup:**

- 3 people, all aged 20
- Let's call them Person A, Person B, and Person C

**For age = 20:**

***Step 1: Find valid recipients***

```javascript
low = floor(0.5 * 20 + 7) = 17
high = 20

Range: (17, 20] means ages 18, 19, 20

validRecipients = prefix[20] - prefix[17] = 3
```

This counts **all** people aged 18, 19, or 20, which includes:

- Person A (age 20) ✓
- Person B (age 20) ✓
- Person C (age 20) ✓

Total: 3 people

---

***Step 2: Calculate requests per person***

Each person aged 20 can send to `validRecipients` people, **except themselves**.

- Person A can send to: Person B, Person C (not to themselves) = **2 requests**
- Person B can send to: Person A, Person C (not to themselves) = **2 requests**
- Person C can send to: Person A, Person B (not to themselves) = **2 requests**

Each person sends to `(validRecipients - 1) = 3 - 1 = 2` others.

---

***Step 3: Multiply by number of senders***

```javascript
count[age] = 3  // 3 people aged 20

Each person aged 20 sends: (validRecipients - 1) = 2 requests

Total requests = count[age] * (validRecipients - 1)
               = 3 * 2
               = 6 requests
```

---

## Visual Representation

```Javascript
Age 20 has 3 people: [A, B, C]

Valid recipients for age 20: [A, B, C] (validRecipients = 3)

Person A → [B, C]     (sends 2 requests)
Person B → [A, C]     (sends 2 requests)  
Person C → [A, B]     (sends 2 requests)

Total: 3 people × 2 requests each = 6 requests
Formula: count[20] * (validRecipients - 1) = 3 * (3 - 1) = 6
```

---

## Another Example: Different Ages

Let's try `ages = [20, 20, 25]`

**For age = 20:**

```javascript
low = 17, high = 20
validRecipients = people aged (17, 20] = people aged 18, 19, 20
                = 2 people (both aged 20)

count[20] = 2  // 2 people aged 20

Requests from age 20:
= count[20] * (validRecipients - 1)
= 2 * (2 - 1)
= 2 * 1
= 2 requests
```

This means:

- Person A (age 20) → Person B (age 20): 1 request
- Person B (age 20) → Person A (age 20): 1 request

Total: 2 requests ✓

---

**For age = 25:**

```javascript
low = floor(0.5 * 25 + 7) = 19
high = 25

validRecipients = people aged (19, 25]
                = people aged 20, 21, 22, 23, 24, 25
                = 2 people aged 20 + 1 person aged 25
                = 3 people

count[25] = 1  // 1 person aged 25

Requests from age 25:
= count[25] * (validRecipients - 1)
= 1 * (3 - 1)
= 1 * 2
= 2 requests
```

This means:

- Person C (age 25) → Person A (age 20): 1 request
- Person C (age 25) → Person B (age 20): 1 request
- Person C (age 25) does NOT send to themselves

Total: 2 requests ✓

***Grand total: 2 + 2 = 4 requests***

---

## Why Not Just `count[age] * validRecipients`?

If we used `count[age] * validRecipients` without subtracting 1:

```javascript
// WRONG approach
For ages = [20, 20, 20]:
count[20] * validRecipients = 3 * 3 = 9 requests
```

This would include:

- Person A → Person A (invalid! ❌)
- Person A → Person B ✓
- Person A → Person C ✓
- Person B → Person A ✓
- Person B → Person B (invalid! ❌)
- Person B → Person C ✓
- Person C → Person A ✓
- Person C → Person B ✓
- Person C → Person C (invalid! ❌)

We'd be counting 3 invalid self-requests!

---

## The Formula Explained

```javascript
totalRequests += count[age] * (validRecipients - 1);
```

**In plain English:**

- Take all people of this age: `count[age]`
- Each can send to all valid recipients: `validRecipients`
- Except they can't send to themselves: `- 1`
- Multiply to get total requests from this age group

---

## Edge Case: What if validRecipients = 1?

```javascript
validRecipients = 1  // Only the sender themselves is in range

(validRecipients - 1) = 0

count[age] * 0 = 0 requests
```

This correctly handles the case where someone has no valid recipients except themselves.

---

## Summary Table

| Scenario              | count[age] | validRecipients |validRecipients - 1  | Total Requests |
|-----------------------|------------|-----------------|---------------------|----------------|
| `[20, 20, 20]` age 20 | 3          | 3               | 2                   | 3 × 2 = 6      |
| `[20, 20, 25]` age 20 | 2          | 2               | 1                   | 2 × 1 = 2      |
| `[20, 20, 25]` age 25 | 1          | 3               | 2                   | 1 × 2 = 2      |
| `[15]` age 15         | 1          | 1               | 0                   | 1 × 0 = 0      |

---

Does this clarify why we use `count[age] * (validRecipients - 1)`? The key insight is that we're counting requests from **all people of the same age**, and each must exclude themselves from their recipient list!
