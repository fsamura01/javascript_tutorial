/**
 * String Compression using Two-Pointer Pattern
 * Time: O(n), Space: O(1)
 */
function compress(chars) {
    let writeIndex = 0;  // Slow pointer - where to write compressed result
    let readIndex = 0;   // Fast pointer - where to read from
    
    while (readIndex < chars.length) {
        // Find the current character and count consecutive occurrences
        let currentChar = chars[readIndex];
        let count = 0;
        
        // Count consecutive identical characters
        // This is the "group detection" phase
        while (readIndex < chars.length && chars[readIndex] === currentChar) {
            count++;
            readIndex++;
        }
        
        // Always write the character first
        chars[writeIndex] = currentChar;
        writeIndex++;
        
        // If count > 1, we need to write the count as well
        if (count > 1) {
            // Convert count to string to handle multi-digit numbers
            let countStr = count.toString();
            
            // Write each digit of the count as a separate character
            // This handles cases like count = 12 -> '1', '2'
            for (let digit of countStr) {
                chars[writeIndex] = digit;
                writeIndex++;
            }
        }
    }
    
    // Return the length of the compressed array
    return writeIndex;
}

// Test cases to verify our solution
function testCompress() {
    // Test case 1: ["a","a","b","b","c","c","c"]
    let test1 = ["a","a","b","b","c","c","c"];
    let result1 = compress(test1);
    console.log("Test 1 result:", test1.slice(0, result1)); // Should be ["a","2","b","2","c","3"]
    console.log("Test 1 length:", result1); // Should be 6
    
    // Test case 2: ["a"]
    let test2 = ["a"];
    let result2 = compress(test2);
    console.log("Test 2 result:", test2.slice(0, result2)); // Should be ["a"]
    console.log("Test 2 length:", result2); // Should be 1
    
    // Test case 3: ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
    let test3 = ["a","b","b","b","b","b","b","b","b","b","b","b","b"];
    let result3 = compress(test3);
    console.log("Test 3 result:", test3.slice(0, result3)); // Should be ["a","b","1","2"]
    console.log("Test 3 length:", result3); // Should be 4
}

testCompress();