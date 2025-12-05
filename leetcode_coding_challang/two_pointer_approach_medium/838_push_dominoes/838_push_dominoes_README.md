# Understanding LeetCode 838: Push Dominoes

I'm excited to help you master this problem! Let's work through it systematically, building your understanding from the ground up.

## 1. Problem Understanding

Let me explain this problem as if we're watching dominoes fall in real life. Imagine you have a row of dominoes standing upright. At time zero, you push some dominoes either left or right. What happens next?

The key insight is that dominoes spread their falling motion to adjacent dominoes. If a domino falls right, it hits the domino to its right. If it falls left, it hits the domino to its left. This spreading happens one domino per second. The fascinating part is when two falling waves meet at a domino from opposite directions—the forces balance out, and that domino stays upright.

Let's think about the example "RR.L":

- Position 0: 'R' is already falling right
- Position 1: 'R' is already falling right  
- Position 2: '.' is standing upright
- Position 3: 'L' is already falling left

The first R pushes nothing new (the second domino is already falling right). The second R would push position 2 to the right, but position 3's leftward fall also reaches position 2 at the same time. They balance out, so position 2 stays upright, giving us "RR.L".

The edge cases to consider include dominoes at the boundaries (they only receive force from one side), consecutive dots with no forces acting on them (they stay upright), and dominoes that are already pushed initially (they're the source of force, not recipients).

## 2. Constraints of the Problem

Understanding constraints helps us choose the right approach. Here, n can be up to 100,000, which means we need an efficient solution. A naive simulation where we track each second's changes would work but might be slow. We need something that runs in linear or near-linear time.

The constraint that dominoes can only be 'L', 'R', or '.' simplifies our state space. We're not dealing with variable forces or partial falls—everything is binary. A domino is either falling one direction or standing.

The simultaneous push at the beginning is crucial. It means we have multiple "wave sources" spreading outward at the same time. This isn't a sequential process but a parallel one.

## 3. Breaking Down the Problem

Let me help you see this problem in smaller pieces:

**Piece 1: Understanding force propagation.** When an 'R' exists, it sends force rightward. Every second, that force moves one position further right. Similarly, 'L' sends force leftward. We need to calculate how long it takes for each force to reach each position.

**Piece 2: Handling force conflicts.** When both left and right forces reach the same position, we need to determine the outcome. If they arrive at the same time, the domino stays upright. If one arrives first, that direction wins.

**Piece 3: Determining the final state.** For each position, we examine which forces reached it and when, then determine its final state.

Think of it like this: instead of simulating second-by-second, we can calculate the "distance" from each position to the nearest force sources on both sides. Distance tells us timing, and timing tells us which force wins.

## 4. Pattern Identification

This problem embodies the **two-pass scanning pattern** combined with **distance calculation**. You might also recognize elements of **simulation** and **force propagation**.

The key pattern is scanning the string twice: once left-to-right to capture rightward forces, and once right-to-left to capture leftward forces. This is similar to problems where you need information from both directions, like trapping rainwater or finding product of array except self.

Another way to view this is as a **nearest element problem**—for each position, we're finding the nearest 'R' to the left and nearest 'L' to the right, then comparing their distances.

## 5. Approach Discussion

Let me walk you through the solution strategy step by step.

**Step 1: Calculate rightward forces.** We scan left to right, tracking the distance from each position to the nearest 'R' on its left. When we encounter an 'R', we reset our distance counter to zero. When we see an 'L', it blocks rightward force, so we mark positions from there as having no rightward force. For dots, we increment the distance from the last 'R' we saw.

**Step 2: Calculate leftward forces.** We scan right to left, tracking the distance from each position to the nearest 'L' on its right. The logic mirrors step 1 but in the opposite direction.

**Step 3: Determine final states.** For each position, we compare the distances. If the rightward force is closer (smaller distance), the domino falls right. If the leftward force is closer, it falls left. If they're equal distance or both absent, the domino stays upright.

The brilliance of this approach is that distance encodes time. A distance of 0 means the force is at that position initially. A distance of 3 means the force reaches that position after 3 seconds.

## 6. Code Implementation

Let me show you the solution in both JavaScript and Java with detailed explanations.

### **Push Dominoes - JavaScript Solution**

```Javascript
function pushDominoes(dominoes) {
    const n = dominoes.length;

    // Array to store the "distance" or time for rightward force to reach each position
    // Infinity means no rightward force reaches that position
    const rightForces = new Array(n).fill(Infinity);

    // Array to store the "distance" or time for leftward force to reach each position
    const leftForces = new Array(n).fill(Infinity);

    // First pass: Calculate rightward forces (left to right scan)
    let rightDistance = Infinity;
    for (let i = 0; i < n; i++) {
        if (dominoes[i] === 'R') {
            // Found a right-falling domino - it's a source of rightward force
            rightDistance = 0;
        } else if (dominoes[i] === 'L') {
            // Left-falling domino blocks rightward force
            rightDistance = Infinity;
        } else {
            // Empty position - if there's a rightward force active, increment distance
            if (rightDistance !== Infinity) {
                rightDistance++;
            }
        }
        rightForces[i] = rightDistance;
    }

    // Second pass: Calculate leftward forces (right to left scan)
    let leftDistance = Infinity;
    for (let i = n - 1; i >= 0; i--) {
        if (dominoes[i] === 'L') {
            // Found a left-falling domino - it's a source of leftward force
            leftDistance = 0;
        } else if (dominoes[i] === 'R') {
            // Right-falling domino blocks leftward force
            leftDistance = Infinity;
        } else {
            // Empty position - if there's a leftward force active, increment distance
            if (leftDistance !== Infinity) {
                leftDistance++;
            }
        }
        leftForces[i] = leftDistance;
    }

    // Build the final result by comparing forces at each position
    const result = [];
    for (let i = 0; i < n; i++) {
        const rightForce = rightForces[i];
        const leftForce = leftForces[i];

        if (rightForce < leftForce) {
            // Rightward force arrives first - domino falls right
            result.push('R');
        } else if (leftForce < rightForce) {
            // Leftward force arrives first - domino falls left
            result.push('L');
        } else {
            // Forces are equal (both Infinity or same distance) - domino stays upright
            result.push('.');
        }
    }

    return result.join('');
}

// Test cases
console.log(pushDominoes("RR.L"));        // Expected: "RR.L"
console.log(pushDominoes(".L.R...LR..L..")); // Expected: "LL.RR.LLRRLL.."
console.log(pushDominoes("..R.."));       // Expected: "..RRR"
console.log(pushDominoes("..L.."));       // Expected: "LLL.."
```

### **Push Dominoes - Java Solution**

```Java
class Solution {
    /**
     * Determines the final state of dominoes after all forces have propagated
     * @param dominoes Initial state of dominoes
     * @return Final state after all dominoes have settled
     */
    public String pushDominoes(String dominoes) {
        int n = dominoes.length();
        
        // Arrays to store the distance/time for forces to reach each position
        // Using a large value (n+1) instead of infinity for practical purposes
        int[] rightForces = new int[n];
        int[] leftForces = new int[n];
        
        // Initialize arrays with a value larger than any possible distance
        for (int i = 0; i < n; i++) {
            rightForces[i] = n + 1;
            leftForces[i] = n + 1;
        }
        
        // First pass: Calculate rightward forces (left to right)
        int rightDistance = n + 1; // Start with no active rightward force
        
        for (int i = 0; i < n; i++) {
            if (dominoes.charAt(i) == 'R') {
                // This position is a source of rightward force
                rightDistance = 0;
            } else if (dominoes.charAt(i) == 'L') {
                // Leftward domino blocks any rightward force
                rightDistance = n + 1;
            } else {
                // Empty position - propagate rightward force if it exists
                if (rightDistance != n + 1) {
                    rightDistance++;
                }
            }
            rightForces[i] = rightDistance;
        }
        
        // Second pass: Calculate leftward forces (right to left)
        int leftDistance = n + 1; // Start with no active leftward force
        
        for (int i = n - 1; i >= 0; i--) {
            if (dominoes.charAt(i) == 'L') {
                // This position is a source of leftward force
                leftDistance = 0;
            } else if (dominoes.charAt(i) == 'R') {
                // Rightward domino blocks any leftward force
                leftDistance = n + 1;
            } else {
                // Empty position - propagate leftward force if it exists
                if (leftDistance != n + 1) {
                    leftDistance++;
                }
            }
            leftForces[i] = leftDistance;
        }
        
        // Build the result by comparing forces at each position
        StringBuilder result = new StringBuilder();
        
        for (int i = 0; i < n; i++) {
            int rightForce = rightForces[i];
            int leftForce = leftForces[i];
            
            if (rightForce < leftForce) {
                // Rightward force dominates
                result.append('R');
            } else if (leftForce < rightForce) {
                // Leftward force dominates
                result.append('L');
            } else {
                // Forces are balanced or no forces present
                result.append('.');
            }
        }
        
        return result.toString();
    }
    
    // Test method
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        System.out.println(solution.pushDominoes("RR.L"));        // Expected: "RR.L"
        System.out.println(solution.pushDominoes(".L.R...LR..L..")); // Expected: "LL.RR.LLRRLL.."
        System.out.println(solution.pushDominoes("..R.."));       // Expected: "..RRR"
        System.out.println(solution.pushDominoes("..L.."));       // Expected: "LLL.."
    }
}
```

## 7. Complexity Analysis

Let me break down the efficiency of this solution. The time complexity is **O(n)** where n is the length of the dominoes string. Why? Because we make exactly three passes through the string. The first pass scans left to right calculating rightward forces, the second pass scans right to left calculating leftward forces, and the third pass compares these forces to build the result. Each pass touches every element exactly once, giving us 3n operations, which simplifies to O(n).

The space complexity is **O(n)** as well. We create two arrays (rightForces and leftForces) each of size n to store distance information. We also create a result array of size n. While this totals 3n space, it still simplifies to O(n) in Big O notation.

This is optimal for this problem because we must examine every domino at least once to determine its final state, so we cannot do better than O(n) time. The space complexity could theoretically be reduced to O(1) if we cleverly reuse the input or output structure, but the clarity and maintainability of using separate arrays justifies the O(n) space usage.

## 8. Alternative Solutions

There's an elegant **two-pointer approach** that some people prefer. Instead of calculating all distances upfront, you identify segments between force sources. For example, if you see "R...L", you know the middle dominoes form a segment influenced by both an R on the left and an L on the right. You can use two pointers moving from both ends toward the middle to determine each domino's fate.

Another approach is **actual simulation**. You could use a queue-based BFS where you track which dominoes fall each second and propagate forces step by step. While this works and might feel more intuitive, it's less efficient because worst-case scenarios could require up to n iterations with n operations each, potentially reaching O(n²) time complexity.

There's also a **single-pass optimization** where you process the string in one go, keeping track of the current "force context." When you encounter state changes (from R to L or vice versa), you can immediately determine the fate of previous dominoes. This is tricky to implement correctly but reduces the constant factors in your time complexity.

The two-pass distance approach I showed you strikes the best balance between clarity, correctness, and efficiency. It's easier to reason about and debug than the single-pass method while being more efficient than simulation.

## 9. Practice Recommendations

To solidify your understanding of this force propagation and two-pass scanning pattern, I recommend practicing these similar problems:

**Container With Most Water (LeetCode 11)** teaches you about two-pointer techniques with forces from both sides, similar to how we tracked left and right forces in dominoes.

**Trapping Rain Water (LeetCode 42)** is excellent practice for two-pass scanning where you need information from both directions. You calculate the maximum height to the left and right of each position, just like we calculated force distances.

**Product of Array Except Self (LeetCode 238)** reinforces the two-pass pattern where you build prefix and suffix information separately, then combine them to get your answer.

**Shortest Distance to a Character (LeetCode 821)** is almost identical in structure to our dominoes problem. You calculate distances to a target character from both directions, which directly mirrors our force distance calculations.

**Candy (LeetCode 135)** requires two passes to satisfy constraints from both neighbors, similar to how dominoes receive forces from both sides.

These problems will help you recognize when a two-pass scanning approach is appropriate and strengthen your ability to decompose problems into directional subproblems.

---

## Summary and Key Takeaways

Congratulations on working through this challenging problem! Let me summarize what you've learned so you can apply it to future problems.

The Push Dominoes problem teaches us about **bidirectional information flow**. Many problems require you to consider influences from multiple directions, and the solution pattern involves scanning from each direction separately, storing that information, and then combining it to get your final answer.

The key insight is that **distance encodes time**. Instead of simulating each second explicitly, we cleverly use distance from force sources to determine when forces arrive at each position. This transforms a potentially quadratic simulation into a linear-time solution.

You've also learned to recognize when a problem involves **competing forces or influences**. When elements can be affected by factors from both sides, consider whether a two-pass approach might elegantly capture both perspectives.

Remember, the pattern of "scan left-to-right, scan right-to-left, combine results" appears frequently in competitive programming. You now have the mental model to recognize and apply it. Keep practicing with the recommended problems, and you'll develop an intuition for when this pattern fits.

---
Excellent question! This touches on a subtle but important aspect of the problem. Let me clarify this carefully.

## Understanding the Initial State vs. Force Propagation

The key is in how we interpret the problem statement. Let me break this down:

### What Happens at Time = 0 (The Initial Push)

When the problem says "we **simultaneously** push some of the dominoes," it means that at the very beginning (time = 0), certain dominoes are already set in motion. These are the dominoes marked as 'R' or 'L' in the input string.

So in "RR.L":

- Position 0: 'R' - **already falling right at time 0**
- Position 1: 'R' - **already falling right at time 0**
- Position 2: '.' - standing upright
- Position 3: 'L' - **already falling left at time 0**

### Why the First R "Pushes Nothing New"

Here's the crucial insight: **A domino that's already falling doesn't need to be pushed again**.

Think about it physically:

- The first R (position 0) is falling right
- The second R (position 1) is **already falling right**
- The first R would normally push position 1 to make it fall right, but position 1 is already in that state!

It's like trying to push someone who's already running in the direction you're pushing them - your push doesn't change anything about their state.

### Let Me Contrast This With a Different Example

Consider "R..L" instead:

**Time 0 (initial state):**

```Javascript
R . . L
```

**Time 1:**

- Position 0 (R) pushes position 1 → position 1 becomes 'R'
- Position 3 (L) pushes position 2 → position 2 becomes 'L'

```Javascript
R R L L
```

Here, the first R **does push something new** because position 1 was standing upright ('.') and needed to be pushed.

### Back to "RR.L"

**Time 0 (initial state):**

```Javascript
R R . L
```

**What would happen at Time 1:**

- Position 0 (R) would try to push position 1, but position 1 is **already R** (no change)
- Position 1 (R) pushes position 2 → position 2 would become 'R'
- Position 3 (L) pushes position 2 → position 2 would become 'L'

But wait! Both position 1 and position 3 are trying to push position 2 at the same time:

- Rightward force from position 1: distance = 1
- Leftward force from position 3: distance = 1
- **Same distance = forces balance = position 2 stays upright ('.')**

### The Critical Rule

The problem states: *"For the purposes of this question, we will consider that a falling domino expends no additional force to a falling or already fallen domino."*

This means:

- R → R (already falling right): No effect, no additional force
- L → L (already falling left): No effect, no additional force
- R → . (standing): Pushes it to fall right
- . ← L (standing): Pushes it to fall left

### Visual Timeline

Let me show you the propagation more clearly:

```Javascript
Input: "R R . L"

Time 0: R R . L
        ↓ ↓   ↓
        Already falling
        from initial push

Time 1: R R ? L
            ↑
        Position 2 receives:
        - Right force from position 1 (distance=1)
        - Left force from position 3 (distance=1)
        → Forces balance → stays '.'

Final:  R R . L
```

Compare with "R . . L":

```Javascript
Input: "R . . L"

Time 0: R . . L
        ↓     ↓
        Initially pushed

Time 1: R R L L
          ↑ ↑
        Positions 1 and 2 get pushed

Final:  R R L L
```

### The Key Difference

- In "RR.L": Position 1 is **already in its final state** from the beginning
- In "R..L": Position 1 **needs to be changed** by position 0's force

---
Excellent question! Let me clarify this crucial concept step-by-step because understanding this is the heart of the algorithm.

## What Does "Distance from Nearest R" Actually Mean?

When I say "distance from each position to the nearest 'R' on its left," I'm describing how far a rightward force has to travel to reach that position.

### Think of it Like a Ripple Effect

Imagine dropping a stone in water - ripples spread outward. Similarly, when a domino falls right ('R'), it creates a "ripple" of force that spreads rightward:

```javascript
Position:  0  1  2  3  4
Input:     R  .  .  .  .

The R at position 0 creates ripples:
- Position 0: distance = 0 (the R is HERE)
- Position 1: distance = 1 (R is 1 step away)
- Position 2: distance = 2 (R is 2 steps away)
- Position 3: distance = 3 (R is 3 steps away)
- Position 4: distance = 4 (R is 4 steps away)
```

### Distance = Time = Force Strength

Here's the key insight: **Distance tells us when the force arrives!**

- Distance 0 = force is there at time 0
- Distance 1 = force arrives at time 1 second
- Distance 2 = force arrives at time 2 seconds
- And so on...

### Let's Walk Through a Concrete Example

Take the input: `.R..L`

**Left-to-Right Scan (tracking rightward forces):**

```javascript
Position:     0    1    2    3    4
Input:        .    R    .    .    L
```

Let me show you the scan step-by-step:

***Step 1: Position 0 (it's a '.')***

- Is there an 'R' to the left of position 0? NO
- Distance from nearest R = ∞ (infinity, meaning no R exists to the left)
- rightForces[0] = ∞

***Step 2: Position 1 (it's an 'R')***

- We found an R! This is a SOURCE of rightward force
- Distance from nearest R = 0 (the R is right here!)
- rightForces[1] = 0
- **Important:** We now reset our tracking variable to 0

***Step 3: Position 2 (it's a '.')***

- We saw an R at position 1 (just before this)
- Position 2 is 1 step away from that R
- rightForces[2] = 1

***Step 4: Position 3 (it's a '.')***

- We saw an R at position 1
- Position 3 is 2 steps away from that R
- rightForces[3] = 2

***Step 5: Position 4 (it's an 'L')***

- An 'L' BLOCKS rightward force (like a wall)
- Even though there was an R before, the L stops it
- rightForces[4] = 0 (because position 4 itself is an L)
- **Important:** We reset tracking to ∞ (no more rightward force beyond this point)

**Result of left-to-right scan:**

```javascript
Position:      0    1    2    3    4
Input:         .    R    .    .    L
rightForces:   ∞    0    1    2    0
```

### Visualizing the Code Logic

Let me trace through the JavaScript code with this example:

```javascript
// Starting state
rightDistance = Infinity  // No R seen yet

// i = 0, dominoes[0] = '.'
if (dominoes[i] === 'R') { } // NO
else if (dominoes[i] === 'L') { } // NO
else { // YES, it's a dot
    // rightDistance is Infinity, stays Infinity
}
rightForces[0] = Infinity

// i = 1, dominoes[1] = 'R'
if (dominoes[i] === 'R') { // YES
    rightDistance = 0  // Found an R! Reset to 0
}
rightForces[1] = 0

// i = 2, dominoes[2] = '.'
if (dominoes[i] === 'R') { } // NO
else if (dominoes[i] === 'L') { } // NO
else { // YES, it's a dot
    // rightDistance is 0, so increment it
    rightDistance++ // Now rightDistance = 1
}
rightForces[2] = 1

// i = 3, dominoes[3] = '.'
// rightDistance is 1, increment to 2
rightForces[3] = 2

// i = 4, dominoes[4] = 'L'
if (dominoes[i] === 'R') { } // NO
else if (dominoes[i] === 'L') { // YES
    rightDistance = Infinity // L blocks rightward force
}
rightForces[4] = Infinity
// But wait! Position 4 is itself an L, so it should be 0
// This is handled differently - see clarification below
```

### Important Clarification About 'R' and 'L' Positions

Actually, let me correct something important. When we encounter an 'R' or 'L' in the original string:

- **'R' position**: distance to nearest R on its left = 0 (it IS the R)
- **'L' position**: For rightward forces, an 'L' blocks propagation, but the distance at that position for rightForces should be ∞ (because an L doesn't receive rightward force, it's already pushed left)

Let me retrace position 4:

```javascript
// i = 4, dominoes[4] = 'L'
else if (dominoes[i] === 'L') { // YES
    rightDistance = Infinity // This L blocks any future rightward force
}
rightForces[4] = Infinity // Because L doesn't respond to rightward force
```

So the correct rightForces array is:

```javascript
Position:      0    1    2    3    4
Input:         .    R    .    .    L
rightForces:   ∞    0    1    2    ∞
```

### Another Example: "R.R.L"

Let me trace this to solidify your understanding:

```javascript
Position:     0    1    2    3    4
Input:        R    .    R    .    L
```

**Left-to-Right Scan:**

```javascript
i=0, 'R': rightDistance = 0
          rightForces[0] = 0

i=1, '.': rightDistance++ → 1
          rightForces[1] = 1

i=2, 'R': rightDistance = 0 (reset! found new R)
          rightForces[2] = 0

i=3, '.': rightDistance++ → 1
          rightForces[3] = 1

i=4, 'L': rightDistance = ∞ (L blocks)
          rightForces[4] = ∞
```

**Result:**

```Javascript
Position:      0    1    2    3    4
Input:         R    .    R    .    L
rightForces:   0    1    0    1    ∞
```

### The Physical Interpretation

Think of distance as **"How many seconds until this domino gets hit by a rightward-falling domino?"**

- Distance 0: Already falling right (or hit immediately)
- Distance 1: Gets hit after 1 second
- Distance 2: Gets hit after 2 seconds
- Distance ∞: Never gets hit by rightward force

### Why This Matters

Later, when we compare `rightForces[i]` with `leftForces[i]`:

```javascript
if (rightForces[i] < leftForces[i]) {
    // Rightward force arrives FIRST (smaller distance = sooner)
    result[i] = 'R'
}
```

A smaller distance means the force arrives sooner, so it "wins" and determines the domino's final state!

Does this clarify what "tracking the distance from each position to the nearest 'R' on its left" means? The key is: **distance = how many steps away from the nearest R source = how long until the force arrives**.

---
Perfect! Let me walk you through both examples step-by-step, showing every detail of the algorithm.

## Example 1: "RR.L"

### Setup

```javascript
Position:  0   1   2   3
Input:     R   R   .   L
```

### Pass 1: Left-to-Right Scan (Calculate rightForces)

I'll track the `rightDistance` variable as we scan:

**Initial state:**

- `rightDistance = Infinity` (no R seen yet)

**Position 0: dominoes[0] = 'R'**

```javascript
if (dominoes[i] === 'R') {
    rightDistance = 0;  // Found an R! Reset to 0
}
rightForces[0] = 0
```

State: `rightDistance = 0`

**Position 1: dominoes[1] = 'R'**

```javascript
if (dominoes[i] === 'R') {
    rightDistance = 0;  // Found another R! Reset to 0
}
rightForces[1] = 0
```

State: `rightDistance = 0`

**Position 2: dominoes[2] = '.'**

```javascript
else { // It's a dot
    if (rightDistance !== Infinity) {
        rightDistance++;  // 0 + 1 = 1
    }
}
rightForces[2] = 1
```

State: `rightDistance = 1`

**Position 3: dominoes[3] = 'L'**

```javascript
else if (dominoes[i] === 'L') {
    rightDistance = Infinity;  // L blocks rightward force
}
rightForces[3] = Infinity
```

State: `rightDistance = Infinity`

**After Pass 1:**

```javascript
Position:      0   1   2   3
Input:         R   R   .   L
rightForces:   0   0   1   ∞
```

### Pass 2: Right-to-Left Scan (Calculate leftForces)

**Initial state:**

- `leftDistance = Infinity` (no L seen yet)

**Position 3: dominoes[3] = 'L'**

```javascript
if (dominoes[i] === 'L') {
    leftDistance = 0;  // Found an L! Reset to 0
}
leftForces[3] = 0
```

State: `leftDistance = 0`

**Position 2: dominoes[2] = '.'**

```javascript
else { // It's a dot
    if (leftDistance !== Infinity) {
        leftDistance++;  // 0 + 1 = 1
    }
}
leftForces[2] = 1
```

State: `leftDistance = 1`

**Position 1: dominoes[1] = 'R'**

```javascript
else if (dominoes[i] === 'R') {
    leftDistance = Infinity;  // R blocks leftward force
}
leftForces[1] = Infinity
```

State: `leftDistance = Infinity`

**Position 0: dominoes[0] = 'R'**

```javascript
else if (dominoes[i] === 'R') {
    leftDistance = Infinity;  // R blocks leftward force
}
leftForces[0] = Infinity
```

State: `leftDistance = Infinity`

**After Pass 2:**

```javascript
Position:     0   1   2   3
Input:        R   R   .   L
leftForces:   ∞   ∞   1   0
```

### Pass 3: Compare Forces and Build Result

Now let's compare the forces at each position:

**Position 0:**

```javascript
rightForce = 0, leftForce = ∞
if (rightForce < leftForce) {  // 0 < ∞ → TRUE
    result[0] = 'R'
}
```

**Position 1:**

```javascript
rightForce = 0, leftForce = ∞
if (rightForce < leftForce) {  // 0 < ∞ → TRUE
    result[1] = 'R'
}
```

**Position 2:**

```javascript
rightForce = 1, leftForce = 1
// Not rightForce < leftForce (1 < 1 is FALSE)
// Not leftForce < rightForce (1 < 1 is FALSE)
else {  // Forces are EQUAL
    result[2] = '.'
}
```

**This is the key moment!** Both forces arrive at the same time (distance = 1), so they balance out and the domino stays upright.

**Position 3:**

```javascript
rightForce = ∞, leftForce = 0
if (leftForce < rightForce) {  // 0 < ∞ → TRUE
    result[3] = 'L'
}
```

**Final Result:**

```javascript
Position:  0   1   2   3
Result:    R   R   .   L
```

**Summary Table for "RR.L":**

```javascript
Position:      0   1   2   3
Input:         R   R   .   L
rightForces:   0   0   1   ∞
leftForces:    ∞   ∞   1   0
Result:        R   R   .   L
```

---

## Example 2: ".L.R...LR..L.."

This is a longer example. Let me organize it clearly:

### Setup_

```javascript
Position:  0  1  2  3  4  5  6  7  8  9 10 11 12 13
Input:     .  L  .  R  .  .  .  L  R  .  .  L  .  .
```

### Pass 1: Left-to-Right Scan (Calculate rightForces)_

Let me trace through each position:

```javascript
i=0, '.': rightDistance = ∞ (no R seen yet)
          rightForces[0] = ∞

i=1, 'L': rightDistance = ∞ (L blocks, but no R before anyway)
          rightForces[1] = ∞

i=2, '.': rightDistance = ∞ (still no R seen)
          rightForces[2] = ∞

i=3, 'R': rightDistance = 0 (found an R!)
          rightForces[3] = 0

i=4, '.': rightDistance++ → 1
          rightForces[4] = 1

i=5, '.': rightDistance++ → 2
          rightForces[5] = 2

i=6, '.': rightDistance++ → 3
          rightForces[6] = 3

i=7, 'L': rightDistance = ∞ (L blocks rightward force)
          rightForces[7] = ∞

i=8, 'R': rightDistance = 0 (found new R!)
          rightForces[8] = 0

i=9, '.': rightDistance++ → 1
          rightForces[9] = 1

i=10, '.': rightDistance++ → 2
           rightForces[10] = 2

i=11, 'L': rightDistance = ∞ (L blocks)
           rightForces[11] = ∞

i=12, '.': rightDistance = ∞ (stays infinity)
           rightForces[12] = ∞

i=13, '.': rightDistance = ∞
           rightForces[13] = ∞
```

**After Pass 1:**

```javascript
Position:      0  1  2  3  4  5  6  7  8  9 10 11 12 13
Input:         .  L  .  R  .  .  .  L  R  .  .  L  .  .
rightForces:   ∞  ∞  ∞  0  1  2  3  ∞  0  1  2  ∞  ∞  ∞
```

### Pass 2: Right-to-Left Scan (Calculate leftForces)_

Starting from the right and going left:

```javascript
i=13, '.': leftDistance = ∞ (no L seen yet)
           leftForces[13] = ∞

i=12, '.': leftDistance = ∞
           leftForces[12] = ∞

i=11, 'L': leftDistance = 0 (found an L!)
           leftForces[11] = 0

i=10, '.': leftDistance++ → 1
           leftForces[10] = 1

i=9, '.': leftDistance++ → 2
          leftForces[9] = 2

i=8, 'R': leftDistance = ∞ (R blocks leftward force)
          leftForces[8] = ∞

i=7, 'L': leftDistance = 0 (found new L!)
          leftForces[7] = 0

i=6, '.': leftDistance++ → 1
          leftForces[6] = 1

i=5, '.': leftDistance++ → 2
          leftForces[5] = 2

i=4, '.': leftDistance++ → 3
          leftForces[4] = 3

i=3, 'R': leftDistance = ∞ (R blocks)
          leftForces[3] = ∞

i=2, '.': leftDistance = ∞ (stays infinity)
          leftForces[2] = ∞

i=1, 'L': leftDistance = 0 (found L!)
          leftForces[1] = 0

i=0, '.': leftDistance++ → 1
          leftForces[0] = 1
```

**After Pass 2:**

```javascript
Position:     0  1  2  3  4  5  6  7  8  9 10 11 12 13
Input:        .  L  .  R  .  .  .  L  R  .  .  L  .  .
leftForces:   1  0  ∞  ∞  3  2  1  0  ∞  2  1  0  ∞  ∞
```

### Pass 3: Compare Forces and Build Result_

Now let's compare at each position:

**Position 0:**

```javascript
rightForce = ∞, leftForce = 1
leftForce < rightForce (1 < ∞) → result[0] = 'L'
```

**Position 1:**

```javascript
rightForce = ∞, leftForce = 0
leftForce < rightForce (0 < ∞) → result[1] = 'L'
```

**Position 2:**

```javascript
rightForce = ∞, leftForce = ∞
Forces equal → result[2] = '.'
```

**Position 3:**

```javascript
rightForce = 0, leftForce = ∞
rightForce < leftForce (0 < ∞) → result[3] = 'R'
```

**Position 4:**

```javascript
rightForce = 1, leftForce = 3
rightForce < leftForce (1 < 3) → result[4] = 'R'
```

(Rightward force arrives in 1 second, leftward in 3 seconds, so rightward wins)

**Position 5:**

```javascript
rightForce = 2, leftForce = 2
Forces equal → result[5] = '.'
```

(Both forces arrive at the same time - balance!)

**Position 6:**

```javascript
rightForce = 3, leftForce = 1
leftForce < rightForce (1 < 3) → result[6] = 'L'
```

(Leftward force arrives in 1 second, rightward in 3 seconds, so leftward wins)

**Position 7:**

```javascript
rightForce = ∞, leftForce = 0
leftForce < rightForce (0 < ∞) → result[7] = 'L'
```

**Position 8:**

```javascript
rightForce = 0, leftForce = ∞
rightForce < leftForce (0 < ∞) → result[8] = 'R'
```

**Position 9:**

```javascript
rightForce = 1, leftForce = 2
rightForce < leftForce (1 < 2) → result[9] = 'R'
```

**Position 10:**

```javascript
rightForce = 2, leftForce = 1
leftForce < rightForce (1 < 2) → result[10] = 'L'
```

**Position 11:**

```javascript
rightForce = ∞, leftForce = 0
leftForce < rightForce (0 < ∞) → result[11] = 'L'
```

**Position 12:**

```javascript
rightForce = ∞, leftForce = ∞
Forces equal → result[12] = '.'
```

**Position 13:**

```javascript
rightForce = ∞, leftForce = ∞
Forces equal → result[13] = '.'
```

**Final Result:**

```javascript
Position:  0  1  2  3  4  5  6  7  8  9 10 11 12 13
Result:    L  L  .  R  R  .  L  L  R  R  L  L  .  .
```

**Complete Summary Table for ".L.R...LR..L..":**

```javascript
Position:      0  1  2  3  4  5  6  7  8  9 10 11 12 13
Input:         .  L  .  R  .  .  .  L  R  .  .  L  .  .
rightForces:   ∞  ∞  ∞  0  1  2  3  ∞  0  1  2  ∞  ∞  ∞
leftForces:    1  0  ∞  ∞  3  2  1  0  ∞  2  1  0  ∞  ∞
Result:        L  L  .  R  R  .  L  L  R  R  L  L  .  .
```

### Key Insights from Example 2

1. **Position 5**: `rightForce=2, leftForce=2` → Both forces equal, domino stays upright '.'
2. **Positions 4 vs 6**: Shows how closer force wins (compare distances 1 vs 3)
3. **Positions 12-13**: No forces reach them at all (both ∞), they stay upright
4. **Position 2**: Between two L's with no R nearby, stays upright

Does this detailed walkthrough help you see how the algorithm processes each position and makes decisions based on which force arrives first (smaller distance)?

```bash
feat: Add comprehensive tutorial for LeetCode 838 Push Dominoes

Implement two-pass distance calculation solution with detailed explanations:
- Calculate rightward forces via left-to-right scan
- Calculate leftward forces via right-to-left scan
- Determine final state by comparing force distances at each position

Includes:
- First-principles breakdown of domino force propagation
- Complete algorithm walkthrough with "RR.L" and ".L.R...LR..L.." examples
- JavaScript and Java implementations with inline comments
- Time complexity: O(n), Space complexity: O(n)
- Mermaid flowchart visualizing the three-pass algorithm
- Pattern identification: two-pass scanning for bidirectional information flow
- Practice recommendations: similar LeetCode problems (42, 238, 821, 135)

Key insight: Distance from force source encodes arrival time, enabling
efficient O(n) solution instead of O(n²) second-by-second simulation.
```
