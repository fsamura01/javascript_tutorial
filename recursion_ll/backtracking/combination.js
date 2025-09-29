function combine(n, k) {
  const results = [];
  function backtrack(start, combo) {
    if (combo.length === k) {
      // Add a copy of the current combination
      results.push(combo.slice());
      return;
    }

    for (let i = start; i <= n; i++) {
      // Add current number to the combination
      combo.push(i);
      // Recursively explore combinations starting from next number
      backtrack(i + 1, combo);
      // Backtrack: remove the added number
      combo.pop();
    }
  }

  backtrack(1, []);
  return results;
}

function combine(n, k) {
  const result = [];

  function backtrack(start, current) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }

    for (let i = start; i <= n; i++) {
      current.push(i);
      backtrack(i + 1, current);
      current.pop();
    }
  }

  backtrack(1, []);
  return result;
}

// Example usage:
console.log(combine(4, 2)); // Output: [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]
console.log(combine(1, 1)); // Output: [[1]]

// Example usage:
combine(4, 2); // Output: [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]
combine(1, 1); // Output: [[1]]
