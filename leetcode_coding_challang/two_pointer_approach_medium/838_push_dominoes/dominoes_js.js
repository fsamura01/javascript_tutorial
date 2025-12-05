/**
 * @param {string} dominoes
 * @return {string}
 */
function pushDominoes(dominoes) {
    const n = dominoes.length;
    
    // Array to store the "distance" or time for rightward force to reach each position
    // Infinity means no rightward force reaches that position
    const rightForces = new Array(n).fill(Infinity);
    
    // Array to store the "distance" or time for leftward force to reach each position
    const leftForces = new Array(n).fill(Infinity);
    
    // First pass: Calculate rightward forces (left to right scan)
    let rightDistance = Infinity;
    for (let i = 0; i < n; i++) {
        if (dominoes[i] === 'R') {
            // Found a right-falling domino - it's a source of rightward force
            rightDistance = 0;
        } else if (dominoes[i] === 'L') {
            // Left-falling domino blocks rightward force
            rightDistance = Infinity;
        } else {
            // Empty position - if there's a rightward force active, increment distance
            if (rightDistance !== Infinity) {
                rightDistance++;
            }
        }
        rightForces[i] = rightDistance;
    }
    
    // Second pass: Calculate leftward forces (right to left scan)
    let leftDistance = Infinity;
    for (let i = n - 1; i >= 0; i--) {
        if (dominoes[i] === 'L') {
            // Found a left-falling domino - it's a source of leftward force
            leftDistance = 0;
        } else if (dominoes[i] === 'R') {
            // Right-falling domino blocks leftward force
            leftDistance = Infinity;
        } else {
            // Empty position - if there's a leftward force active, increment distance
            if (leftDistance !== Infinity) {
                leftDistance++;
            }
        }
        leftForces[i] = leftDistance;
    }
    
    // Build the final result by comparing forces at each position
    const result = [];
    for (let i = 0; i < n; i++) {
        const rightForce = rightForces[i];
        const leftForce = leftForces[i];
        
        if (rightForce < leftForce) {
            // Rightward force arrives first - domino falls right
            result.push('R');
        } else if (leftForce < rightForce) {
            // Leftward force arrives first - domino falls left
            result.push('L');
        } else {
            // Forces are equal (both Infinity or same distance) - domino stays upright
            result.push('.');
        }
    }
    
    return result.join('');
}

// Test cases
console.log(pushDominoes("RR.L"));        // Expected: "RR.L"
console.log(pushDominoes(".L.R...LR..L..")); // Expected: "LL.RR.LLRRLL.."
console.log(pushDominoes("..R.."));       // Expected: "..RRR"
console.log(pushDominoes("..L.."));       // Expected: "LLL.."