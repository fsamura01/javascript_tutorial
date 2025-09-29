/**
 * Circular Array Loop - JavaScript Solution
 * 
 * The key insight is to use Floyd's cycle detection algorithm with modifications
 * for direction checking and cycle length validation.
 */

function circularArrayLoop(nums) {
    const n = nums.length;
    
    // Helper function to calculate next position in circular array
    function getNext(index) {
        // Handle negative indices by adding n before taking modulo
        // This ensures we always get a positive result
        return ((index + nums[index]) % n + n) % n;
    }
    
    // Helper function to check if two positions have same direction
    function sameDirection(i, j) {
        // Both positive or both negative
        return (nums[i] > 0) === (nums[j] > 0);
    }
    
    // Try starting from each position
    for (let i = 0; i < n; i++) {
        // Skip if we've already marked this position as visited
        if (nums[i] === 0) continue;
        
        // Use Floyd's algorithm: slow moves 1 step, fast moves 2 steps
        let slow = i;
        let fast = getNext(i);
        
        // Continue while directions are consistent and positions are different
        while (sameDirection(slow, fast) && sameDirection(fast, getNext(fast))) {
            // If slow and fast meet, we found a cycle
            if (slow === fast) {
                // Check if it's a cycle of length > 1
                // (not a self-loop)
                if (slow === getNext(slow)) {
                    break; // Self-loop, not a valid cycle
                }
                return true; // Found valid cycle
            }
            
            // Move pointers
            slow = getNext(slow);
            fast = getNext(getNext(fast));
        }
        
        // Mark all positions in this path as visited to avoid redundant work
        // We know they don't lead to valid cycles
        slow = i;
        let sign = nums[i] > 0 ? 1 : -1;
        while (sameDirection(slow, getNext(slow))) {
            let next = getNext(slow);
            nums[slow] = 0; // Mark as visited
            slow = next;
            if (nums[slow] === 0) break; // Already marked
        }
        nums[slow] = 0; // Mark the last position too
    }
    
    return false; // No valid cycle found
}

// Test cases
console.log(circularArrayLoop([2, -1, 1, 2, 2])); // true
console.log(circularArrayLoop([-1, -2, -3, -4, -5, 6])); // false
console.log(circularArrayLoop([1, -1, 5, 1, 4])); // true