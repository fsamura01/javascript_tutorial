// for (let num of nums) {
//   if (frequencyMap.has(num)) {
//     frequencyMap.set(num, frequencyMap.get(num) + 1);
//   } else {
//     frequencyMap.set(num, 1);
//   }
// }

function topKFrequent(nums, k) {
  // Step 1: Frequency map
  const frequencyMap = new Map();
  `There are multiple ways to loop through a Map in JavaScript:
   Using the for-of loop (Reference: https://www.hackinbits.com/articles/js/how-to-iterate-a-map-in-javascript---map-part-2):

   1. let myMap = new Map([["a", 1], ["b", 2], ["c", 3]]);
      for (let [key, value] of myMap) {
      console.log(key, value);

   2. let myMap = new Map([["a", 1], ["b", 2], ["c", 3]]);
      myMap.forEach((value, key, map) => {
      console.log(key, value);

   3. Although not a Map-specific method, you can convert a Map into an array using the 
      Array.from()
      method, and then loop through this array as you would with an array
      
      let myMap = new Map([["a", 1], ["b", 2], ["c", 3]]);
      Array.from(myMap).forEach(([key, value]) => {
      console.log(key, value);
});

});
   
}

  `;

  for (let num of nums) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  }

  // Step 2: Create buckets based on frequency
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (let [num, freq] of frequencyMap) {
    buckets[freq].push(num);
  }

  // Step 3: Gather the top k frequent elements
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    if (buckets[i].length > 0) {
      result.push(...buckets[i]);
    }
  }

  return result.slice(0, k); // Return only the top k elements
}

// Example usage:
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // Output: [1, 2]
console.log(topKFrequent([1], 1)); // Output: [1]
