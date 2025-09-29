function mySqrt(x) {
  if (x === 0 || x === 1) return x;

  let left = 1;
  let right = x;
  let ans = 0;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let square = mid * mid;

    if (square === x) {
      return mid;
    } else if (square < x) {
      ans = mid; // mid is a candidate for the answer
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return ans; // The largest integer whose square is less than or equal to x
}

// Example usage:
console.log(mySqrt(4)); // Output: 2
console.log(mySqrt(8)); // Output: 2
