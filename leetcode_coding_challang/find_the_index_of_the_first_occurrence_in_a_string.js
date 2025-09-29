/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  // Edge cases
  if (needle.length === 0) return 0;
  if (needle.length > haystack.length) return -1;

  // Iterate through potential starting positions in haystack
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let match = true;
    // Check if substring starting at i matches needle
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        match = false;
        break;
      }
    }
    if (match) return i;
  }
  return -1;
};

strStr("sadbutsad", "sad");
strStr("leetcode", "leeto");
strStr("hello", "ll");
strStr("mississippi", "issip");
