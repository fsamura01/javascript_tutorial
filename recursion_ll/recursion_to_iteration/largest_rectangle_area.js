function largestRectangleArea(heights) {
  let stack = [];
  let maxArea = 0;
  let index = 0;

  while (index < heights.length) {
    if (
      stack.length === 0 ||
      heights[index] >= heights[stack[stack.length - 1]]
    ) {
      stack.push(index);
      index++;
    } else {
      let topIndex = stack.pop();
      let height = heights[topIndex];
      let width =
        stack.length === 0 ? index : index - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
  }

  while (stack.length > 0) {
    let topIndex = stack.pop();
    let height = heights[topIndex];
    let width =
      stack.length === 0 ? index : index - stack[stack.length - 1] - 1;
    maxArea = Math.max(maxArea, height * width);
  }

  return maxArea;
}

// Example usage:
largestRectangleArea([2, 1, 5, 6, 2, 3]); // Output: 10
largestRectangleArea([2, 4]); // Output: 4
