// Java - Corrected Solution
class Solution {
    public int numSubarrayBoundedMax(int[] nums, int left, int right) {
        int count = 0;
        int lastValidIndex = -1;  // Last index where element was in [left, right]
        int lastBlockerIndex = -1; // Last index where element was > right
        
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > right) {
                // Element is a blocker - no valid subarrays can end here
                lastBlockerIndex = i;
            } 
            else if (nums[i] >= left) {
                // Element is in valid range
                // Count all subarrays ending at i that start after the last blocker
                count += i - lastBlockerIndex;
                lastValidIndex = i;
            } 
            else {
                // Element is below range
                // Only add contribution if we've seen at least one valid element
                // after the last blocker
                if (lastValidIndex > lastBlockerIndex) {
                    count += lastValidIndex - lastBlockerIndex;
                }
            }
        }
        
        return count;
    }
}