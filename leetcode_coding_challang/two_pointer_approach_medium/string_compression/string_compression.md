# **443. String Compression**

Let me guide you through solving this String Compression problem step by step, focusing on building your understanding of the underlying patterns and strategies.

## 1. Problem Understanding

Think of this problem as organizing a messy bookshelf where you have groups of identical books scattered around. Your job is to compress the representation by writing each book type once, followed by how many copies you have, but you must do this work directly on the original shelf without using extra space.

The key insight is that we're performing **in-place compression** - we're modifying the input array directly rather than creating a new one. This is similar to how you might reorganize items in a limited storage space where you can't afford to use additional containers.

The algorithm works by identifying consecutive groups of identical characters and replacing each group with the character followed by its count (if the count is greater than 1). For example, "aaa" becomes "a3", but "a" stays as "a".

## 2. Constraints of the Problem

Understanding constraints helps us choose the right approach and avoid potential pitfalls:

- **Array length**: 1 to 2000 characters - this tells us we don't need to worry about extremely large inputs, so O(n) solutions are perfectly acceptable
- **Character types**: lowercase/uppercase letters, digits, symbols - this means we can't make assumptions about ASCII values or sorting
- **Constant extra space**: This is the crucial constraint that eliminates approaches using additional arrays or strings
- **In-place modification**: We must modify the original array, which suggests we'll need careful pointer management
- **Return new length**: The compressed result might be shorter than the original, so we need to track the new boundary

These constraints point us toward a **two-pointer approach** where we read from one position and write to another within the same array.

## 3. Breaking Down the Problem

Let's decompose this into manageable pieces:

**Step 1: Group Detection** - We need to identify consecutive identical characters. Think of this as scanning through the array and asking "how many of the same character do I see in a row?"

**Step 2: Compression Logic** - For each group, we decide what to write: just the character (if count = 1) or the character plus its count (if count > 1).

**Step 3: Count Representation** - When counts are 10 or higher, we need to break them into individual digit characters. For example, count 12 becomes characters '1' and '2'.

**Step 4: In-Place Writing** - We need to carefully manage where we're reading from versus where we're writing to, ensuring we don't overwrite data we haven't processed yet.

## 4. Pattern Identification

This problem exemplifies the **Two-Pointer Pattern**, specifically the "slow and fast pointer" variant. Here's why this pattern fits perfectly:

- **Fast pointer (read pointer)**: Scans through the array to find groups of consecutive characters
- **Slow pointer (write pointer)**: Marks where we should write the compressed result

This is the same pattern you'd use for removing duplicates from a sorted array or partitioning arrays. The key insight is that the compressed result is always shorter than or equal to the original, so we can safely write our result to the beginning of the same array.

The pattern also includes **run-length encoding**, a fundamental compression technique where we replace sequences of repeated elements with the element and its count.

## 5. Approach Discussion

Let me walk you through the step-by-step approach:

**Initialize pointers**: Start with a write pointer at position 0 and a read pointer that will scan through groups.

**Group processing loop**: For each position in the array, determine how many consecutive identical characters we have. This involves extending our scan until we find a different character or reach the end.

**Write the character**: Always write the character itself to the current write position.

**Handle the count**: If the group size is greater than 1, we need to write the count. Here's where it gets interesting - if the count is 10 or more, we need to convert it to individual digit characters.

**Advance pointers**: Move the write pointer forward by however many characters we just wrote, and move the read pointer to the start of the next group.

**Return result**: The write pointer's final position represents the length of our compressed array.

The beauty of this approach is that we're always writing to positions that are at or before our current read position, ensuring we never overwrite unprocessed data.

## 6. Code Implementation

## 7. Complexity Analysis

**Time Complexity: O(n)** - We visit each character in the input array exactly once. Even though we have nested loops, the inner while loop's iterations across all outer loop iterations sum up to n (each character is read exactly once). This is a crucial insight: the fast pointer never backtracks, ensuring linear time complexity.

**Space Complexity: O(1)** - We use only a constant amount of extra space regardless of input size. The variables `writeIndex`, `readIndex`, `currentChar`, `count`, and `countStr` all use constant space. The string conversion for multi-digit counts might seem like it uses extra space, but since counts are bounded by the input length (maximum 2000), this is still considered constant space in the context of the problem.

This complexity profile makes our solution highly efficient and suitable for large inputs within the given constraints.

## 8. Alternative Solutions

