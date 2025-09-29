public class Solution {
    public int nextGreaterElement(int n) {
        // Convert to character array
        char[] digits = String.valueOf(n).toCharArray();
        int len = digits.length;
        
        // Step 1: Find pivot
        int pivot = -1;
        for (int i = len - 2; i >= 0; i--) {
            if (digits[i] < digits[i + 1]) {
                pivot = i;
                break;
            }
        }
        
        if (pivot == -1) return -1;
        
        // Step 2: Find successor
        int successor = -1;
        for (int i = len - 1; i > pivot; i--) {
            if (digits[i] > digits[pivot]) {
                successor = i;
                break;
            }
        }
        
        // Step 3: Swap
        char temp = digits[pivot];
        digits[pivot] = digits[successor];
        digits[successor] = temp;
        
        // Step 4: Reverse after pivot
        reverse(digits, pivot + 1);
        
        // Step 5: Check 32-bit constraint
        try {
            long result = Long.parseLong(new String(digits));
            return result > Integer.MAX_VALUE ? -1 : (int) result;
        } catch (NumberFormatException e) {
            return -1;
        }
    }
    
    private void reverse(char[] arr, int start) {
      int end = arr.length - 1;
      while (start < end) {
        char temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
      }
    }

    public static void main(String[] args) {
      Solution sol = new Solution();
      /* Test Case1 */
      int n1 = 12;
      System.out.println(sol.nextGreaterElement(n1));

      /* Test Case12 */
      int n2 = 21;
      System.out.println(sol.nextGreaterElement(n2));
    }
}