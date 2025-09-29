/**
 * Flips and inverts a given binary image
 * @param {number[][]} image - The input binary image matrix
 * @return {number[][]} The flipped and inverted image
 */
function flipAndInvertImage(image) {
    // Create a deep copy of the input image to avoid modifying the original
    const result = image.map(row => [...row]);
    
    // Iterate through each row of the image
    for (let i = 0; i < result.length; i++) {
        // Step 1: Reverse the row
        // We use two-pointer technique to swap elements from both ends
        let left = 0;
        let right = result[i].length - 1;
        
        while (left < right) {
            // Swap elements from both ends
            [result[i][left], result[i][right]] = [result[i][right], result[i][left]];
            left++;
            right--;
        }
        
        // Step 2: Invert each element in the row
        // Use map to transform 0 to 1 and 1 to 0
        result[i] = result[i].map(pixel => pixel === 0 ? 1 : 0);
    }
    
    return result;
}

// Test cases
console.log(flipAndInvertImage([[1,1,0],[1,0,1],[0,0,0]]));
// Expected output: [[1,0,0],[0,1,0],[1,1,1]]

console.log(flipAndInvertImage([[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]));
// Expected output: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
