# **Efficient Team Formation**

## **Problem Breakdown**

- We need to group participants into teams of two where:

1. The sum of skills for all teams must be the same.

2. All participants must be assigned to a team.
3. The efficiency of a team is the product of the skills of its members.

- If it's not possible to satisfy these conditions, return `-1`.  
  Otherwise, return the total efficiency of all teams.

---

## **Step-by-Step Solution**

### **Step 1: Validate Input**

1. Check if the number of participants (`n`) is even.  
   If `n` is odd, it’s impossible to form teams,  
   but this is guaranteed in the constraints.
2. Check if it's possible to pair all participants  
   such that each pair sums to the same value.

### **Step 2: Sort the Array**

- Sorting the array helps to identify pairs easily.  
  By pairing the smallest and largest remaining values,  
  we can maintain the desired constant sum.

### **Step 3: Pair and Calculate Efficiency**

- Use a two-pointer approach:
- One pointer starts at the beginning (`low`)  
  and the other at the end (`high`) of the sorted array.
- Check if the sum of the current pair equals the target sum  
  (the sum of the first and last values after sorting).
- If not, return `-1`.
- Otherwise, calculate the product (efficiency)  
  of the pair and add it to the total efficiency.

### **Step 4: Return Total Efficiency**

- Return the accumulated total efficiency if all pairs are valid.

---

## Implementation in JavaScript

```javascript
function getTotalEfficiency(skill) {
  // Step 1: Sort the array
  skill.sort((a, b) => a - b);

  let totalEfficiency = 0;
  let targetSum = skill[0] + skill[skill.length - 1]; // Target sum for all pairs

  let low = 0;
  let high = skill.length - 1;

  // Step 2: Pair and calculate efficiency
  while (low < high) {
    let sum = skill[low] + skill[high];

    // If the sum of the pair is not equal to the target sum, return -1
    if (sum !== targetSum) {
      return -1;
    }

    // Calculate efficiency and add to total
    totalEfficiency += skill[low] * skill[high];

    // Move pointers
    low++;
    high--;
  }

  // Step 3: Return total efficiency
  return totalEfficiency;
}

// Example Usage
let skill = [1, 2, 3, 2];
console.log(getTotalEfficiency(skill)); // Output: 7
```

---

## **Complexity Analysis**

### **Time Complexity**

1. **Sorting the Array**: Sorting takes \(O(n \log n)\).
2. **Two-Pointer Iteration**: Iterating through the array with two pointers takes \(O(n)\).

- Overall time complexity: \[ O(n \log n) + O(n) = O(n \log n) \]

### **Space Complexity**

- The sorting operation may use \(O(n)\) additional space  
  depending on the implementation, but no extra data structures are used explicitly.
- Space complexity: \(O(1)\) (excluding sorting space).

---

## **Example Walkthrough**

### **Input**

```plaintext
skill = [1, 2, 3, 2]
```

### **Execution Steps**

1. **Sort the Array**:

   ```plaintext
   skill = [1, 2, 2, 3]
   ```

2. **Set Target Sum**:

   ```plaintext
   targetSum = 1 + 3 = 4
   ```

3. **Two-Pointer Iteration**:

   - Pair `[1, 3]`:
     - Sum = (1 + 3 = 4) (valid).
     - Efficiency = (1\*3 = 3).
   - Pair `[2, 2]`:
     - Sum = (2 + 2 = 4) (valid).
     - Efficiency = (2\*2 = 4).

4. **Total Efficiency**:

   ```plaintext
   totalEfficiency = 3 + 4 = 7
   ```

### **Output**

```plaintext
7
```

---

## **Edge Cases**

1. **Invalid Pairs**:

   ```javascript
   let skill = [1, 1, 2, 3];
   console.log(getTotalEfficiency(skill)); // Output: -1
   ```

2. **All Identical Skills**:

   ```javascript
   let skill = [2, 2, 2, 2];
   console.log(getTotalEfficiency(skill)); // Output: 8
   ```

3. **Large Input**:
   The algorithm handles up to \(10^5\) participants efficiently due to \(O(n \log n)\) complexity.

## **Conclusions**

- This approach ensures correctness and
- efficiency while adhering to the problem constraints.
