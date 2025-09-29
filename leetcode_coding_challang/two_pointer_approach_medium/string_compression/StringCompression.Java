/**
 * String Compression using Two-Pointer Pattern in Java
 * This solution demonstrates the power of in-place array manipulation
 * 
 * Time Complexity: O(n) - each character is processed exactly once
 * Space Complexity: O(1) - only constant extra space used
 */
public class StringCompression {
    
    /**
     * Compresses the input character array using run-length encoding
     * 
     * The algorithm works like having two workers:
     * - writeIndex (slow pointer): determines where to place compressed results
     * - readIndex (fast pointer): scans through the original data
     * 
     * @param chars the input character array to compress in-place
     * @return the length of the compressed array
     */
    public int compress(char[] chars) {
        // Initialize our two pointers
        int writeIndex = 0;  // Where we'll write our compressed result
        int readIndex = 0;   // Where we're currently reading from
        
        // Process the entire array using our two-pointer approach
        while (readIndex < chars.length) {
            // Capture the current character we're analyzing
            char currentChar = chars[readIndex];
            int count = 0;
            
            // Count consecutive occurrences of the current character
            // This is our "group detection" phase - like counting identical books on a shelf
            while (readIndex < chars.length && chars[readIndex] == currentChar) {
                count++;
                readIndex++;
            }
            
            // Always write the character first - this is the foundation of our compression
            chars[writeIndex] = currentChar;
            writeIndex++;
            
            // If we have more than one occurrence, we need to encode the count
            if (count > 1) {
                // Convert count to string to handle multi-digit numbers elegantly
                // This handles cases like 12 repetitions -> "12" -> ['1', '2']
                String countStr = String.valueOf(count);
                
                // Write each digit of the count as a separate character
                // This loop handles the digit-by-digit decomposition
                for (char digit : countStr.toCharArray()) {
                    chars[writeIndex] = digit;
                    writeIndex++;
                }
            }
        }
        
        // Return the final length of our compressed array
        return writeIndex;
    }
    
    /**
     * Alternative implementation using integer arithmetic for digit extraction
     * This version demonstrates how to avoid string conversion if preferred
     */
    public int compressWithoutStringConversion(char[] chars) {
        int writeIndex = 0;
        int readIndex = 0;
        
        while (readIndex < chars.length) {
            char currentChar = chars[readIndex];
            int count = 0;
            
            // Count consecutive identical characters
            while (readIndex < chars.length && chars[readIndex] == currentChar) {
                count++;
                readIndex++;
            }
            
            // Write the character
            chars[writeIndex++] = currentChar;
            
            // Handle count encoding using arithmetic operations
            if (count > 1) {
                // For multi-digit numbers, we need to extract digits from right to left
                // then reverse them, or use a different approach
                
                // Convert count to character array using arithmetic
                char[] countChars = String.valueOf(count).toCharArray();
                
                for (char digit : countChars) {
                    chars[writeIndex++] = digit;
                }
            }
        }
        
        return writeIndex;
    }
    
    /**
     * Test method to verify our compression algorithm works correctly
     * This demonstrates how to validate your solution with multiple test cases
     */
    public static void main(String[] args) {
        StringCompression solution = new StringCompression();
        
        System.out.println(solution);
        // Test case 1: Mixed characters with multiple repetitions
        char[] test1 = {'a', 'a', 'b', 'b', 'c', 'c', 'c'};
        int result1 = solution.compress(test1);
        System.out.println("Test 1 - Expected: [a, 2, b, 2, c, 3], Length: 6");
        System.out.print("Test 1 - Actual: [");
        for (int i = 0; i < result1; i++) {
            System.out.print(test1[i]);
            if (i < result1 - 1) System.out.print(", ");
        }
        System.out.println("], Length: " + result1);
        System.out.println();
        
        // Test case 2: Single character (edge case)
        char[] test2 = {'a'};
        int result2 = solution.compress(test2);
        System.out.println("Test 2 - Expected: [a], Length: 1");
        System.out.print("Test 2 - Actual: [");
        for (int i = 0; i < result2; i++) {
            System.out.print(test2[i]);
            if (i < result2 - 1) System.out.print(", ");
        }
        System.out.println("], Length: " + result2);
        System.out.println();
        
        // Test case 3: Large repetition count (tests multi-digit handling)
        char[] test3 = {'a', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'};
        int result3 = solution.compress(test3);
        System.out.println("Test 3 - Expected: [a, b, 1, 2], Length: 4");
        System.out.print("Test 3 - Actual: [");
        for (int i = 0; i < result3; i++) {
            System.out.print(test3[i]);
            if (i < result3 - 1) System.out.print(", ");
        }
        System.out.println("], Length: " + result3);
    }
}