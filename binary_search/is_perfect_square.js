var isPerfectSquare = function (num) {
  let left = 1;
  let right = num;

  while (left <= right) {
    if (num < 1) return false;

    let mid = Math.floor((left + right) / 2);
    let square = mid * mid;
    if (square === num) {
      return true;
    } else if (square > num) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return false;
};
const num = 14;
isPerfectSquare(num);
