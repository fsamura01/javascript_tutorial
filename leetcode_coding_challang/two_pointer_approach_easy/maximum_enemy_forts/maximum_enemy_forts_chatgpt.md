# **2511. Maximum Enemy Forts That Can Be Captured**

Let's go step by step to solve **LeetCode 2511: Maximum Enemy Forts That Can Be Captured** while focusing on problem-solving patterns and strategies.  

---

## **Step 1: Problem Understanding**

### **Problem Statement (Simplified)**  

You are given an integer array `forts` where:  

- `1` represents your fort.  
- `-1` represents enemy forts.  
- `0` represents empty spaces.  

You can move left or right from your fort (`1`) but **only in a straight line**. You must **stop** if you reach another `1`.  
The goal is to capture the **maximum number of consecutive enemy forts (-1)** in any single move.  

### **Example**

#### **Input:**

```js
forts = [1,0,0,-1,0,0,0,-1,1]
```

#### **Output:**

```js
4
```

#### **Explanation:**  

- Starting from `forts[0]`, we can move right but capture **at most 1** enemy fort.  
- Starting from `forts[8]`, we can move left but capture **at most 1** enemy fort.  
- **Best Move:** Start from `forts[0]`, move right, and capture `forts[3]`, leading to **4** captured enemy forts.

---

## **Step 2: Pattern Identification**

This problem can be solved using a **Linear Scan** approach with a **two-pointer** technique:

- Identify fort locations (`1`).
- Move left/right to capture enemy forts (`-1`).
- Stop when encountering another fort (`1`) or reaching array bounds.

**Key Observations:**

- The problem is **one-dimensional**, making **Sliding Window, Two Pointers, or Greedy** effective.
- We only need **one pass (O(n))**, making **a single scan approach optimal**.

---

## **Step 3: Approach Discussion**

1. **Iterate through the array** to find fort positions (`1`).  
2. **Scan in both directions** until another `1` appears or the array ends.  
3. **Count enemy forts (`-1`)** in between.  
4. **Track the maximum count** of captured enemy forts.  

### **Algorithm in Steps**

- Initialize `maxForts = 0` to store the maximum captured forts.  
- Track the **last seen fort position** (`prevFortIndex`).  
- Loop through the array:  
  - If `forts[i] == 1`:  
    - Count how many `-1`s exist between `prevFortIndex` and `i`.  
    - Update `maxForts`.  
    - Set `prevFortIndex = i` for the next segment.  

---

## **Step 4: Code Implementation**

Here’s the **JavaScript** solution with comments for clarity:

```javascript
var captureForts = function(forts) {
    let maxForts = 0;  // Stores the maximum captured enemy forts
    let prevFortIndex = -1;  // Track the index of the last encountered fort (1)

    for (let i = 0; i < forts.length; i++) {
        if (forts[i] === 1) {  // Found a new fort
            if (prevFortIndex !== -1) {  
                let enemyCount = 0;
                let validCapture = true;

                // Count enemy forts (-1) between two forts
                for (let j = prevFortIndex + 1; j < i; j++) {
                    if (forts[j] === 0) {
                        validCapture = false; // If there is a 0 in between, we cannot capture
                        break;
                    }
                    enemyCount++;
                }

                if (validCapture) {
                    maxForts = Math.max(maxForts, enemyCount);
                }
            }
            prevFortIndex = i; // Update last seen fort position
        }
    }
    return maxForts;
};
```

---

## **Step 5: Complexity Analysis**

- **Time Complexity:** **O(n)**  
  - We only traverse the array once (single pass).
- **Space Complexity:** **O(1)**  
  - No extra data structures are used.

---

## **Step 6: Alternative Solutions**

1. **Using a Two-Pointer Approach**  
   - Instead of scanning forward, use two pointers (`left` and `right`) to detect enemy sequences more efficiently.  
2. **Sliding Window Approach**  
   - Not ideal since movement is constrained by `1`s, but could be useful in variations of the problem.  

---

## **Step 7: Practice Recommendations**

To reinforce this pattern, try these problems:

1. **LeetCode 42** - **Trapping Rain Water** *(Sliding Window)*
2. **LeetCode 55** - **Jump Game** *(Greedy)*
3. **LeetCode 11** - **Container With Most Water** *(Two Pointers)*
4. **LeetCode 763** - **Partition Labels** *(Greedy + Linear Scan)*

---

## **Step 8: Flowchart Design**

Here's a flowchart for the solution:

```plaintext
 Start
   ↓
Initialize maxForts = 0, prevFortIndex = -1
   ↓
Loop through forts[i]
   ↓
If forts[i] == 1?
   → No → Continue loop
   → Yes → Check prevFortIndex
         ↓
   If prevFortIndex != -1?
   → No → Set prevFortIndex = i
   → Yes
         ↓
   Count enemy forts (-1) between prevFortIndex and i
   → If any 0 is found → Ignore this segment
   → Otherwise, update maxForts
         ↓
   Set prevFortIndex = i
   ↓
End Loop
   ↓
Return maxForts
```

---

## **End Goal Achieved**

✅ **Understood problem-solving approach**  
✅ **Identified key pattern (Linear Scan + Two Pointers)**  
✅ **Implemented an optimal O(n) solution**  
✅ **Analyzed complexity**  
✅ **Practiced similar problems**  

Would you like me to refine anything further or explain an alternative method? 🚀