**Approach 1: Stack-based solution** - You could use a stack to track characters and their counts, but this would violate the constant space requirement and have O(n) space complexity.

**Approach 2: Recursive approach** - While elegant, recursion would use O(n) space on the call stack in the worst case (when all characters are different), again violating the space constraint.

**Approach 3: Multiple passes** - You could make one pass to count groups and another to write results, but this would be O(2n) time, which is still O(n) but less efficient than our single-pass solution.

**Optimization considerations**: Our current solution is already optimal for the given constraints. The two-pointer approach with single-pass scanning represents the most efficient solution possible for this problem.

## 9. Practice Recommendations

To master this pattern, practice these similar problems:

**Two-Pointer Pattern Problems**:

- **26. Remove Duplicates from Sorted Array** - Similar in-place modification with two pointers
- **27. Remove Element** - Another classic two-pointer problem
- **283. Move Zeroes** - Demonstrates the slow/fast pointer technique

**String/Array Compression Problems**:

- **1662. Check If Two String Arrays are Equivalent** - String manipulation practice
- **1047. Remove All Adjacent Duplicates In String** - Related to grouping consecutive elements

**Run-Length Encoding Problems**:

- **1578. Minimum Deletion Cost to Avoid Repeating Letters** - Similar grouping logic
- **1267. Count Servers that Communicate** - Pattern recognition in 2D arrays

These problems will help you recognize when the two-pointer pattern is applicable and strengthen your ability to handle in-place array modifications.

## 10. Flowchart Design

## Key Takeaways and Deep Understanding

Now that we've walked through the complete solution, let me help you cement your understanding of the core concepts that make this problem solvable and recognizable in the future.

The fundamental insight here is recognizing that this is an **in-place transformation problem**. When you encounter constraints like "use only constant extra space" combined with "modify the input array," your mind should immediately jump to the two-pointer pattern. This pattern is like having two workers: one who reads through the original data and another who writes the processed result, working together to avoid conflicts.

The beauty of the two-pointer approach in this context is that compression naturally creates a result that's shorter than or equal to the original. This mathematical property - that our compressed output will never be longer than our input - is what makes the in-place modification safe. Think of it like reorganizing books on a shelf where you're replacing thick volumes with thin summaries; you'll never run out of space.

Another crucial pattern to internalize is **run-length encoding**. This appears frequently in compression algorithms, image processing, and data storage problems. The key insight is that consecutive identical elements can be represented more efficiently as "element + count." When you see problems involving consecutive identical elements, consider whether run-length encoding might be the underlying pattern.

The digit-by-digit handling of multi-digit counts reveals another important algorithmic concept: **number decomposition**. Converting numbers to strings and processing each digit individually is a common technique in many programming problems. This approach handles edge cases gracefully and maintains the character array structure required by the problem.

Remember that the two-pointer pattern isn't just for this problem - it's a fundamental approach for array manipulation problems where you need to process elements while maintaining certain relationships or constraints. The "slow and fast pointer" variant we used here appears in many classic problems and represents a powerful problem-solving tool in your algorithmic toolkit.

As you continue practicing competitive programming, train yourself to recognize these patterns quickly. When you see array modification with space constraints, think two-pointers. When you see consecutive identical elements, consider run-length encoding. When you need to process numbers digit by digit, remember the string conversion technique. These pattern recognition skills will serve you well across many different problem types.

## Java Implementation with Deep Understanding

Let me guide you through the Java implementation of this string compression problem, building on the algorithmic understanding we've established. I'll help you see how the same two-pointer pattern translates beautifully into Java's syntax and conventions.

## Java-Specific Insights and Best Practices

Now let me help you understand the Java-specific aspects that make this implementation particularly elegant and efficient. Java's approach to handling character arrays and string manipulation offers some unique advantages that we can leverage for this problem.

The most important Java concept we're utilizing here is **direct character array manipulation**. Unlike some languages where strings are immutable, Java allows us to modify character arrays in place, which is exactly what this problem requires. The `char[]` type in Java is essentially an array of 16-bit Unicode characters, and we can read from and write to any position efficiently.

Notice how we use `String.valueOf(count).toCharArray()` to convert our count to individual character digits. This is a particularly Java-idiomatic approach that leverages the language's strong string manipulation capabilities. The alternative would be to use arithmetic operations to extract digits, but the string approach is more readable and less error-prone, especially when dealing with multi-digit numbers.

