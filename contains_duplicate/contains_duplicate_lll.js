/**
 * @param {number[]} nums
 * @param {number} indexDiff
 * @param {number} valueDiff
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function (nums, indexDiff, valueDiff) {
  if (indexDiff < 1 || valueDiff < 0) return false;

  const bucketMap = new Map(); // Map to store buckets
  const bucketSize = valueDiff + 1; // Define bucket size

  // Helper function to get bucket id for a number
  const getBucketId = (num) => {
    return Math.floor(num / bucketSize);
  };

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const bucketId = getBucketId(num);

    // Check if there's already a number in the same bucket
    if (bucketMap.has(bucketId)) {
      return true;
    }

    // Check the neighboring buckets for close values
    if (
      bucketMap.has(bucketId - 1) &&
      Math.abs(num - bucketMap.get(bucketId - 1)) <= valueDiff
    ) {
      return true;
    }
    if (
      bucketMap.has(bucketId + 1) &&
      Math.abs(num - bucketMap.get(bucketId + 1)) <= valueDiff
    ) {
      return true;
    }

    // Add the current number to the current bucket
    bucketMap.set(bucketId, num);

    // Remove the number that is too far away (beyond indexDiff range)
    if (i >= indexDiff) {
      const oldBucketId = getBucketId(nums[i - indexDiff]);
      bucketMap.delete(oldBucketId);
    }
  }

  return false;
};
containsNearbyAlmostDuplicate([1, 2, 3, 1], 3, 0);
containsNearbyAlmostDuplicate([1, 5, 9, 1, 5, 9], 2, 3);
