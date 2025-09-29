/**
 * @param {number[]} height - Array of heights
 * @return {number} - Maximum water area
 */
function maxArea(height) {
  // Initialize pointers at the beginning and end of array
  let left = 0;
  let right = height.length - 1;

  // Variable to track maximum area
  let maxWaterArea = 0;

  // Continue until pointers meet
  while (left < right) {
    // Calculate width between the two lines
    const width = right - left;

    // Calculate height (limited by the shorter line)
    const containerHeight = Math.min(height[left], height[right]);

    // Calculate current area
    const currentArea = width * containerHeight;

    // Update maximum area if current area is larger
    maxWaterArea = Math.max(maxWaterArea, currentArea);

    // Move the pointer that points to the shorter line
    // This is the key insight: we always move the limiting factor
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWaterArea;
}

function maxAreaBruteForce(height) {
  let maxWaterArea = 0;

  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      const width = j - i;
      const containerHeight = Math.min(height[i], height[j]);
      const area = width * containerHeight;
      maxWaterArea = Math.max(maxWaterArea, area);
    }
  }

  return maxWaterArea;
}

const heights = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log(maxArea(heights)); // Output: 49