The `chars[writeIndex++]` syntax demonstrates Java's post-increment operator, which is perfect for this scenario. It assigns the value to the array position and then increments the index, effectively combining two operations in a clean, readable way. This is a common pattern in Java array manipulation and you'll see it frequently in competitive programming solutions.

One subtle but important detail in the Java implementation is how we handle the loop condition `readIndex < chars.length && chars[readIndex] == currentChar`. Java's short-circuit evaluation ensures that we don't access array elements beyond the boundary, preventing potential ArrayIndexOutOfBoundsException errors. This demonstrates defensive programming practices that are crucial in competitive programming.

The method signature `public int compress(char[] chars)` follows Java conventions perfectly. The method returns the new length as an integer, while the compressed result is stored in the input array itself. This approach aligns with how many Java algorithms handle in-place modifications, particularly in the Collections framework.

When you're working with similar problems in Java, remember that arrays are objects, and when you pass them to methods, you're passing a reference to the array object. This means any modifications you make inside the method will affect the original array, which is exactly what we want for in-place algorithms.

The test cases I've included demonstrate another important Java practice: comprehensive testing with clear output formatting. Notice how we use `System.out.println` and `System.out.print` strategically to create readable output that helps you verify your algorithm's correctness. This kind of thorough testing approach is invaluable when you're solving competitive programming problems.

From a performance perspective, this Java implementation is highly optimized. We're using primitive operations on arrays, which are among the fastest operations in Java. The time complexity remains O(n) because each character is processed exactly once, and the space complexity is O(1) because we're only using a constant amount of extra variables regardless of input size.

The beauty of this Java solution lies in its clarity and efficiency. The two-pointer pattern translates naturally into Java's syntax, and the language's string manipulation capabilities make the digit extraction process straightforward. This is exactly the kind of clean, efficient code that performs well in competitive programming environments and technical interviews.

As you practice more problems in Java, you'll start to recognize these patterns and idioms. The combination of array manipulation, string processing, and efficient looping constructs forms the foundation of many algorithmic solutions. The skills you're building here - managing multiple pointers, handling in-place modifications, and converting between different data types - are transferable to countless other problems you'll encounter.

---
Looking at this code, I can see you're working with a run-length encoding compression algorithm. Let me break down that specific for loop section (lines 43-46) and explain how it fits into the bigger picture.

## Understanding the Context First

Before diving into the for loop, it's important to understand what's happening just before it. The algorithm has found a sequence of repeated characters and counted how many times they appear consecutively. Now, if that count is greater than 1, it needs to store this count information in the compressed array.

The line `String countStr = String.valueOf(count);` converts the numeric count into a string representation. For example, if we found 12 consecutive 'A' characters, `countStr` would become "12".

## The For Loop Breakdown

Now let's examine the for loop itself:

```java
for (char digit : countStr.toCharArray()) {
    chars[writeIndex] = digit;
    writeIndex++;
}
```

Think of this loop as a "digit-by-digit writer." Here's what's happening step by step:

**Step 1: Converting the count to individual characters**
The expression `countStr.toCharArray()` takes our count string and breaks it into individual character digits. If our count was 12, this creates an array: ['1', '2'].

**Step 2: Writing each digit separately**
The loop then iterates through each of these digit characters. In our example with count 12:

- First iteration: `digit = '1'`, so `chars[writeIndex] = '1'`, then `writeIndex++`
- Second iteration: `digit = '2'`, so `chars[writeIndex] = '2'`, then `writeIndex++`

## Why This Approach?

You might wonder why the algorithm doesn't just write the entire number at once. The reason is that run-length encoding works character by character in the array. Each position in the array can only hold one character, so a multi-digit number like "12" must be broken down into its individual digit characters '1' and '2'.

## A Complete Example

Let's trace through a concrete example. Suppose we have the string "AAABBCCCCCCCCCCCC" and we're currently processing the C's:

1. The algorithm finds 12 consecutive C's
2. It writes 'C' first (the character being repeated)
3. Since count > 1, it converts 12 to string "12"
4. The for loop writes '1' then '2' into the array
5. The final compressed representation for this segment becomes: "C12"

This approach ensures that numbers of any size can be properly encoded. Whether the count is 3, 15, or 127, the for loop will correctly break it down into individual digit characters and write them sequentially into the compressed array.

Does this help clarify how that for loop fits into the overall compression strategy? The key insight is that it's handling the "decomposition" of multi-digit counts into individual characters that can be stored in the character array.
