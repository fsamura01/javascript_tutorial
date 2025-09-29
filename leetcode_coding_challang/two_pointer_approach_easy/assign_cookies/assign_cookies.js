var findContentChildren = function (g, s) {
  // Step 1: Sort both arrays
  g.sort((a, b) => a - b); // Sort greed factors
  s.sort((a, b) => a - b); // Sort cookie sizes

  let i = 0,
    j = 0; // Pointers for children and cookies
  let contentChildren = 0; // Counter for satisfied children

  // Step 2: Try to satisfy children with available cookies
  while (i < g.length && j < s.length) {
    if (s[j] >= g[i]) {
      // If cookie can satisfy child
      contentChildren++; // Increase count
      i++; // Move to next child
    }
    j++; // Move to next cookie
  }

  return contentChildren; // Return total satisfied children
};

findContentChildren([1, 2, 3], [1, 1]);
findContentChildren([1, 2], [1, 2, 3]);
findContentChildren([1, 1, 1, 1, 1], [1, 1]);
