# **LeetCode 881: Boats to Save People - A First-Principles Approach**

I'm excited to help you master this problem! Let's build your understanding from the ground up, focusing on the intuition that will help you recognize and solve similar problems in the future.

## **1. Problem Understanding**

At its core, this problem is asking you to play matchmaker. Imagine you're organizing an evacuation where you have a fleet of identical boats. Each boat has two constraints: it can hold at most two people, and the combined weight of those people cannot exceed a limit. Your goal is to minimize the number of boats needed to save everyone.

The key insight is that you're not just packing people randomly. You need a strategy that ensures you're using boats as efficiently as possible. Think of it like this: if you can pair heavy people with light people, you maximize boat usage. If someone is too heavy to share a boat with anyone, they must go alone.

## **2. Constraints of the Problem**

Let's examine what the constraints tell us about the problem space. We know that one person's weight is at most equal to the limit, which guarantees that every person can fit in a boat by themselves at worst. This is crucial because it means a solution always exists.

The array can contain up to 50,000 people, which tells us we need an efficient algorithm. A brute-force approach that tries every possible pairing would be far too slow. We also know that people can have the same weight, so we need to handle duplicates gracefully.

The constraint that boats hold at most two people is particularly important. It means we're not solving a complex bin-packing problem with variable capacity. We're simply deciding: can these two people share a boat, or must one go alone?

## **3. Keywords to Remember**

When you see problems in the future, watch for these signal words that might indicate a similar approach:

**Pairing or Matching** - The phrase "at most two people" suggests we're looking for optimal pairs.

**Minimize or Maximize** - When asked to minimize resources (boats) or maximize efficiency, think about greedy algorithms.

**Two ends of a spectrum** - Heavy versus light people hints at examining extremes, which often suggests a two-pointer approach.

**Sorting might help** - Problems involving comparisons or relative values often benefit from sorted data.

## **4. Breaking Down the Problem**

Let's decompose this problem into digestible questions. First, when would we definitely need separate boats? Answer: when even the lightest remaining person is too heavy to pair with the heaviest remaining person.

Second, when can we save a boat? Answer: when we can successfully pair a heavy person with a light person.

Third, how do we know we've made optimal choices? This is the crucial question. The key realization is that if the heaviest person can't pair with the lightest person, they can't pair with anyone. So we should send them alone. Conversely, if the heaviest can pair with the lightest, we should do so immediately because that's the only way the lightest person could possibly help us save a boat.

## **5. Pattern Identification**

This problem showcases the **Two Pointers** pattern, specifically what I call the "squeeze from both ends" variation. You'll see this pattern whenever you need to make decisions based on comparing elements from opposite ends of a sorted array.

The pattern works because sorting creates a natural ordering where we can make greedy decisions. By comparing the extremes (heaviest and lightest), we gain maximum information about what's possible. If the extremes can't pair up, nothing else will work for the heavy person. If they can pair up, we should do it immediately.

This is also related to the **Greedy Algorithm** pattern. We make the locally optimal choice at each step (either pairing or not pairing) without reconsidering previous decisions, and this leads to a globally optimal solution.

## **6. Step-by-Step Approach**

Let me walk you through the solution strategy as if we're solving it together at a whiteboard.

First, we sort the array of people by weight. Why? Because we need to quickly identify who is heaviest and who is lightest at any given moment. Sorting gives us this information in constant time throughout our algorithm.

Next, we establish two pointers: one at the beginning of the sorted array (pointing to the lightest person) and one at the end (pointing to the heaviest person). These pointers will move toward each other as we assign people to boats.

Now we enter our main decision loop. At each iteration, we examine the heaviest remaining person (right pointer) and the lightest remaining person (left pointer). We ask: can these two share a boat? Mathematically, is their combined weight at most the limit?

If yes, we've found an optimal pairing. We place both people on a boat, increment our boat counter by one, and move both pointers inward (left moves right, right moves left) because both people are now assigned.

If no, the heavy person is too heavy to pair with anyone remaining. How do we know? Because if they can't pair with the lightest person, they certainly can't pair with anyone heavier. So we give the heavy person their own boat, increment the boat counter, and move only the right pointer left.

We continue this process until our pointers meet or cross, which means we've assigned everyone to boats.

## **7. Code Implementation**

Let me show you how this translates into code, with detailed comments explaining the reasoning at each step.

**JavaScript Implementation:**

