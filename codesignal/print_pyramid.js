function printPyramid(N) {
  for (let i = 0; i < N; i++) {
    let spaces = " ".repeat(N - i - 1); // Calculate spaces on the left
    let stars = "*".repeat(2 * i + 1); // Calculate number of asterisks
    console.log(spaces + stars + spaces); // Print the row
  }
}

// Generate a pyramid with N = 10
printPyramid(10);
