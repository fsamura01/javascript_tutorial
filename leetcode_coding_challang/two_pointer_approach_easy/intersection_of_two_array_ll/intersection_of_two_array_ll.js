function intersect(nums1, nums2) {
  // Step 1: Create a frequency map for nums1
  const countMap = {};
  for (const num of nums1) {
    countMap[num] = (countMap[num] || 0) + 1;
  }

  // Step 2: Find the intersection
  const result = [];
  for (const num of nums2) {
    if (countMap[num] > 0) {
      result.push(num); // Add to the result
      countMap[num]--; // Decrease the count
    }
  }

  return result;
}

const nums1 = [1, 2, 2, 1];
const nums2 = [2, 2];
console.log(intersect(nums1, nums2)); // Output: [2, 2]

function intersect(nums1, nums2) {
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);

  const result = [];
  let i = 0,
    j = 0;

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] === nums2[j]) {
      result.push(nums1[i]);
      i++;
      j++;
    } else if (nums1[i] < nums2[j]) {
      i++;
    } else {
      j++;
    }
  }

  return result;
}
