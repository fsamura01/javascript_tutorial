function searchMatrix(matrix, target) {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) return false;
  const rows = matrix.length;
  const cols = matrix[0].length;

  // set the initial position starting from the top-right corner
  let row = 0;
  let col = cols - 1;

  while (row < rows && col >= 0) {
    let currentElement = matrix[row][col];

    if (currentElement === target) {
      return true;
    } else if (currentElement > target) {
      col--;
    } else {
      row++;
    }

    // If the current element is greater than the target,
    // then we can discard the entire column to the left of the current element.
    // Otherwise, we can discard the entire row above the current element.
    // This is because the elements to the left and above the current element
    // are guaranteed to be smaller than the current element.
  }

  return false;
}

// Example usage:
const matrix1 = [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30],
];
const target1 = 5;
searchMatrix(matrix1, target1); // Output: true

const matrix2 = [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30],
];
const target2 = 20;
searchMatrix(matrix2, target2); // Output: false
