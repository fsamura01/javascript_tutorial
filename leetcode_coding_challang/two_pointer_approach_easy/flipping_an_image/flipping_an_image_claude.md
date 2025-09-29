# **832. Flipping an Image**

I'll help you solve the "Flipping an Image" problem with a beginner-friendly JavaScript solution and a comprehensive explanation.

Let's break down the problem into two main steps:

1. Flip the image horizontally (reverse each row)
2. Invert the image (change 0s to 1s and 1s to 0s)

Here's a solution with detailed explanations:

Let me break down the solution and explain the approach in detail:

## Solution Walkthrough

1. **Problem Understanding**
   The problem requires us to perform two operations on a binary image matrix:

- First, flip each row horizontally (reverse the row)
- Then, invert each element (0 becomes 1, 1 becomes 0)

## **Approach Explanation**

The solution uses two key techniques:

- A two-pointer approach for reversing rows
- A mapping technique for inverting elements

## **Detailed Code Breakdown**

### Creating a Deep Copy

```javascript
const result = image.map((row) => [...row]);
```

- We create a new copy of the input image to avoid modifying the original array
- `map()` creates a new array
- `[...row]` spreads each row into a new array, creating a deep copy

### Reversing Rows

```javascript
while (left < right) {
  [result[i][left], result[i][right]] = [result[i][right], result[i][left]];
  left++;
  right--;
}
```

- Uses two pointers (`left` and `right`) to swap elements from both ends
- This efficiently reverses the row in-place
- The swap continues until pointers meet in the middle

### Inverting Elements

```javascript
result[i] = result[i].map((pixel) => (pixel === 0 ? 1 : 0));
```

- Uses `map()` to transform each pixel
- Ternary operator checks if pixel is 0
  - If 0, returns 1
  - If 1, returns 0

## Complexity Analysis

- **Time Complexity**: O(n²), where n is the side length of the square matrix
  - We iterate through each row (n times)
  - For each row, we do two operations:
    1. Reversing (which takes O(n/2) = O(n))
    2. Inverting (which takes O(n))
- **Space Complexity**: O(n²)
  - We create a new matrix of the same size as the input

## Learning Points for Beginners

1. Two-pointer technique is powerful for in-place array manipulations
2. `map()` is great for transforming array elements
3. Destructuring assignment `[a, b] = [b, a]` provides an easy way to swap values
4. Always consider creating a copy when modifying arrays to prevent side effects

**Mental Model**
Think of this like folding and flipping a piece of paper:

- First, you fold the paper in half (reversing the row)
- Then, you change all white squares to black and black to white (inverting)

**Practice Challenges**
To deepen your understanding, try these variations:

- Modify the solution to work with non-square matrices
- Implement the solution without using `map()`
- Add error handling for invalid inputs

Would you like me to elaborate on any part of the solution or explain any concepts in more depth?

Let me dive deep into the concept of creating a copy of an array and why it's important, especially in the context of our image flipping problem.

## Understanding Array References in JavaScript

When you work with arrays in JavaScript, it's crucial to understand how references work. Let me illustrate this with a simple example:

```javascript
// Original array
let originalArray = [1, 2, 3];

// This creates a reference, NOT a copy
let sameArray = originalArray;

// Modifying the new variable also changes the original
sameArray[0] = 99;

console.log(originalArray); // Now outputs [99, 2, 3]
```

In this example, `sameArray` isn't a new array – it's just another name pointing to the exact same array in memory. Any changes made to `sameArray` directly affect `originalArray`.

## Why We Need a Deep Copy

In our image flipping problem, we want to:

1. Preserve the original image intact
2. Create a new array we can modify freely

Here's a detailed breakdown of our copying method:

```javascript
const result = image.map((row) => [...row]);
```

Let's unpack this line:

- `image.map()` creates a new outer array
- `[...row]` uses the spread operator to create a new inner array for each row
- This ensures we have a completely new array at both the outer and inner levels

### Demonstration of Deep vs. Shallow Copying

```javascript
// Shallow copy (problematic)
let shallowCopy = image.map((row) => row);

// Deep copy (correct approach)
let deepCopy = image.map((row) => [...row]);

// Examine the difference
shallowCopy[0][0] = 99; // This will modify the original image
deepCopy[0][0] = 99; // This only modifies the copy
```

**Mental Model Exercise**
Imagine you're making a photocopy:

- A shallow copy is like tracing the original image on transparent paper
- A deep copy is like making a completely new photocopy that you can modify freely

**Alternative Copying Methods**
While our `map()` approach works well, JavaScript offers other ways to create deep copies:

1. Spread Operator Method (what we used):

```javascript
const copy = image.map((row) => [...row]);
```

1. JSON Method (works for simple arrays):

```javascript
const copy = JSON.parse(JSON.stringify(image));
```

1. Lodash Library Method:

```javascript
const copy = _.cloneDeep(image);
```

**When to Use Deep Copying**
Deep copying is crucial when:

- You need to preserve the original data
- You're working with nested structures
- You want to avoid unintended side effects

## Potential Pitfalls

- Deep copying can be memory-intensive for large arrays
- The JSON method doesn't work with functions or certain JavaScript objects
- Performance matters when working with very large datasets

**Learning Check**
To test your understanding, can you explain why this would be problematic?

```javascript
let original = [
  [1, 2, 3],
  [4, 5, 6],
];
let notACopy = original;
notACopy[0][0] = 99;
```

Would you like me to elaborate on any part of this explanation or explore any related concepts about array copying in JavaScript?
