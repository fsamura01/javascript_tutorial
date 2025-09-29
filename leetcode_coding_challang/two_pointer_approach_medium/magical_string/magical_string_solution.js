// JavaScript Solution
/**
 * @param {number} n
 * @return {number}
 */
var magicalString = function (n) {
  // Handle edge cases - the smallest valid input
  if (n <= 0) return 0;
  if (n <= 3) return 1; // First 3 chars "122" contain exactly 1 one

  // Initialize the magical string with its required seed
  // This seed "122" is the unique starting point that enables self-reference
  let magicalStr = [1, 2, 2];

  // Dual-pointer system for construction
  let head = 2; // Position to read next group size from (start from index 2)
  let tail = 3; // Position to write next character to
  let currentChar = 1; // Next character to write (alternates: 1→2→1→2...)

  // Build the magical string until we have enough characters
  while (tail < n) {
    // Read the instruction: how many characters to write in this group
    let groupSize = magicalStr[head];

    // Write 'groupSize' copies of currentChar
    for (let i = 0; i < groupSize && tail < n; i++) {
      magicalStr[tail] = currentChar;
      tail++;
    }

    // Move to next instruction position
    head++;

    // Alternate between writing 1s and 2s
    currentChar = currentChar === 1 ? 2 : 1;
  }

  // Count the number of 1s in the first n characters
  let onesCount = 0;
  for (let i = 0; i < n; i++) {
    if (magicalStr[i] === 1) {
      onesCount++;
    }
  }

  return onesCount;
};

// Example trace for n = 6:
// Initial: [1, 2, 2]
// head=2, tail=3, currentChar=1
//
// Step 1: Read magicalStr[2]=2, write 2 ones
// Result: [1, 2, 2, 1, 1]
// head=3, tail=5, currentChar=2
//
// Step 2: Read magicalStr[3]=1, write 1 two
// Result: [1, 2, 2, 1, 1, 2]
// head=4, tail=6 >= n, stop
//
// Count ones in "122112": positions 0, 3, 4 = 3 ones
