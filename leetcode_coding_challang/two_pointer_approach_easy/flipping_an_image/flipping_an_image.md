# **832. Flipping an Image**

## Step-by-Step JavaScript Solution

We'll break down the problem into simple steps to make it easy for a beginner to understand.

---

## **Understanding the Problem**

1. We have an \( n \times n \) **binary** matrix (only contains `0` and `1`).
2. We need to **flip each row horizontally** (reverse it).
3. We then **invert the image** (change `0` to `1` and `1` to `0`).
4. Return the resulting matrix.

---

## **Example Walkthrough**

### **Example 1**

#### **Input:**

```plaintext
[[1,1,0],
 [1,0,1],
 [0,0,0]]
```

#### **Step 1: Flip each row horizontally**

Reverse each row:

```plaintext
[[0,1,1],
 [1,0,1],
 [0,0,0]]
```

#### **Step 2: Invert the image**

Change `0` to `1` and `1` to `0`:

```plaintext
[[1,0,0],
 [0,1,0],
 [1,1,1]]
```

#### **Final Output:**

```plaintext
[[1,0,0],
 [0,1,0],
 [1,1,1]]
```

---

## **Step-by-Step Approach in JavaScript**

### **Plan**

1. Loop through each row in the matrix.
2. Reverse the row.
3. Iterate through the reversed row and change each `0` to `1` and `1` to `0`.
4. Return the updated matrix.

---

### **JavaScript Implementation**

```javascript
function flipAndInvertImage(image) {
  return image.map(
    (row) => row.reverse().map((pixel) => pixel ^ 1) // Flip (reverse) and invert (XOR with 1)
  );
}

// Example Test Cases
console.log(
  flipAndInvertImage([
    [1, 1, 0],
    [1, 0, 1],
    [0, 0, 0],
  ])
);
// Output: [[1,0,0],[0,1,0],[1,1,1]]

console.log(
  flipAndInvertImage([
    [1, 1, 0, 0],
    [1, 0, 0, 1],
    [0, 1, 1, 1],
    [1, 0, 1, 0],
  ])
);
// Output: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
```

---

## **Explanation**

1. **`image.map(row => ... )`**
   - `.map()` is used to iterate over each row in the matrix.
2. **`row.reverse()`**
   - This reverses the order of elements in each row.
3. **`.map(pixel => pixel ^ 1)`**
   - This inverts the pixel using XOR (`^` operator):
     - `1 ^ 1 = 0` (flip `1` to `0`)
     - `0 ^ 1 = 1` (flip `0` to `1`)

---

## **Time & Space Complexity Analysis**

- **Reversing a row:** \( O(n) \)
- **Inverting a row:** \( O(n) \)
- **Looping through \( n \) rows:** \( O(n) \)
- **Total Time Complexity:** \( O(n^2) \) (since we process all \( n^2 \) elements)
- **Space Complexity:** \( O(1) \) (modifying in place, no extra storage used)

---

## **Alternative Approach (In-Place)**

Instead of using `reverse()`, we can swap elements from both ends manually:

```javascript
function flipAndInvertImage(image) {
  let n = image.length;

  for (let row of image) {
    for (let i = 0; i < Math.floor((n + 1) / 2); i++) {
      // Swap and invert using XOR (swap row[i] with row[n-1-i])
      [row[i], row[n - 1 - i]] = [row[n - 1 - i] ^ 1, row[i] ^ 1];
    }
  }
  return image;
}
```

This avoids using `.reverse()`, improving efficiency slightly.

---

## **Key Takeaways**

1. **Break the problem into steps** (flipping and inverting).
2. **Use JavaScript functions efficiently** (`map()`, `reverse()`, XOR `^`).
3. **Understand complexity** to write optimal solutions.

Would you like me to explain any part further? 😊
