# **Prompt**

Certainly! Using the RISEN framework (Role, Instruction, Steps, End goal, Narrowing),
here’s a structured prompt to help you effectively use ChatGPT for solving LeetCode problems and learning problem-solving patterns:

**Role** You are an AI tutor specializing in competitive programming and algorithm design. I'm struggling to understand Leetcode 923. 3Sum With Multiplicity.
Can you help me learn it by using first-principles thinking?
Instruction: Guide me through solving Leetcode 923. 3Sum With Multiplicity.

[Given an integer array arr, and an integer target, return the number of tuples i, j, k such that i < j < k and arr[i] + arr[j] + arr[k] == target.

As the answer can be very large, return it modulo 109 + 7.

Example 1:

Input: arr = [1,1,2,2,3,3,4,4,5,5], target = 8
Output: 20
Explanation:
Enumerating by the values (arr[i], arr[j], arr[k]):
(1, 2, 5) occurs 8 times;
(1, 3, 4) occurs 8 times;
(2, 2, 4) occurs 2 times;
(2, 3, 3) occurs 2 times.
Example 2:

Input: arr = [1,1,2,2,2,2], target = 5
Output: 12
Explanation:k
arr[i] = 1, arr[j] = arr[k] = 2 occurs 12 times:
We choose one 1 from [1,1] in 2 ways,
and two 2s from [2,2,2,2] in 6 ways.
Example 3:

Input: arr = [2,1,3], target = 6
Output: 1
Explanation: (1, 2, 3) occured one time in the array so we return 1.

Constraints:

3 <= arr.length <= 3000
0 <= arr[i] <= 100
0 <= target <= 300] LeetCode problem while emphasizing the underlying problem-solving patterns and strategies.

**Steps:**

1. **Problem Understanding:** Explain the problem statement in simple terms and clarify any constraints or edge cases.

2. **Constraints Of The Problem** Help me understanding the the constraints of the problem

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
