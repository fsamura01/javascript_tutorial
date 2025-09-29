const reverseString = (s) => {
  let left = 0;
  let right = s.length - 1;

  // iterative algorithm
  while (left < right) {
    let temp = s[left];
    s[left] = s[right];
    s[right] = temp;

    left++;
    right--;
  }
};

// Example usage:
const s1 = ["h", "e", "l", "l", "o"];
reverseString(s1);
const s2 = ["H", "a", "n", "n", "a", "h"];
