# **1961. Check If String Is a Prefix of Array**

## 🏆 **LeetCode 1961: Check If String Is a Prefix of Array**

### 📌 **Step 1: Problem Understanding**

The problem asks us to check whether a given string `s` is a prefix of a given array of strings `words`. In simple terms:

- We concatenate the words in `words` from left to right.
- If `s` appears exactly as the prefix of this concatenated string, return `true`.
- Otherwise, return `false`.

#### **Constraints & Edge Cases**

- `1 ≤ s.length ≤ 100`
- `1 ≤ words.length ≤ 100`
- `1 ≤ words[i].length ≤ 100`
- `s` and `words[i]` consist only of lowercase English letters.

**Edge Cases:**

1. `s` is empty → Always `true` (an empty string is a prefix of any string).
2. `words` is empty → Always `false` (no way to form a prefix).
3. `s` is longer than all concatenated words → `false`.
4. `s` is exactly equal to the concatenated words → `true`.
5. Partial matches → `false` (e.g., `s = "abcde"`, words = `["ab", "c", "xyz"]`).

---

### 🔍 **Step 2: Pattern Identification**

The best approach for this problem is **Greedy + String Processing**:

- We iterate through `words` one by one, constructing the prefix of the concatenated string.
- As soon as we determine that `s` is _not_ a prefix, we return `false`.
- This avoids unnecessary concatenation and reduces time complexity.

---

### 📝 **Step 3: Approach Discussion**

#### **1️⃣ Initialize a variable for prefix tracking**

- Keep a string `current_prefix` initialized as an empty string.

#### **2️⃣ Iterate through `words` and build the prefix incrementally**

- Append each word to `current_prefix`.
- Check if `s` is still a prefix of `current_prefix`.
  - If not, return `false`.
  - If `current_prefix` grows to the length of `s`, return `true`.

#### **3️⃣ Return the final result**

- If the loop finishes without returning `false`, return `true`.

---

### 🧑‍💻 **Step 4: Code Implementation (JavaScript)**

```javascript
var isPrefixString = function (s, words) {
  let currentPrefix = "";

  for (let word of words) {
    currentPrefix += word; // Append the word to currentPrefix

    if (currentPrefix === s) {
      return true; // If it matches exactly, return true
    }

    if (currentPrefix.length > s.length) {
      return false; // If it exceeds s length, it cannot be a prefix
    }
  }

  return false; // If we finish loop and never matched exactly, return false
};
```

---

### ⏱ **Step 5: Complexity Analysis**

#### **Time Complexity:**

- **Best Case:** `O(1)` (First few words match `s` exactly).
- **Worst Case:** `O(N * M)`, where `N` is the number of words and `M` is the average word length (we keep checking prefix conditions).

#### **Space Complexity:**

- **O(1)** (We only use a single string variable `currentPrefix`).

---

### 🔄 **Step 6: Alternative Solutions**

#### **Using `join()` (More Concise)**

```javascript
var isPrefixString = function (s, words) {
  let concatString = "";

  for (let word of words) {
    concatString += word;
    if (concatString.startsWith(s)) return true;
  }

  return false;
};
```

**Pros:**  
✅ More readable using `.startsWith()` method.  
✅ Still efficient and avoids unnecessary operations.

**Cons:**  
❌ Slightly more operations since `.startsWith()` checks at every step.

---

### 📚 **Step 7: Practice Recommendations**

To strengthen your understanding, try these similar **Greedy + String Processing** problems:

1. **LeetCode 1768** - Merge Strings Alternately
2. **LeetCode 1408** - String Matching in an Array
3. **LeetCode 1160** - Find Words That Can Be Formed by Characters
4. **LeetCode 2255** - Count Prefix Words in a String

---

### 🔗 **Step 8: Flowchart Design**

Let's create a **flowchart** that illustrates our solution.

Here is the **flowchart** illustrating the logical flow of our solution:

![Flowchart](sandbox:/mnt/data/leetcode_1961_flowchart.png)

---

### 🎯 **Final Takeaways**

- **Key pattern:** **Greedy + String Processing**
- **Best practice:** Incrementally build the prefix instead of concatenating all at once.
- **Time Complexity:** `O(N * M)`, but efficient for practical cases.
- **Alternative approach:** Use `join()` and `.startsWith()` for more concise code.

Would you like more breakdowns on similar problems? 🚀
