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
