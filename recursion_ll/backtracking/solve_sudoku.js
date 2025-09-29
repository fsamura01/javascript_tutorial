/*37. Sudoku Solver*/
function solveSudoku(board) {
  // Helper function to find the next empty cell
  function findEmpty(board) {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === ".") {
          return [row, col];
        }
      }
    }
    return null;
  }

  // Helper function to check if it's valid to place `num` at board[row][col]
  function isValidPlacement(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
      // Check row
      if (board[row][i] === num) return false;
      // Check column
      if (board[i][col] === num) return false;
      // Check 3x3 box
      const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(col / 3) + (i % 3);
      if (board[boxRow][boxCol] === num) return false;
    }
    return true;
  }

  // Backtracking function to solve the board
  function backtrack(board) {
    const empty = findEmpty(board);
    if (!empty) return true; // No empty cells, puzzle solved
    const [row, col] = empty;

    for (let num = 1; num <= 9; num++) {
      const charNum = num.toString();
      if (isValidPlacement(board, row, col, charNum)) {
        board[row][col] = charNum;
        if (backtrack(board)) return true;
        board[row][col] = "."; // Backtrack
      }
    }
    return false; // No valid number found, need to backtrack
  }

  // Start the solving process
  backtrack(board);
}

// Example usage:
const board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

solveSudoku(board);

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
function solveSudoku(board) {
  solve(board);
}

function solve(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === ".") {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, i, j, num.toString())) {
            board[i][j] = num.toString();
            if (solve(board)) {
              return true;
            } else {
              board[i][j] = ".";
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}

function isValid(board, row, col, num) {
  // Check row
  for (let j = 0; j < 9; j++) {
    if (board[row][j] === num) return false;
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) return false;
  }

  // Check 3x3 sub-box
  let boxRow = Math.floor(row / 3) * 3;
  let boxCol = Math.floor(col / 3) * 3;
  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }

  return true;
}
