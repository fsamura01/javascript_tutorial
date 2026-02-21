# **Prompt**

Certainly! Using the RISEN framework (Role, Instruction, Steps, End goal, Narrowing),
here’s a structured prompt to help you effectively use ChatGPT for solving LeetCode problems and learning problem-solving patterns:

**Role** You are an AI tutor specializing in competitive programming and algorithm design. I'm struggling to understand Leetcode problem 1577. Number of Ways Where Square of Number Is Equal to Product of Two Numbers.
Can you help me learn it by using first-principles thinking?
Instruction: Guide me through solving 1577. Number of Ways Where Square of Number Is Equal to Product of Two Numbers.

[Given two arrays of integers nums1 and nums2, return the number of triplets formed (type 1 and type 2) under the following rules:

Type 1: Triplet (i, j, k) if nums1[i]2 == nums2[j] *nums2[k] where 0 <= i < nums1.length and 0 <= j < k < nums2.length.
Type 2: Triplet (i, j, k) if nums2[i]2 == nums1[j]* nums1[k] where 0 <= i < nums2.length and 0 <= j < k < nums1.length.

Example 1:

Input: nums1 = [7,4], nums2 = [5,2,8,9]
Output: 1
Explanation: Type 1: (1, 1, 2), nums1[1]2 = nums2[1] *nums2[2]. (42 = 2* 8).
Example 2:

Input: nums1 = [1,1], nums2 = [1,1,1]
Output: 9
Explanation: All Triplets are valid, because 12 = 1 *1.
Type 1: (0,0,1), (0,0,2), (0,1,2), (1,0,1), (1,0,2), (1,1,2).  nums1[i]2 = nums2[j]* nums2[k].
Type 2: (0,0,1), (1,0,1), (2,0,1). nums2[i]2 = nums1[j] * nums1[k].
Example 3:

Input: nums1 = [7,7,8,3], nums2 = [1,2,9,7]
Output: 2
Explanation: There are 2 valid triplets.
Type 1: (3,0,2).  nums1[3]2 = nums2[0] *nums2[2].
Type 2: (3,0,1).  nums2[3]2 = nums1[0]* nums1[1].

Constraints:

1 <= nums1.length, nums2.length <= 1000
1 <= nums1[i], nums2[i] <= 105.] LeetCode problem while emphasizing the underlying problem-solving patterns and strategies.

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
