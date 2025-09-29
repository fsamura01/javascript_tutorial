/**
 * Understanding the getNext function with detailed examples
 */

function demonstrateModuloArithmetic() {
    console.log("=== Understanding Circular Array Modulo Arithmetic ===\n");
    
    // Example array
    const nums = [2, -3, 1, 4, -2];
    const n = nums.length; // 5
    
    console.log("Array:", nums);
    console.log("Length:", n);
    console.log("Indices: 0, 1, 2, 3, 4\n");
    
    // Test the getNext function with various scenarios
    function getNext(index) {
        const step1 = index + nums[index];
        const step2 = step1 % n;
        const step3 = step2 + n;
        const step4 = step3 % n;
        
        console.log(`From index ${index} (value ${nums[index]}):`);
        console.log(`  Step 1: ${index} + ${nums[index]} = ${step1}`);
        console.log(`  Step 2: ${step1} % ${n} = ${step2}`);
        console.log(`  Step 3: ${step2} + ${n} = ${step3}`);
        console.log(`  Step 4: ${step3} % ${n} = ${step4}`);
        console.log(`  Final result: ${step4}\n`);
        
        return step4;
    }
    
    // Case 1: Normal forward movement
    console.log("CASE 1: Forward movement within bounds");
    getNext(0); // From index 0, move +2 steps
    
    // Case 2: Forward movement with wraparound
    console.log("CASE 2: Forward movement with wraparound");
    getNext(3); // From index 3, move +4 steps (should wrap to index 2)
    
    // Case 3: Backward movement within bounds
    console.log("CASE 3: Backward movement within bounds");
    getNext(4); // From index 4, move -2 steps (should go to index 2)
    
    // Case 4: Backward movement with wraparound
    console.log("CASE 4: Backward movement with wraparound");
    getNext(1); // From index 1, move -3 steps (should wrap to index 3)
    
    // Show what happens with simple modulo (WRONG approach)
    console.log("=== What happens with simple modulo (WRONG) ===");
    function simpleModulo(index) {
        const result = (index + nums[index]) % n;
        console.log(`Simple: (${index} + ${nums[index]}) % ${n} = ${result}`);
        return result;
    }
    
    console.log("From index 1 (value -3):");
    simpleModulo(1); // This gives -2, which is invalid!
    
    // Comparison with correct approach
    console.log("\nWith correct approach:");
    getNext(1); // This gives 3, which is correct!
}

// Alternative visualization
function visualizeCircularMovement() {
    console.log("\n=== Visual Representation ===");
    console.log("Think of the array as a circle:");
    console.log("     0");
    console.log("   /   \\");
    console.log("  4     1");
    console.log("   \\   /");
    console.log("    3-2");
    console.log();
    
    const nums = [2, -3, 1, 4, -2];
    console.log("Array values:", nums);
    console.log();
    
    // Show movements
    console.log("Movement examples:");
    console.log("• From index 1 (value -3): move 3 steps backward");
    console.log("  1 → 0 → 4 → 3 (lands at index 3)");
    console.log();
    console.log("• From index 3 (value 4): move 4 steps forward");
    console.log("  3 → 4 → 0 → 1 → 2 (lands at index 2)");
}

// Run the demonstrations
demonstrateModuloArithmetic();
visualizeCircularMovement();

// The actual getNext function (clean version)
function getNext(nums, index) {
    const n = nums.length;
    return ((index + nums[index]) % n + n) % n;
}

console.log("\n=== Final Clean Function Test ===");
const testArray = [2, -3, 1, 4, -2];
for (let i = 0; i < testArray.length; i++) {
    const next = getNext(testArray, i);
    console.log(`Index ${i} (value ${testArray[i]}) → Index ${next}`);
}