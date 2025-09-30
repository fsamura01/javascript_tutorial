/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function (s) {
  // Phase 1: Record last occurrence of each character
  const lastOccurrence = new Map();

  for (let i = 0; i < s.length; i++) {
    lastOccurrence.set(s[i], i);
  }

  // Phase 2: Build partitions greedily
  const result = [];
  let start = 0; // Start of current partition
  let end = 0; // Current partition must extend at least to 'end'

  for (let i = 0; i < s.length; i++) {
    // Extend partition boundary if needed
    end = Math.max(end, lastOccurrence.get(s[i]));

    // If we've reached the boundary, finalize this partition
    if (i === end) {
      result.push(i - start + 1);
      start = i + 1; // Next partition starts here
    }
  }

  return result;
};

// Example usage
console.log(partitionLabels("ababcbacadefegdehijhklij")); // [9, 7, 8]
console.log(partitionLabels("eccbbbbdec")); // [10]
