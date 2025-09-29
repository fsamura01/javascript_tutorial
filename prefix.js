var longestCommonPrefix = function (strs) {
  /* Check for the edge case */
  if (strs.length === 0) {
    return "";
  }
  let prefix = strs[0];

  for (var i = 0; i < strs.length; i++) {
    let j = 0;

    while (
      j < prefix.length &&
      j < strs[i].length &&
      prefix[j] === strs[i][j]
    ) {
      j++;
    }

    prefix = prefix.substring(0, j);

    if (prefix === "") {
      break;
    }
  }

  return prefix;
};
const strs = ["flower", "flow", "flight"];

longestCommonPrefix(strs);
console.log("🚀 ~ longestCommonPrefix(strs):", longestCommonPrefix(strs));
