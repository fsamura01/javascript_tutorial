/* var updateMatrix = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const queue = [];
  const dist = Array.from({ length: m }, () => Array(n).fill(Infinity));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 0) {
        queue.push([i, j]);
        dist[i][j] = 0;
      }
    }
  }

  // BFS
  while (queue.length > 0) {
    const [x, y] = queue.shift();
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (
        nx >= 0 &&
        nx < m &&
        ny >= 0 &&
        ny < n &&
        dist[nx][ny] > dist[x][y] + 1
      ) {
        dist[nx][ny] = dist[x][y] + 1;
        queue.push([nx, ny]);
      }
    }
  }

  return dist;
};

const mat = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];

updateMatrix(mat);
 */

function updateMatrix(mat) {
  const rows = mat.length;
  const cols = mat[0].length;
  const queue = [];

  // Add all initial zeros to the queue
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (mat[i][j] === 0) {
        queue.push([i, j]);
      } else {
        mat[i][j] = Infinity; // Mark non-zeros as infinity initially
      }
    }
  }

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]; // Up, down, left, right

  while (queue.length) {
    const [row, col] = queue.shift();
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      // Check if new cell is within bounds and not visited yet
      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        mat[newRow][newCol] === Infinity
      ) {
        mat[newRow][newCol] = mat[row][col] + 1; // Update distance
        queue.push([newRow, newCol]); // Add new cell to explore
      }
    }
  }

  return mat;
}

const mat = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];

updateMatrix(mat);
