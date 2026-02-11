# **Prompt**

Certainly! Using the RISEN framework (Role, Instruction, Steps, End goal, Narrowing),
here’s a structured prompt to help you effectively use ChatGPT for solving LeetCode problems and learning problem-solving patterns:

**Role** You are an AI tutor specializing in competitive programming and algorithm design. I'm struggling to understand Leetcode problem 11508. Range Sum of Sorted Subarray Sums.
Can you help me learn it by using first-principles thinking?
Instruction: Guide me through solving 11508. Range Sum of Sorted Subarray Sums.

[You are given the array nums consisting of n positive integers. You computed the sum of all non-empty continuous subarrays from the array and then sorted them in non-decreasing order, creating a new array of n * (n + 1) / 2 numbers.

Return the sum of the numbers from index left to index right (indexed from 1), inclusive, in the new array. Since the answer can be a huge number return it modulo 109 + 7.

Example 1:

Input: nums = [1,2,3,4], n = 4, left = 1, right = 5
Output: 13
Explanation: All subarray sums are 1, 3, 6, 10, 2, 5, 9, 3, 7, 4. After sorting them in non-decreasing order we have the new array [1, 2, 3, 3, 4, 5, 6, 7, 9, 10]. The sum of the numbers from index le = 1 to ri = 5 is 1 + 2 + 3 + 3 + 4 = 13.
Example 2:

Input: nums = [1,2,3,4], n = 4, left = 3, right = 4
Output: 6
Explanation: The given array is the same as example 1. We have the new array [1, 2, 3, 3, 4, 5, 6, 7, 9, 10]. The sum of the numbers from index le = 3 to ri = 4 is 3 + 3 = 6.
Example 3:

Input: nums = [1,2,3,4], n = 4, left = 1, right = 10
Output: 50

Constraints:

n == nums.length
1 <= nums.length <= 1000
1 <= nums[i] <= 100
1 <= left <= right <= n * (n + 1) / 2.] LeetCode problem while emphasizing the underlying problem-solving patterns and strategies.

**Steps:**

1. **Problem Understanding:** Explain the problem statement in simple terms and clarify any constraints or edge cases.

2. **Technical Explanation:** How can I explain the problem using technical terms?

3. **Constraints Of The Problem** Help me understanding what the constraints tell us about the problem structure

4. **Highlight keyword:** Highlight keywords to help me solve similar problems in the future.

5.  **Break Down The Problem Into Manageable Parts** Break the problem into smaller, manageable parts.

6. **Pattern Identification:** Identify the appropriate algorithmic pattern (e.g., sliding window, dynamic programming, two pointers) suitable for this problem.

7. **Approach Discussion:** Provide a step-by-step approach to solving the problem, explaining the rationale behind each step.

8. **Code Implementation:** Write the code for the solution in both Javascript and Java, commenting on key sections to enhance understanding.

9. **Complexity Analysis:** Analyze the time and space complexity of the solution.

10. **Alternative Solutions:** Discuss any alternative approaches or optimizations, if applicable.

11. **Practice Recommendations:** Suggest similar LeetCode problems for additional practice on the identified pattern.

12. **Flowchart Design:** Create a comprehensive flowchart that visually illustrates the solution's key process steps and logical progression using mermaid.

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
