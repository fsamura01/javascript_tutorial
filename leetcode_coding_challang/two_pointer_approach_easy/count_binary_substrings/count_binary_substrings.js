function countBinarySubstrings(s) {
  let groups = []; // Store the lengths of consecutive 0's or 1's
  let count = 1; // Count occurrences of current character

  // Step 1: Create the groups array
  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      count++;
    } else {
      groups.push(count);
      count = 1; // Reset count for new character
    }
  }
  groups.push(count); // Push the last group

  // Step 2: Count valid substrings
  let result = 0;
  for (let i = 0; i < groups.length - 1; i++) {
    result += Math.min(groups[i], groups[i + 1]); // Minimum of adjacent groups
  }

  return result;
}

countBinarySubstrings("10101"); // 4
countBinarySubstrings("00110011"); // 6
countBinarySubstrings("000111000"); // 6
countBinarySubstrings("01"); // 1
countBinarySubstrings("0011"); // 2
countBinarySubstrings("1111"); // 0

function countBinarySubstringsOptimized(s) {
  let prev = 0,
    curr = 1,
    result = 0;

  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      curr++; // Continue counting the current group
    } else {
      result += Math.min(prev, curr); // Add min of previous and current group
      prev = curr; // Move current group to previous
      curr = 1; // Reset current group count
    }
  }
  result += Math.min(prev, curr); // Add the last pair

  return result;
}

console.log(countBinarySubstringsOptimized("00110011")); // 6
console.log(countBinarySubstringsOptimized("10101")); // 4
console.log(countBinarySubstringsOptimized("000111000")); // 6
console.log(countBinarySubstringsOptimized("01")); // 1
console.log(countBinarySubstringsOptimized("0011")); // 2
console.log(countBinarySubstringsOptimized("1111")); // 0

// Initialize groups with first character
let groups = [1];

// Count consecutive groups
for (let i = 1; i < s.length; i++) {
  if (s[i] === s[i - 1]) {
    // Extend current group if same character
    groups[groups.length - 1]++;
  } else {
    // Start new group if different character
    groups.push(1);
  }
}

// Count valid substrings by comparing adjacent groups
let validSubstrings = 0;
for (let i = 1; i < groups.length; i++) {
  // Take minimum of adjacent group lengths
  validSubstrings += Math.min(groups[i - 1], groups[i]);
}

function countBinarySubstrings(s) {
  // This will store our final count of valid substrings
  let count = 0;

  // prevCount keeps track of the count of previous character group
  // currCount keeps track of the count of current character group
  let prevCount = 0;
  let currCount = 1;

  // We'll iterate through the string starting from index 1
  // comparing each character with the previous one
  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      // If current character matches previous, increment current group count
      currCount++;
    } else {
      // If we find a different character:
      // 1. Add to total count the minimum of previous and current group counts
      // 2. Update prevCount to be the last currCount
      // 3. Reset currCount for the new group
      count += Math.min(prevCount, currCount);
      prevCount = currCount;
      currCount = 1;
    }
  }

  // Don't forget to count the last group comparison
  count += Math.min(prevCount, currCount);

  return count;
}
