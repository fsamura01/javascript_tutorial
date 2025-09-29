function maximumGap(nums) {
  if (nums.length < 2) {
    return 0;
  }

  const min = Math.min(...nums);
  const max = Math.max(...nums);

  const bucketSize = Math.max(1, Math.floor((max - min) / (nums.length - 1)));
  const bucketCount = Math.floor((max - min) / bucketSize) + 1;

  const buckets = Array.from({ length: bucketCount }, () => ({
    min: Infinity,
    max: -Infinity,
  }));

  for (let num of nums) {
    const index = Math.floor((num - min) / bucketSize);
    buckets[index].min = Math.min(buckets[index].min, num);
    buckets[index].max = Math.max(buckets[index].max, num);
  }

  let maxGap = 0;
  let previousMax = min;

  for (let i = 0; i < bucketCount; i++) {
    if (buckets[i].min === Infinity) {
      continue; // Skip empty buckets
    }
    /*
      if(buckets[i].min !== Infinity){
        maxGap = Math.max(maxGap, buckets[i].min - previousMax)
         previousMax = buckets[i].max;
    }
    */
    maxGap = Math.max(maxGap, buckets[i].min - previousMax);
    previousMax = buckets[i].max;
  }

  return maxGap;
}

// Example usage:
console.log(maximumGap([3, 6, 9, 1])); // Output: 3
console.log(maximumGap([10])); // Output: 0
