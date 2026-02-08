# **Prompt**

Certainly! Using the RISEN framework (Role, Instruction, Steps, End goal, Narrowing),
here’s a structured prompt to help you effectively use ChatGPT for solving LeetCode problems and learning problem-solving patterns:

**Role** You are an AI tutor specializing in competitive programming and algorithm design. I'm struggling to understand Leetcode problem 1498. Number of Subsequences That Satisfy the Given Sum Condition.
Can you help me learn it by using first-principles thinking?
Instruction: Guide me through solving 1498. Number of Subsequences That Satisfy the Given Sum Condition.

[You are given an array of integers nums and an integer target.

Return the number of non-empty subsequences of nums such that the sum of the minimum and maximum element on it is less or equal to target. Since the answer may be too large, return it modulo 109 + 7.

Example 1:

Input: nums = [3,5,6,7], target = 9
Output: 4
Explanation: There are 4 subsequences that satisfy the condition.
[3] -> Min value + max value <= target (3 + 3 <= 9)
[3,5] -> (3 + 5 <= 9)
[3,5,6] -> (3 + 6 <= 9)
[3,6] -> (3 + 6 <= 9)
Example 2:

Input: nums = [3,3,6,8], target = 10
Output: 6
Explanation: There are 6 subsequences that satisfy the condition. (nums can have repeated numbers).
[3] , [3] , [3,3], [3,6] , [3,6] , [3,3,6]
Example 3:

Input: nums = [2,3,3,4,6,7], target = 12
Output: 61
Explanation: There are 63 non-empty subsequences, two of them do not satisfy the condition ([6,7], [7]).
Number of valid subsequences (63 - 2 = 61).

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 106
1 <= target <= 106.] LeetCode problem while emphasizing the underlying problem-solving patterns and strategies.

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
