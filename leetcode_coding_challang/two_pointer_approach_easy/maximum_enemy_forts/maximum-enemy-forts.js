/**
 * @param {number[]} forts
 * @return {number} Maximum number of enemy forts that can be captured
 */
var captureForts = function(forts) {
    let maxCaptured = 0;
    
    // Iterate through each potential starting position
    for (let i = 0; i < forts.length; i++) {
        // Only consider positions with a player (1)
        if (forts[i] === 1) {
            // Check left direction
            let leftCaptured = captureInDirection(forts, i, -1);
            
            // Check right direction
            let rightCaptured = captureInDirection(forts, i, 1);
            
            // Update maximum captured forts
            maxCaptured = Math.max(maxCaptured, leftCaptured, rightCaptured);
        }
    }
    
    return maxCaptured;
};

/**
 * Helper function to count capturable forts in a given direction
 * @param {number[]} forts Array of forts
 * @param {number} start Starting index
 * @param {number} direction Direction of movement (-1 for left, 1 for right)
 * @return {number} Number of capturable forts
 */
function captureInDirection(forts, start, direction) {
    let captured = 0;
    let i = start + direction;
    
    // Move in the specified direction
    while (i >= 0 && i < forts.length) {
        // Stop if we encounter another player
        if (forts[i] === 1) break;
        if (forts[i] === -1) break;
        
        // Count enemy forts (0s)
        if (forts[i] === 0) captured++;
        
        i += direction;
    }
    
    // Return 0 if we didn't reach an enemy fort at the end
    return (i >= 0 && i < forts.length && forts[i] === -1) ? captured : 0;
}

// Test cases
console.log(captureForts([1,0,0,0,0,0,0,0,1])); // Expected output: 7
console.log(captureForts([0,0,1,0])); // Expected output: 0
console.log(captureForts([1,0,0,1])); // Expected output: 2
