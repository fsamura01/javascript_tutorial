function countOccurrences(arr, target) {
  function findFirstOccurrence(arr, target) {
    let left = 0,
      right = arr.length - 1,
      firstOccurrence = -1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] === target) {
        firstOccurrence = mid;
        right = mid - 1; // continue searching to the left
      } else if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return firstOccurrence;
  }

  function findLastOccurrence(arr, target) {
    let left = 0,
      right = arr.length - 1,
      lastOccurrence = -1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] === target) {
        lastOccurrence = mid;
        left = mid + 1; // continue searching to the right
      } else if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return lastOccurrence;
  }

  let firstIndex = findFirstOccurrence(arr, target);
  if (firstIndex === -1) {
    return 0; // target not found
  }

  let lastIndex = findLastOccurrence(arr, target);
  return lastIndex - firstIndex + 1;
}

// Example usage:
console.log(countOccurrences([4, 4, 8, 8, 8, 15, 16, 23, 23, 42], 8)); // Output: 3
console.log(countOccurrences([3, 5, 5, 5, 5, 7, 8, 8], 6)); // Output: 0
console.log(countOccurrences([3, 5, 5, 5, 5, 7, 8, 8], 5)); // Output: 4

/*
  function countOccurrences(arr, target) {
    const findFirst = (arr, target) => {
        let left = 0;
        let right = arr.length - 1;
        
        while(left <= right){
            let mid = Math.floor((left + right)/2);
            
            if(arr[mid] < target){
                left = mid + 1;
            }else{
                right = mid -1;
            }
        }
        
        if(arr[left] === target){
            return left
        }else{
            return - 1
        }
    };
    
    const findLast = (arr, target) => {
        let left = 0;
        let right = arr.length - 1;
        
        while(left <= right){
            let mid = Math.floor((left + right)/2);
            
            if(arr[mid] <= target){
                left = mid + 1;
            }else{
                right = mid -1;
            }
        }
        
        if(arr[right] === target){
            return right;
        }else{
            return - 1
        }
    };
    
    const firstIndex = findFirst(arr, target)
    const lastIndex = findLast(arr, target)
    
    return lastIndex - firstIndex + 1;
  }
const arr = [4, 4, 8, 8, 8, 15, 16, 23, 23, 42], target = 8
//const arr = [3, 5, 5, 5, 5, 7, 8, 8], target = 6
countOccurrences(arr, target);
*/
