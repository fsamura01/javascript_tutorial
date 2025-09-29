function intersect(nums1, nums2) {
  let map = {};
  let result = [];

  // Count the frequency of each element in nums1
  for (let num of nums1) {
    if (map[num] === undefined) {
      map[num] = 1;
    } else {
      map[num]++;
    }
  }

  // Find the intersection
  for (let num of nums2) {
    if (map[num] > 0) {
      result.push(num);
      map[num]--;
    }
  }

  return result;
}

// Example usage:
console.log(intersect([1, 2, 2, 1], [2, 2])); // Output: [2,2]
console.log(intersect([4, 9, 5], [9, 4, 9, 8, 4])); // Output: [9,4] (order may vary)

var intersect = function (nums1, nums2) {
  let K = Math.max(...nums1);
  const countFrequency = new Array(K + 1).fill(0);
  let result = [];

  for (let i = 0; i < nums1.length; i++) {
    countFrequency[nums1[i]] += 1;
  }

  for (let num of nums2) {
    if (countFrequency[num] > 0) {
      result.push(num);
      countFrequency[num]--;
    }
  }

  return result;
};

const nums1 = [1, 2, 2, 1],
  nums2 = [2, 2];
intersect(nums1, nums2);

/*
  var intersection = function(nums1, nums2) {
  const k = Math.max(...nums1)
  const counts = new Array(k + 1).fill(0);
  const resultsArray = [];
  
  for(let i = 0; i < nums1.length; i++){
    counts[nums1[i]] +=1
  }
  
  for(let i = 0; i < nums2.length; i++){
    if(counts[nums2[i]] > 0){
        resultsArray.push(nums2[i]);
        counts[nums2[i]] -=1
    }
  }
 
 return resultsArray;
};

const nums1 = [4,9,5], nums2 = [9,4,9,8,4]
intersection(nums1, nums2);
*/

/*
  function intersect(nums1, nums2) {
    let hasMap = {};
    let result = []
    
    for(let i = 0; i < nums1.length; i++){
      if(hasMap.hasOwnProperty(nums1[i])){
         hasMap[nums1[i]] +=1
      }else{
        hasMap[nums1[i]] = 1  
      }
    }
    
    
    for(let i = 0; i < nums2.length; i++){
      if(hasMap[nums2[i]] > 0){
        result.push(nums2[i]);
        hasMap[nums2[i]] -=1
      }
    }
    
    return result;
}

// Example usage:
console.log(intersect([1,2,2,1], [2,2])); // Output: [2,2]
console.log(intersect([4,9,5], [9,4,9,8,4])); // Output: [9,4] (order may vary)
*/
