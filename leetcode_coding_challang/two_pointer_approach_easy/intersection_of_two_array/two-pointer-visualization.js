/**
 * Visualization of Two-Pointer Intersection Algorithm
 */
function visualizeTwoPointerIntersection(nums1, nums2) {
    // Sort both arrays
    const sortedNums1 = [...nums1].sort((a, b) => a - b);
    const sortedNums2 = [...nums2].sort((a, b) => a - b);
    
    console.log("Sorted Arrays:");
    console.log("nums1:", sortedNums1);
    console.log("nums2:", sortedNums2);
    
    const result = [];
    let i = 0, j = 0;
    
    console.log("\nStep-by-Step Pointer Movement:");
    
    while (i < sortedNums1.length && j < sortedNums2.length) {
        console.log(`
Current State:
- nums1[${i}] = ${sortedNums1[i]}
- nums2[${j}] = ${sortedNums2[j]}
- Result so far: ${result}`);
        
        if (sortedNums1[i] < sortedNums2[j]) {
            console.log(`${sortedNums1[i]} < ${sortedNums2[j]}, moving nums1 pointer`);
            i++;
        } else if (sortedNums1[i] > sortedNums2[j]) {
            console.log(`${sortedNums1[i]} > ${sortedNums2[j]}, moving nums2 pointer`);
            j++;
        } else {
            console.log(`Match found: ${sortedNums1[i]}`);
            // Add to result only if not already present
            if (result.length === 0 || result[result.length - 1] !== sortedNums1[i]) {
                result.push(sortedNums1[i]);
            }
            i++;
            j++;
        }
    }
    
    console.log("\nFinal Result:", result);
    return result;
}

// Demonstration
visualizeTwoPointerIntersection([4,9,5], [9,4,9,8,4]);
