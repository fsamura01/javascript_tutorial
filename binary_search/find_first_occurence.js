function findFirstOccurrence(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let targetIndex = -1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] == target) {
      targetIndex = mid;
      right = mid - 1;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return targetIndex;
}

findFirstOccurrence([1, 3, 3, 3, 3, 6, 10, 10, 10, 100], 3); // output: 1
findFirstOccurrence([2, 3, 5, 7, 11, 13, 17, 19], 6); // output: -1
