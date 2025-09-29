public class MagicalString {
    
    public int magicalString(int n) {
        // Handle edge cases
        if (n <= 0) return 0;
        if (n <= 3) return 1; // "122" contains exactly 1 one in first 3 positions
        
        // Initialize with the magical seed sequence
        // This specific start is mathematically required for self-reference
        int[] magicalStr = new int[n + 1]; // Allocate enough space
        magicalStr[0] = 1;
        magicalStr[1] = 2;
        magicalStr[2] = 2;
        
        // Dual-pointer construction system
        int head = 2;      // Reading position (instruction pointer)
        int tail = 3;      // Writing position
        int currentChar = 1; // Character type to write next
        
        // Simulate the magical string construction
        while (tail < n) {
            // Read instruction: how many characters in this group
            int groupSize = magicalStr[head];
            
            // Write the specified number of characters
            for (int i = 0; i < groupSize && tail < n; i++) {
                magicalStr[tail] = currentChar;
                tail++;
            }
            
            // Advance to next instruction
            head++;
            
            // Toggle character type for next group
            currentChar = (currentChar == 1) ? 2 : 1;
        }
        
        // Count ones in the first n positions
        int onesCount = 0;
        for (int i = 0; i < n; i++) {
            if (magicalStr[i] == 1) {
                onesCount++;
            }
        }
        
        return onesCount;
    }
}