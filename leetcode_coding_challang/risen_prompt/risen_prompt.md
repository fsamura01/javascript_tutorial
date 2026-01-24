# **Prompt**

Certainly! Using the RISEN framework (Role, Instruction, Steps, End goal, Narrowing),
here’s a structured prompt to help you effectively use ChatGPT for solving LeetCode problems and learning problem-solving patterns:

**Role** You are an AI tutor specializing in competitive programming and algorithm design. I'm struggling to understand Leetcode problem 1471. The k Strongest Values in an Array.
Can you help me learn it by using first-principles thinking?
Instruction: Guide me through solving 1471. The k Strongest Values in an Array.

[Given an array of integers arr and an integer k.

A value arr[i] is said to be stronger than a value arr[j] if |arr[i] - m| > |arr[j] - m| where m is the centre of the array.
If |arr[i] - m| == |arr[j] - m|, then arr[i] is said to be stronger than arr[j] if arr[i] > arr[j].

Return a list of the strongest k values in the array. return the answer in any arbitrary order.

The centre is the middle value in an ordered integer list. More formally, if the length of the list is n, the centre is the element in position ((n - 1) / 2) in the sorted list (0-indexed).

For arr = [6, -3, 7, 2, 11], n = 5 and the centre is obtained by sorting the array arr = [-3, 2, 6, 7, 11] and the centre is arr[m] where m = ((5 - 1) / 2) = 2. The centre is 6.
For arr = [-7, 22, 17, 3], n = 4 and the centre is obtained by sorting the array arr = [-7, 3, 17, 22] and the centre is arr[m] where m = ((4 - 1) / 2) = 1. The centre is 3.

Example 1:

Input: arr = [1,2,3,4,5], k = 2
Output: [5,1]
Explanation: Centre is 3, the elements of the array sorted by the strongest are [5,1,4,2,3]. The strongest 2 elements are [5, 1]. [1, 5] is also accepted answer.
Please note that although |5 - 3| == |1 - 3| but 5 is stronger than 1 because 5 > 1.
Example 2:

Input: arr = [1,1,3,5,5], k = 2
Output: [5,5]
Explanation: Centre is 3, the elements of the array sorted by the strongest are [5,5,1,1,3]. The strongest 2 elements are [5, 5].
Example 3:

Input: arr = [6,7,11,7,6,8], k = 5
Output: [11,8,6,6,7]
Explanation: Centre is 7, the elements of the array sorted by the strongest are [11,8,6,6,7,7].
Any permutation of [11,8,6,6,7] is accepted.

Constraints:

1 <= arr.length <= 105
-105 <= arr[i] <= 105
1 <= k <= arr.length.] LeetCode problem while emphasizing the underlying problem-solving patterns and strategies.

**Steps:**

1. **Problem Understanding:** Explain the problem statement in simple terms and clarify any constraints or edge cases.

2. **Constraints Of The Problem** Help me understanding what the constraints tell us about the problem structure

3. **Highlight keyword:** Highlight keywords to help me solve similar problems in the future.

4.  **Break Down The Problem Into Manageable Parts** Break the problem into smaller, manageable parts.

5. **Pattern Identification:** Identify the appropriate algorithmic pattern (e.g., sliding window, dynamic programming, two pointers) suitable for this problem.

6. **Approach Discussion:** Provide a step-by-step approach to solving the problem, explaining the rationale behind each step.

7. **Code Implementation:** Write the code for the solution in both Javascript and Java, commenting on key sections to enhance understanding.

8. **Complexity Analysis:** Analyze the time and space complexity of the solution.

9. **Alternative Solutions:** Discuss any alternative approaches or optimizations, if applicable.

10. **Practice Recommendations:** Suggest similar LeetCode problems for additional practice on the identified pattern.

11. **Flowchart Design:** Create a comprehensive flowchart that visually illustrates the solution's key process steps and logical progression using mermaid.

**End Goal:** By the end of the session, I should be able to understand how to solve the problem, recognize the underlying pattern, and apply similar strategies to other problems.

**Narrowing:**

- Focus on commonly tested patterns in technical interviews.
- Use Javascript and Java for coding examples (or specify another language if preferred).
- Emphasize clarity and simplicity in explanations.

**Example Prompt:**
"You are an AI tutor specializing in competitive programming.
Help me solve the LeetCode problem **'Two Sum'** by breaking down the problem,
identifying the relevant pattern, providing a step-by-step solution with Javascript code,
analyzing the complexity, and suggesting similar problems for practice."

This prompt will guide ChatGPT to provide a structured and educational approach
to solving LeetCode problems while enhancing your understanding of problem-solving patterns.

Let’s craft a prompt using the RISEN framework to help you get the most out of ChatGPT for solving LeetCode problems and learning problem-solving patterns. Here’s a structured prompt you can use:

Role: You are an AI tutor specialized in competitive programming and LeetCode problem-solving.

Instruction: Help me understand and solve a specific LeetCode problem while teaching relevant problem-solving patterns.
Steps:
Begin by asking me for the specific LeetCode problem number or name.

Provide a brief overview of the problem statement and constraints.

Guide me to identify the problem category (e.g., dynamic programming, backtracking, two-pointer technique).

Suggest common patterns or techniques that apply to this problem category.

Walk me through solving the problem step-by-step, explaining your thought process and why each step is important.

Highlight key patterns or concepts that can be applied to similar problems.

Suggest a few related LeetCode problems to practice this pattern.

End Goal: I want to not only solve this LeetCode problem but also gain a deeper understanding of problem-solving patterns that will help me tackle similar problems in the future.

Narrowing: Focus on clear explanations, concise code examples, and pattern recognition strategies. Avoid overly complex solutions unless necessary for understanding the concept.

Feel free to customize this prompt based on your specific goals, like focusing on a particular type of problem or programming language. Would you like an example walkthrough using this prompt with a specific LeetCode problem?
