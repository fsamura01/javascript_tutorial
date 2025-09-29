# **844. Backspace String Compare**

## **Here’s the **JavaScript** implementation of both approaches:**

---

### **🟢 Approach 1: Stack-Based Simulation**

```javascript
function processString(s) {
  let stack = [];
  for (let char of s) {
    if (char === "#") {
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      stack.push(char);
    }
  }
  return stack.join("");
}

function backspaceCompare(s, t) {
  return processString(s) === processString(t);
}

// Example Test Cases
console.log(backspaceCompare("ab#c", "ad#c")); // true
console.log(backspaceCompare("ab##", "c#d#")); // true
console.log(backspaceCompare("a#c", "b")); // false
```

📌 **Explanation:**

- Uses an **array as a stack** to handle backspaces.
- If `#` appears, we **pop** a character from the stack.
- Finally, we compare the two processed strings.

⏳ **Time Complexity**: `O(n)`, single pass through strings.  
📦 **Space Complexity**: `O(n)`, extra stack storage.

---

### **🟢 Approach 2: Two-Pointer Optimization**

```javascript
function backspaceCompare(s, t) {
  function getNextValidIndex(str, index) {
    let backspaceCount = 0;
    while (index >= 0) {
      if (str[index] === "#") {
        backspaceCount++;
      } else if (backspaceCount > 0) {
        backspaceCount--;
      } else {
        return index;
      }
      index--;
    }
    return index; // -1 means no valid characters left
  }

  let i = s.length - 1,
    j = t.length - 1;

  while (i >= 0 || j >= 0) {
    i = getNextValidIndex(s, i);
    j = getNextValidIndex(t, j);

    if (i >= 0 && j >= 0 && s[i] !== t[j]) {
      return false;
    }

    if (i >= 0 !== j >= 0) {
      // If one string is exhausted before the other
      return false;
    }

    i--;
    j--;
  }

  return true;
}

// Example Test Cases
console.log(backspaceCompare("ab#c", "ad#c")); // true
console.log(backspaceCompare("ab##", "c#d#")); // true
console.log(backspaceCompare("a#c", "b")); // false
```

📌 **Explanation:**

- Uses **two pointers**, starting from the end of both strings.
- Skips characters based on backspaces.
- Compares valid characters **without extra space**.

⏳ **Time Complexity**: `O(n)`, single pass through strings.  
📦 **Space Complexity**: `O(1)`, no extra storage.

---

### **🎯 Final Thoughts**

✔ **Stack approach** is easier to understand but uses extra space.  
✔ **Two-pointer approach** is more **efficient** (`O(1)` space).

✅ **Preferred Solution:** **Two-pointer approach** for optimal performance.  
Would you like a dry-run example with logs? 🚀
