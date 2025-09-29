/**
 * @param {number[][]} nums1
 * @param {number[][]} nums2
 * @return {number[][]}
 */

/* Hash Map based solution */
function mergeArrays(nums1, nums2) {
    // Step 1: Create a Map to store id -> value mappings
    const idToValue = new Map();
    
    // Step 2: Process the first array
    for (const [id, val] of nums1) {
        idToValue.set(id, val);
    }
    
    // Step 3: Process the second array
    for (const [id, val] of nums2) {
        // If id already exists in map, add the values
        if (idToValue.has(id)) {
            idToValue.set(id, idToValue.get(id) + val);
        } else {
            // Otherwise, add the new id-value pair
            idToValue.set(id, val);
        }
    }
    
    // Step 4: Convert map to array of [id, val] pairs
    const result = Array.from(idToValue, ([id, val]) => [id, val]);
    
    // Step 5: Sort by id (first element in each pair)
    result.sort((a, b) => a[0] - b[0]);
    
    return result;
}

/* Alternative 1: Using Object instead of Map */
function mergeArrays(nums1, nums2) {
    const idToValue = {};
    
    // Process both arrays
    for (const [id, val] of nums1) {
        idToValue[id] = (idToValue[id] || 0) + val;
    }
    
    for (const [id, val] of nums2) {
        idToValue[id] = (idToValue[id] || 0) + val;
    }
    
    // Convert to result format and sort
    return Object.entries(idToValue)
        .map(([id, val]) => [Number(id), val])
        .sort((a, b) => a[0] - b[0]);
}

/* Alternative 2: Two-Pointer Approach (if arrays are already sorted) */

function mergeArrays(nums1, nums2) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i][0] < nums2[j][0]) {
            result.push(nums1[i]);
            i++;
        } else if (nums1[i][0] > nums2[j][0]) {
            result.push(nums2[j]);
            j++;
        } else { // Equal ids
            result.push([nums1[i][0], nums1[i][1] + nums2[j][1]]);
            i++;
            j++;
        }
    }
    
    // Add remaining elements
    while (i < nums1.length) result.push(nums1[i++]);
    while (j < nums2.length) result.push(nums2[j++]);
    
    return result;
}