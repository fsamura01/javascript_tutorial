/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
function intersection(nums1, nums2) {
  // Step 1: Create a set for nums1
  const set1 = new Set(nums1);

  // Step 2: Create a result set to store the intersection
  const resultSet = new Set();

  // Step 3: Iterate through nums2 and check if each element exists in set1
  for (let num of nums2) {
    if (set1.has(num)) {
      resultSet.add(num); // Add the number to the result set
    }
  }

  // Step 4: Convert the result set to an array and return
  return Array.from(resultSet);
}

intersection([1, 2, 2, 1], [2, 2]);
intersection([4, 9, 5], [9, 4, 9, 8, 4]);

var intersection = function (nums1, nums2) {
  let set1 = new Set(nums1);
  let set2 = new Set(nums2);

  const intersections = [...set1].filter((num) => set2.has(num));

  return intersections;
};

function intersection(nums1, nums2) {
  // Sort both arrays
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);

  const result = [];
  let i = 0,
    j = 0;

  // Traverse both arrays using two pointers
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] === nums2[j]) {
      // Avoid adding duplicates
      if (result.length === 0 || result[result.length - 1] !== nums1[i]) {
        result.push(nums1[i]);
      }
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
