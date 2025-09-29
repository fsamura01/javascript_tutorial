function totalNQueens(n) {
  // Helper function to check if a queen placement is valid (no conflicts)
  function isValidPlacement(col, row) {
    for (let i = 0; i < row; i++) {
      // Check if queens are in the same row or diagonals
      if (cols[i] === col || Math.abs(cols[i] - col) === row - i) {
        return false;
      }
    }
    return true;
  }

  // Recursive function to backtrack and count solutions
  function backtrack(row) {
    if (row === n) {
      solutions++; // Increment solution count when all n queens are placed
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isValidPlacement(col, row)) {
        cols[row] = col; // Place queen in this column
        backtrack(row + 1); // Recursively try placements for the next row
        cols[row] = -1; // Backtrack: remove queen from this column
      }
    }
  }

  let solutions = 0;
  const cols = new Array(n).fill(-1); // Array to store column placements for each row (-1 indicates no queen)
  backtrack(0);
  return solutions;
}

totalNQueens(4);
