class Solution {
    public int longestMountain(int[] arr) {
        int n = arr.length;
        int maxLength = 0;
        
        // Iterate through potential peaks (indices 1 to n-2)
        for (int i = 1; i < n - 1; i++) {
            // Check if i is a peak: strictly greater than both neighbors
            if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
                int left = i - 1;
                int right = i + 1;
                
                // Expand left while strictly increasing (going backward)
                while (left > 0 && arr[left] > arr[left - 1]) {
                    left--;
                }
                
                // Expand right while strictly decreasing
                while (right < n - 1 && arr[right] > arr[right + 1]) {
                    right++;
                }
                
                // Calculate mountain length and update max
                int currentLength = right - left + 1;
                maxLength = Math.max(maxLength, currentLength);
            }
        }
        
        return maxLength;
    }
}

