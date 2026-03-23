function maxDistance(nums1, nums2) {
  let i = 0,
    j = 0,
    maxDist = 0;
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] <= nums2[j]) {
      maxDist = Math.max(maxDist, j - i);
      j++;
    } else {
      i++;
      j = max(j, i);
    }
  }

  return maxDist;
}
