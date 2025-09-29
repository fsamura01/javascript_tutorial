public class Solution {
    public int findUnsortedSubarray(int[] nums) {
        int n = nums.length;
        int left = -1, right = -1;
        
        // Step 1: Find initial boundaries
        for (int i = 1; i < n; i++) {
            if (nums[i] < nums[i - 1]) {
                left = i - 1;
                break;
            }
        }
        
        if (left == -1) return 0; // Already sorted
        
        for (int i = n - 2; i >= 0; i--) {
            if (nums[i] > nums[i + 1]) {
                right = i + 1;
                break;
            }
        }
        
        // Step 2: Find min and max in unsorted region
        int min = Integer.MAX_VALUE, max = Integer.MIN_VALUE;
        for (int i = left; i <= right; i++) {
            min = Math.min(min, nums[i]);
            max = Math.max(max, nums[i]);
        }
        
        // Step 3: Expand boundaries
        while (left > 0 && nums[left - 1] > min) {
            left--;
        }
        
        while (right < n - 1 && nums[right + 1] < max) {
            right++;
        }
        
        return right - left + 1;
    }
    
    // Optimized Java Solution
    public int findUnsortedSubarrayOptimized(int[] nums) {
        int n = nums.length;
        int left = n, right = 0;
        int min = Integer.MAX_VALUE, max = Integer.MIN_VALUE;
        
        for (int i = 0; i < n - 1; i++) {
            if (nums[i] > nums[i + 1]) {
                min = Math.min(min, nums[i + 1]);
                max = Math.max(max, nums[i]);
                if (left == n) left = i;
                right = i + 1;
            }
        }
        
        if (left == n) return 0;
        
        while (left > 0 && nums[left - 1] > min) left--;
        while (right < n - 1 && nums[right + 1] < max) right++;
        
        return right - left + 1;
    }
}