// The isBadVersion API is defined for you.
// function isBadVersion(version: number): boolean {}

function findFirstBadVersion(n) {
  let left = 1;
  let right = n;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (isBadVersion(mid)) {
      right = mid; // The first bad version is at mid or earlier
    } else {
      left = mid + 1; // The first bad version is after mid
    }
  }

  return left; // or return right, since left == right
}

// Example usage:
// Suppose the first bad version is 4 out of 5
// console.log(findFirstBadVersion(5)); // Output: 4
