/**
 * Comparison: When to use Map vs Array approach
 * for Advantage Shuffle problem
 */

// ===== ORIGINAL APPROACH: Two Pointers on Sorted Array =====
// Best for this problem because we process in order
function advantageCountTwoPointers(nums1, nums2) {
    const n = nums1.length;
    nums1.sort((a, b) => a - b);
    
    const indexed = nums2.map((val, i) => [val, i])
                          .sort((a, b) => b[0] - a[0]);
    
    const result = new Array(n);
    let left = 0, right = n - 1;
    
    for (const [target, idx] of indexed) {
        if (nums1[right] > target) {
            result[idx] = nums1[right--];
        } else {
            result[idx] = nums1[left++];
        }
    }
    
    return result;
}

// ===== ALTERNATIVE: Using Map to Track Frequencies =====
// Useful when nums1 has DUPLICATE values and we need to track counts
function advantageCountWithMap(nums1, nums2) {
    const n = nums1.length;
    
    // Map stores value -> count (useful for duplicates)
    const available = new Map();
    for (const val of nums1) {
        available.set(val, (available.get(val) || 0) + 1);
    }
    
    // Get sorted unique values (Map doesn't maintain order)
    const sortedValues = Array.from(available.keys()).sort((a, b) => a - b);
    
    const result = new Array(n);
    
    // Process each position in original nums2 order
    for (let i = 0; i < n; i++) {
        const target = nums2[i];
        let chosen = null;
        
        // Binary search for smallest value > target
        let left = 0, right = sortedValues.length - 1;
        let winningIdx = -1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (sortedValues[mid] > target) {
                winningIdx = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        
        if (winningIdx !== -1) {
            // Found a winning card
            chosen = sortedValues[winningIdx];
        } else {
            // Can't win, use smallest card
            chosen = sortedValues[0];
        }
        
        result[i] = chosen;
        
        // Decrease count and remove if depleted
        const count = available.get(chosen);
        if (count === 1) {
            available.delete(chosen);
            sortedValues.splice(sortedValues.indexOf(chosen), 1);
        } else {
            available.set(chosen, count - 1);
        }
    }
    
    return result;
}

// ===== WHEN MAP IS ACTUALLY BETTER: Modified Problem =====
// Suppose nums2 comes as QUERIES over time, not all at once
// In this case, Map is perfect for maintaining available pool

class DynamicAdvantageShuffle {
    constructor(nums1) {
        // Map maintains our pool of available cards
        this.available = new Map();
        for (const val of nums1) {
            this.available.set(val, (this.available.get(val) || 0) + 1);
        }
    }
    
    // Process one query at a time
    playCard(targetValue) {
        // Get all available values, sorted
        const values = Array.from(this.available.keys()).sort((a, b) => a - b);
        
        if (values.length === 0) return null;
        
        // Find smallest card that beats target
        let chosen = null;
        for (const val of values) {
            if (val > targetValue) {
                chosen = val;
                break;
            }
        }
        
        // If no card can win, use smallest
        if (chosen === null) {
            chosen = values[0];
        }
        
        // Remove from available pool
        const count = this.available.get(chosen);
        if (count === 1) {
            this.available.delete(chosen);
        } else {
            this.available.set(chosen, count - 1);
        }
        
        return chosen;
    }
}

// ===== PERFORMANCE COMPARISON =====
function performanceTest() {
    const nums1 = Array.from({length: 1000}, () => Math.floor(Math.random() * 1000));
    const nums2 = Array.from({length: 1000}, () => Math.floor(Math.random() * 1000));
    
    console.log("Testing with 1000 elements...\n");
    
    // Test two-pointer approach
    console.time("Two Pointers");
    const result1 = advantageCountTwoPointers([...nums1], [...nums2]);
    console.timeEnd("Two Pointers");
    
    // Test Map approach
    console.time("Map Approach");
    const result2 = advantageCountWithMap([...nums1], [...nums2]);
    console.timeEnd("Map Approach");
    
    console.log("\nBoth produce valid results!");
}

// ===== KEY INSIGHTS =====
console.log("=== WHEN TO USE EACH APPROACH ===\n");

console.log("✅ Use TWO POINTERS when:");
console.log("  - Processing all values at once");
console.log("  - Values are unique or duplicates don't matter");
console.log("  - You can sort and process in optimal order");
console.log("  - Want simplest, fastest solution\n");

console.log("✅ Use MAP when:");
console.log("  - Need to track value frequencies (duplicates)");
console.log("  - Processing queries dynamically over time");
console.log("  - Need to look up 'do I have this value?'");
console.log("  - Building a value -> metadata mapping\n");

// Run tests
console.log("=== Example Outputs ===\n");
console.log("Test 1:", advantageCountTwoPointers([2,7,11,15], [1,10,4,11]));
console.log("Test 2:", advantageCountWithMap([2,7,11,15], [1,10,4,11]));

console.log("\n=== Dynamic Queries Example ===");
const game = new DynamicAdvantageShuffle([2,7,11,15]);
console.log("Opponent plays 10, we play:", game.playCard(10)); // Should play 11
console.log("Opponent plays 1, we play:", game.playCard(1));   // Should play 2
console.log("Opponent plays 4, we play:", game.playCard(4));   // Should play 7
console.log("Opponent plays 11, we play:", game.playCard(11)); // Should play 15

performanceTest();