```javascript
/**
 * @param {number[]} people - array of people's weights
 * @param {number} limit - maximum weight capacity per boat
 * @return {number} - minimum number of boats needed
 */
function numRescueBoats(people, limit) {
    // Step 1: Sort people by weight (ascending order)
    // This allows us to efficiently access lightest and heaviest people
    people.sort((a, b) => a - b);
    
    // Step 2: Initialize two pointers at the extremes
    let left = 0;                    // Points to lightest person
    let right = people.length - 1;   // Points to heaviest person
    let boats = 0;                   // Counter for boats needed
    
    // Step 3: Process people from both ends toward the middle
    while (left <= right) {
        // Try to pair the heaviest with the lightest
        if (people[left] + people[right] <= limit) {
            // Success! They can share a boat
            // Move left pointer right (lightest person is assigned)
            left++;
        }
        // Whether paired or not, the heaviest person gets on a boat
        // If paired, both are assigned; if not, heavy person goes alone
        right--;
        boats++;
    }
    
    return boats;
}

// Example usage with detailed trace:
console.log(numRescueBoats([3, 2, 2, 1], 3)); // Output: 3
// Trace: sorted = [1,2,2,3]
// Iteration 1: 1+3=4 > 3, send 3 alone, boats=1, right=2
// Iteration 2: 1+2=3 ≤ 3, pair them, boats=2, left=1, right=1
// Iteration 3: 2 alone (left==right), boats=3, right=0
```

**Java Implementation:**

```java
class Solution {
    /**
     * Determines minimum boats needed to rescue all people
     * 
     * @param people Array of people's weights
     * @param limit Maximum weight capacity per boat
     * @return Minimum number of boats required
     */
    public int numRescueBoats(int[] people, int limit) {
        // Step 1: Sort the array to enable two-pointer approach
        // Time complexity: O(n log n) where n is number of people
        Arrays.sort(people);
        
        // Step 2: Initialize pointers at array boundaries
        int left = 0;                    // Lightest person index
        int right = people.length - 1;   // Heaviest person index
        int boats = 0;                   // Boat counter
        
        // Step 3: Greedily pair people from extremes
        // Continue until all people are assigned
        while (left <= right) {
            // Check if lightest and heaviest can share a boat
            if (people[left] + people[right] <= limit) {
                // They can share - move left pointer forward
                // This person is now assigned to a boat
                left++;
            }
            
            // The heaviest person always gets assigned in this iteration
            // Either paired with lightest (if condition true) or alone
            right--;
            boats++;
        }
        
        return boats;
    }
}
```

The beauty of this solution is in its simplicity. Notice how we always increment the boat counter and always move the right pointer, but we only move the left pointer conditionally. This asymmetry reflects the fact that the heavy person must be dealt with in every iteration, but the light person only gets assigned when a pairing is possible.

## **8. Complexity Analysis**

Let's analyze the efficiency of our solution through both time and space lenses.

**Time Complexity: O(n log n)** where n is the number of people.

The dominant operation is sorting the array, which takes O(n log n) time using efficient sorting algorithms like quicksort or mergesort. After sorting, our two-pointer traversal takes O(n) time because each pointer moves at most n positions, and they move toward each other, so we examine each element at most once. Since O(n log n) dominates O(n), our overall time complexity is O(n log n).

**Space Complexity: O(1) or O(n)** depending on the sorting algorithm.

We use only a constant amount of extra space for our pointers and counter variables, which is O(1). However, the space complexity of sorting depends on the implementation. Some sorting algorithms like quicksort use O(log n) stack space for recursion, while merge sort uses O(n) auxiliary space. In JavaScript, the sort method typically uses an optimized version of quicksort or timsort. In Java, Arrays.sort() uses dual-pivot quicksort for primitives. If we consider the sorting as an in-place operation, we achieve O(1) auxiliary space beyond the sorting overhead.

## **9. Alternative Solutions**

While our two-pointer solution is optimal, let's explore why other approaches fall short to deepen your understanding.

**Brute Force Pairing:** You might initially think to try every possible pairing of people and find the combination that uses the fewest boats. However, this would require checking all possible pairings, which is exponential in complexity. For n people, there are approximately n! ways to arrange them into pairs, making this approach completely impractical for the given constraints.

**Greedy Without Sorting:** Another tempting approach might be to iterate through the array and greedily pair each person with the first other person who fits with them. The problem is that without sorting, you might pair a light person with another light person early on, leaving heavy people unpaired later when they could have paired with those light people. Sorting ensures we make globally optimal decisions.

