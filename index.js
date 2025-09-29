/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  if (s.length === 1) return s.length;

  let result = 0;

  for (let i = 0; i < s.length; i++) {
    result += expandAroundCenter(s, i, i);
    result += expandAroundCenter(s, i, i + 1);
  }

  return result;
};

function expandAroundCenter(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }

  return right - left - 1;
}

countSubstrings("abc");
countSubstrings("aaa");
