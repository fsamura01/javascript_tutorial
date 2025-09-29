/**
 * Circular Array Loop - Java Solution
 * 
 * This solution uses Floyd's cycle detection algorithm with modifications
 * for direction checking and cycle length validation.
 */

public class CircularArrayLoop {
    
    public boolean circularArrayLoop(int[] nums) {
        int n = nums.length;
        
        // Try starting from each position
        for (int i = 0; i < n; i++) {
            // Skip if we've already marked this position as visited
            if (nums[i] == 0) continue;
            
            // Use Floyd's algorithm: slow moves 1 step, fast moves 2 steps
            int slow = i;
            int fast = getNext(nums, i);
            
            // Continue while directions are consistent and positions are different
            while (sameDirection(nums, slow, fast) && 
                   sameDirection(nums, fast, getNext(nums, fast))) {
                
                // If slow and fast meet, we found a cycle
                if (slow == fast) {
                    // Check if it's a cycle of length > 1 (not a self-loop)
                    if (slow == getNext(nums, slow)) {
                        break; // Self-loop, not a valid cycle
                    }
                    return true; // Found valid cycle
                }
                
                // Move pointers
                slow = getNext(nums, slow);
                fast = getNext(nums, getNext(nums, fast));
            }
            
            // Mark all positions in this path as visited to avoid redundant work
            // We know they don't lead to valid cycles
            slow = i;
            while (sameDirection(nums, slow, getNext(nums, slow))) {
                int next = getNext(nums, slow);
                nums[slow] = 0; // Mark as visited
                slow = next;
                if (nums[slow] == 0) break; // Already marked
            }
            nums[slow] = 0; // Mark the last position too
        }
        
        return false; // No valid cycle found
    }
    
    /**
     * Helper function to calculate next position in circular array
     * Handles negative indices properly using modulo arithmetic
     */
    private int getNext(int[] nums, int index) {
        int n = nums.length;
        // Handle negative indices by adding n before taking modulo
        // This ensures we always get a positive result
        return ((index + nums[index]) % n + n) % n;
    }
    
    /**
     * Helper function to check if two positions have same direction
     * Both values should be positive or both should be negative
     */
    private boolean sameDirection(int[] nums, int i, int j) {
        return (nums[i] > 0) == (nums[j] > 0);
    }
    
    // Test method
    public static void main(String[] args) {
        CircularArrayLoop solution = new CircularArrayLoop();
        
        // Test case 1: Expected true
        int[] nums1 = {2, -1, 1, 2, 2};
        System.out.println(solution.circularArrayLoop(nums1)); // true
        
        // Test case 2: Expected false
        int[] nums2 = {-1, -2, -3, -4, -5, 6};
        System.out.println(solution.circularArrayLoop(nums2)); // false
        
        // Test case 3: Expected true
        int[] nums3 = {1, -1, 5, 1, 4};
        System.out.println(solution.circularArrayLoop(nums3)); // true
    }
}