**Dynamic Programming:** You might wonder if this is a dynamic programming problem since we're optimizing (minimizing boats). However, DP is overkill here because the problem has the greedy choice property. Each decision we make (pair or don't pair) doesn't affect the optimality of future decisions in a way that requires remembering subproblem solutions. The two-pointer greedy approach is both simpler and more efficient.

The key insight that makes our solution work is recognizing that if the heaviest person can't pair with the lightest, they can't pair with anyone. This property allows us to make irreversible decisions without backtracking, which is the hallmark of a greedy algorithm.

## **10. Practice Recommendations**

To reinforce the two-pointer pattern and greedy thinking, I recommend practicing these problems in order:

**Similar Difficulty - Two Pointers:**

- **LeetCode 167: Two Sum II - Input Array Is Sorted** - This is the quintessential two-pointer problem. It will solidify your understanding of moving pointers based on comparisons.
- **LeetCode 15: 3Sum** - Extends two pointers to finding triplets, building on the same squeeze-from-ends principle.
- **LeetCode 11: Container With Most Water** - Another optimization problem using two pointers from extremes.

**Greedy Pattern Practice:**

- **LeetCode 455: Assign Cookies** - Very similar structure where you pair items optimally after sorting.
- **LeetCode 135: Candy** - A harder greedy problem that requires multiple passes, good for advanced practice.

**Combination Patterns:**

- **LeetCode 870: Advantage Shuffle** - Interestingly, this combines greedy thinking with strategic pairing, much like our boats problem but with a competitive twist.

I'd suggest mastering the first three before moving to the harder ones. The pattern recognition will become natural with practice.

## **11. Flowchart Design**

Let me create a visual representation of our algorithm's flow to help you internalize the decision-making process:

---

## **Summary: Key Takeaways**

Let me distill the most important insights from our exploration. The boats problem teaches us that optimization problems often benefit from examining extremes. By sorting and using two pointers, we transform a seemingly complex matching problem into a series of simple binary decisions.

The greedy principle at work here is powerful: if the heaviest person can't pair with the lightest, they can't pair with anyone, so send them alone. If they can pair with the lightest, do it immediately. This irreversible decision-making is what makes the algorithm both efficient and correct.

Remember the pattern: when you see problems involving pairing, matching, or finding optimal combinations in sorted or sortable data, think two pointers. When you can make locally optimal choices that lead to a globally optimal solution, think greedy.

The beauty of competitive programming is that once you internalize these patterns, you'll start seeing them everywhere. This problem isn't just about boats—it's about recognizing structure in optimization problems and exploiting that structure with elegant algorithms.

Do you have any questions about specific parts of the solution, or would you like me to walk through any of the example cases in more detail?

---
Great question! This statement touches on one of the most fundamental concepts in algorithm design, and understanding it deeply will transform how you approach optimization problems. Let me break this down carefully.

## **What Does "Locally Optimal" Mean?**

Imagine you're standing at a crossroads, and you need to make a decision right now based only on what you can see immediately in front of you. A locally optimal choice means you pick the best option available at this exact moment, without worrying about whether this choice might cause problems later down the road.

In our boats problem, at each step we're looking at just two people: the heaviest person remaining and the lightest person remaining. Our locally optimal decision is simple: if these two can fit together in a boat, pair them. If they can't, send the heavy person alone. We make this decision based solely on these two people right now, without thinking about how this might affect our future pairings.

## **What Does "Globally Optimal" Mean?**

A globally optimal solution means that when you step back and look at the entire problem after all decisions are made, you've achieved the absolute best possible result. In our case, this means using the minimum number of boats possible to save everyone—not just a pretty good number of boats, but the provably minimum number.

## **The Critical Question: Why Does Local Lead to Global Here?**

This is where it gets really interesting, because in many problems, making locally optimal choices does NOT lead to a globally optimal solution. Let me show you why it works here through a careful proof by contradiction.

