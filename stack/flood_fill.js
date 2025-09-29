var floodFill = function (image, sr, sc, color) {
  const startColor = image[sr][sc];
  if (startColor === color) return image;

  const m = image.length;
  const n = image[0].length;

  const dfs = (r, c) => {
    if (r < 0 || r >= m || c < 0 || c >= n || image[r][c] !== startColor) {
      return;
    }

    image[r][c] = color;

    dfs(r - 1, c); // up
    dfs(r + 1, c); // down
    dfs(r, c - 1); // left
    dfs(r, c + 1); // right
  };

  dfs(sr, sc);

  return image;
};

const image = [
  [1, 1, 1],
  [1, 1, 0],
  [1, 0, 1],
];
const sr = 1,
  sc = 1,
  color = 2;

floodFill(image, sr, sc, color);
/* 
Explanation:

The floodFill function takes four arguments:
image: The 2D array representing the image.
sr: Starting row index.
sc: Starting column index.
color: The new color to fill.
We first check if the initial color (image[sr][sc]) is already the new color. If so, no changes are needed, and the function returns the original image.
We then store the number of rows (rows) and columns (cols) of the image for easier access.
An inner recursive function fill is defined. This function takes the current row r and column c as arguments.
Base cases for the recursion:
If r or c is outside the image boundaries (less than 0 or greater than or equal to rows/columns), the function returns.
If the current pixel color (image[r][c]) is not the same as the initial color, the function returns (no need to fill).
If the checks pass, the current pixel's color is changed to the new color.
Recursive calls are made to fill pixels in all four directions (up, down, left, right) using the fill function again.
Complexity Analysis:

Time Complexity: O(m * n) in the worst case, where m and n are the dimensions of the image. This is because the fill function can potentially visit all pixels in the image if the starting pixel is connected to a large contiguous area of the same color.
Space Complexity: O(m * n) in the worst case due to the ca ll stack used for recursion. This can be optimized to O(min(m, n)) by using an iterative approach with a queue to store pixels to be visited.                   
/* function floodFill(image, sr, sc, color) {
  const initialColor = image[sr][sc];
  if (initialColor === color) return image; // No change needed

  const rows = image.length;
  const cols = image[0].length;

  function fill(r, c) {
    if (
      r < 0 ||
      r >= rows ||
      c < 0 ||
      c >= cols ||
      image[r][c] !== initialColor
    )
      return;
    image[r][c] = color;
    fill(r + 1, c); // down
    fill(r - 1, c); // up
    fill(r, c + 1); // right
    fill(r, c - 1); // left
  }

  fill(sr, sc);
  return image;
}

 */
