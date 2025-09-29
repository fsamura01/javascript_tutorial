var decodeString = function (s) {
  const stack = [];
  let currentNum = 0;
  let currentStr = "";

  for (let char of s) {
    if (char === "[") {
      stack.push(currentStr);
      stack.push(currentNum);
      currentStr = "";
      currentNum = 0;
    } else if (char === "]") {
      let num = stack.pop();
      let prevStr = stack.pop();
      currentStr = prevStr + currentStr.repeat(num);
    } else if (!isNaN(char)) {
      currentNum = currentNum * 10 + parseInt(char);
    } else {
      currentStr += char;
    }
  }

  return currentStr;
};

const s_1 = "3[a2[c]]";
/* const s_2 = "3[a]2[bc]"
const s_3 = "3[a2[c]]"
const s_4 = "2[abc]3[cd]ef";
 */

decodeString(s_1);