Let's say we're at some point in our algorithm, and we're looking at the lightest person (let's call them Light) and the heaviest person (let's call them Heavy). Our algorithm says: if Light plus Heavy fits in the limit, pair them immediately.

Now, suppose someone challenges us and says, "Wait! Maybe you shouldn't pair Light with Heavy. Maybe Light should pair with someone else, or go alone, and Heavy should pair with someone else or go alone. Perhaps that would use fewer boats overall."

Let's think through this alternative carefully. If we don't pair Light with Heavy right now, what are our options? Well, Heavy still needs to get on a boat eventually. Heavy will either pair with someone else or go alone. But here's the crucial insight: Heavy is the heaviest person remaining. If Heavy can't fit with Light (the lightest person), then Heavy definitely can't fit with anyone else who remains, because everyone else is heavier than Light. So if Heavy can't pair with Light, Heavy must go alone no matter what we do.

On the flip side, if Heavy CAN fit with Light, and we choose not to pair them, what happens? Heavy will either go alone (wasting a potential pairing opportunity) or will pair with someone else who is heavier than Light. But if Heavy can pair with someone heavier than Light, then Heavy could definitely have paired with Light. So by not pairing them, we're either wasting a boat entirely (Heavy goes alone when they could have paired) or we're forcing someone heavier than Light to pair with Heavy, which means Light will have to pair with someone lighter than Heavy or go alone.

Here's where the magic happens: since Heavy is the heaviest, anyone Light pairs with instead will be lighter than Heavy, which means Light definitely could have paired with that person even if we had already sent Heavy with Light. We're not gaining anything by saving Light for someone else.

## **A Concrete Example to Make This Crystal Clear**

Let's use actual numbers to see why the greedy approach works. Suppose we have people with weights in sorted order as three, four, five, six, and seven, with a boat limit of ten.

Our algorithm would process this as follows. First, we look at seven (heaviest) and three (lightest). Can they pair? Yes, because seven plus three equals ten, which fits the limit. So we pair them immediately, using one boat.

Now we have four, five, and six remaining. We look at six (new heaviest) and four (new lightest). Can they pair? Yes, because six plus four equals ten. We pair them, using a second boat.

Finally, five is alone, so they get their own boat. Total: three boats.

Now let's say someone argues, "What if we made different choices? What if we sent seven alone, then paired three with six, and four with five?" Let's count: seven alone is one boat, three plus six equals nine so that's a second boat, and four plus five equals nine so that's a third boat. We still used three boats! The greedy approach matched the alternative.

But here's an even more telling example. Suppose the weights are two, three, seven, eight with a limit of ten. Our greedy algorithm pairs eight with two (equals ten), then pairs seven with three (equals ten), using two boats total. Could we do better by making different choices? Let's try: if eight goes alone (one boat), two must pair with someone or go alone. If two pairs with seven, that's nine, which works (second boat), then three goes alone (third boat). That's three boats instead of two! The greedy approach was better.

## **Why This Property Is Special (And Rare)**

The reason this works is because of a special property our problem has that many problems don't have. Once we sort the array, the heaviest person has a very limited set of valid partners. In fact, they can only pair with people light enough to fit with them. The lightest person is the best possible partner for the heaviest person, because if the lightest doesn't work, nothing works.

This creates what computer scientists call the "greedy choice property": making the locally optimal choice doesn't prevent us from making optimal choices in the remaining subproblem. When we pair the heaviest with the lightest (or send the heaviest alone), we can forget about them completely and solve the remaining problem optimally, knowing that our choice was correct.

Contrast this with a problem like finding the shortest path in a graph. If you greedily always take the shortest edge from your current position, you might end up taking a path that leads to a dead end, forcing you to backtrack. The locally optimal choice (shortest immediate edge) doesn't guarantee a globally optimal solution (shortest overall path). That's why shortest path problems require more sophisticated algorithms like Dijkstra's algorithm, which considers the cumulative distance, not just the next step.

## **The Proof Sketch: Why We Never Regret Our Decisions**

Here's the formal reasoning that makes this all work. Suppose our algorithm produces a solution using N boats. Could there exist a better solution using fewer boats?

For there to be a better solution, there would have to be some person that we sent alone who could have been paired with someone, thereby saving a boat. But our algorithm only sends someone alone when they cannot pair with the lightest remaining person. If they can't pair with the lightest, they can't pair with anyone, so sending them alone is the only option. Therefore, there's no boat we could have saved, and our solution is optimal.

Alternatively, suppose we paired two people together, but there was a better arrangement. For our pairing to be suboptimal, it would mean that both people in our pair could have found different partners, and this rearrangement would somehow save boats. But we only pair the heaviest with the lightest when they fit together. If we paired them with different people, we'd still use the same number of boats (each pair uses one boat), unless one of them could have joined a boat with two other people—but wait, boats can only hold two people maximum! So there's no way to save boats by rearranging pairs.

This is what we mean by "never reconsidering previous decisions." Once we make a choice, we prove that this choice cannot possibly be improved upon, so we never need to go back and change it. This irreversibility is the hallmark of a greedy algorithm that actually works.

Does this clarification help you understand why the greedy approach leads to the optimal solution? Can you think of any scenarios where you're still unsure whether the greedy choice would work?
