import java.util.Arrays;

public class ValidTriangleNumber {
    
    // Approach 1: Brute Force - O(n³)
    public int triangleNumberBruteForce(int[] nums) {
        int n = nums.length;
        int count = 0;
        
        // Try all possible triplets
        for (int i = 0; i < n - 2; i++) {
            for (int j = i + 1; j < n - 1; j++) {
                for (int k = j + 1; k < n; k++) {
                    // Check if three sides can form a triangle
                    int a = nums[i], b = nums[j], c = nums[k];
                    if (a + b > c && a + c > b && b + c > a) {
                        count++;
                    }
                }
            }
        }
        
        return count;
    }
    
    // Approach 2: Optimized Two Pointers - O(n²)
    public int triangleNumber(int[] nums) {
        int n = nums.length;
        if (n < 3) return 0;
        
        // Step 1: Sort the array
        Arrays.sort(nums);
        
        int count = 0;
        
        // Step 2: Fix the largest side (iterate from right to left)
        for (int k = n - 1; k >= 2; k--) {
            int left = 0;
            int right = k - 1;
            
            // Step 3: Use two pointers to find valid combinations
            while (left < right) {
                // Check if current combination forms a valid triangle
                if (nums[left] + nums[right] > nums[k]) {
                    // All combinations from (left, left+1, ..., right-1) 
                    // with nums[right] are valid
                    count += right - left;
                    right--; // Try smaller right value
                } else {
                    // Sum too small, need larger left value
                    left++;
                }
            }
        }
        
        return count;
    }
    
    // Helper method for testing
    public static void main(String[] args) {
        ValidTriangleNumber solution = new ValidTriangleNumber();
        
        System.out.println("Test Case 1:");
        int[] nums1 = {2, 2, 3, 4};
        System.out.println("Input: " + Arrays.toString(nums1));
        System.out.println("Brute Force: " + solution.triangleNumberBruteForce(nums1)); // 3
        System.out.println("Optimized: " + solution.triangleNumber(nums1.clone())); // 3
        
        System.out.println("\nTest Case 2:");
        int[] nums2 = {4, 2, 3, 4};
        System.out.println("Input: " + Arrays.toString(nums2));
        System.out.println("Brute Force: " + solution.triangleNumberBruteForce(nums2)); // 4
        System.out.println("Optimized: " + solution.triangleNumber(nums2.clone())); // 4
        
        System.out.println("\nEdge Cases:");
        int[] nums3 = {1, 1, 1};
        System.out.println("Input: " + Arrays.toString(nums3));
        System.out.println("Result: " + solution.triangleNumber(nums3)); // 1
        
        int[] nums4 = {0, 1, 1, 1};
        System.out.println("Input: " + Arrays.toString(nums4));
        System.out.println("Result: " + solution.triangleNumber(nums4)); // 1
    }
}