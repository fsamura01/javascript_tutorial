/**
 * @param {number[]} arr
 * @return {void} Do not return anything, modify arr in-place instead.
 */
var duplicateZeros = function (arr) {
  let zeroCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      zeroCount++;
    }
  }

  if (zeroCount === 0) return;

  const n = arr.length;
  let i = n - 1,
    j = n + zeroCount - 1;

  while (i >= 0 && j >= 0) {
    if (arr[i] === 0) {
      if (j < n) {
        arr[j] = 0;
      }
      j--;
      if (j < n) {
        arr[j] = arr[i];
      }
      j--;
      i--;
    } else {
      if (j < n) {
        arr[j] = arr[i];
      }
      i--;
      j--;
    }
  }
};
