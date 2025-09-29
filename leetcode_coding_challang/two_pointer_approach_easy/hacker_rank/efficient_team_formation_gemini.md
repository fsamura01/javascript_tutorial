# **Efficient Team Formation**

## **Understanding the Problem:**

- We're tasked with forming teams of two from a given list of skills.  
  The teams must have equal skill sums, and we aim to maximize  
  the sum of their product efficiencies.

## **Proposed Solution: A Two-Pointer Approach**

### **Sort the Skills:**

- Sort the `skill` array in ascending order. This will help  
  us identify potential pairs with similar skill sums.

## **Initialize Pointers:**

- Set two pointers, `left` and `right`,  
  to the beginning and end of the sorted array, respectively.

## **Iterate and Pair:**

- While `left` is less than `right`:
- If the sum of skills at **left** and **right**  
  is less than the target sum, increment **left**.
- If the sum is greater than the target sum, decrement **right**.
- If the sum is equal to the target sum,  
  we've found a valid pair.  
  Calculate the efficiency (product of skills)  
  and add it to the total efficiency. Increment **left** and decrement **right**.

## **Handle Edge Cases:**

- If at any point, the `left` pointer crosses the `right` pointer  
  without finding a valid pair,  
  it means we cannot form teams with equal skill sums. Return -1.

**JavaScript Implementation:**

```javascript
function getTotalEfficiency(skill) {
  skill.sort((a, b) => a - b);

  let left = 0;
  let right = skill.length - 1;
  let targetSum = skill.reduce((acc, curr) => acc + curr, 0) / 2;
  let totalEfficiency = 0;

  while (left < right) {
    const currentSum = skill[left] + skill[right];

    if (currentSum === targetSum) {
      totalEfficiency += skill[left] * skill[right];
      left++;
      right--;
    } else if (currentSum < targetSum) {
      left++;
    } else {
      right--;
    }
  }

  return left === right ? -1 : totalEfficiency;
}
```

## **Complexity Analysis:**

- **Time Complexity:** O(n log n) due to the sorting operation.
- **Space Complexity:** O(1) as we're modifying the input  
  array in-place and using constant extra space for variables.

## **Explanation:**

- Sorting ensures that we can efficiently find pairs with similar skill sums.
- The two-pointer approach allows us to iterate through the array in a single pass.
- The target sum is calculated beforehand to optimize the pairing process.
- The loop iterates until the pointers cross, ensuring all possible pairs are considered.
- If the pointers cross without finding a valid pair, it means we cannot form teams with equal skill sums.

## **Conclusions**

- This approach provides an efficient and clear  
  solution to the given problem.
