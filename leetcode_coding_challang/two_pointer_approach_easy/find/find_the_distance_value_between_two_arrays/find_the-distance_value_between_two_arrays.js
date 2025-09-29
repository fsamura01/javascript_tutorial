/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number} d
 * @return {number}
 */
/*  Brute Force (Nested Loops) */
const findTheDistanceValue = (arr1, arr2, d) => {
  // Initialize our distance counter
  let distanceValue = 0;

  // Check each element in arr1
  for (let num1 of arr1) {
    let isValid = true;

    // Compare with each element in arr2
    for (let num2 of arr2) {
      // If we find any number within distance d
      if (Math.abs(num1 - num2) <= d) {
        isValid = false;
        break;
      }
    }

    // If no number in arr2 was within distance d
    if (isValid) {
      distanceValue++;
    }
  }

  return distanceValue;
};

findTheDistanceValue([1, 4, 2, 3], [-4, -3, 6, 10, 20, 30], 3);
findTheDistanceValue([2, 1, 100, 3], [-5, -2, 10, -3, 7], 6);

/* Binary Search */
const findTheDistanceValue1 = (arr1, arr2, d) => {
  // Sort arr2 for binary search
  arr2.sort((a, b) => a - b);
  let distanceValue = 0;

  for (let num of arr1) {
    // If no close number found in arr2, increment distance
    if (isValidDistance(arr2, num, d)) {
      distanceValue++;
    }
  }

  return distanceValue;
};

// Helper function to check if any number in arr is within distance d of target
const isValidDistance = (arr, target, d) => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (Math.abs(arr[mid] - target) <= d) {
      return false;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return true;
};

/* Two Pointers (If both arrays are sorted) */
function findTheDistanceValue(arr1, arr2, d) {
  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);

  let count = 0,
    j = 0;

  for (let x of arr1) {
    while (j < arr2.length && arr2[j] < x - d) j++;
    if (j < arr2.length && Math.abs(arr2[j] - x) <= d) continue;
    count++;
  }

  return count;
}
