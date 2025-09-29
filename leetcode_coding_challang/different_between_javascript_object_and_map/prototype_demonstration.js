/**
 * Demonstrating the difference between JavaScript Objects and Maps
 * in terms of inherited properties and clean data storage
 */

console.log("=== JavaScript Object Prototype Inheritance ===");

// Create what appears to be an "empty" object
const freq = {};

console.log("Our 'empty' object:", freq);
console.log("Object appears empty, but let's investigate...");

// Check if toString exists - it does, even though we never added it!
console.log("freq.toString exists:", typeof freq.toString); // "function"
console.log("freq.hasOwnProperty exists:", typeof freq.hasOwnProperty); // "function" 
console.log("freq.valueOf exists:", typeof freq.valueOf); // "function"

// We can even call these inherited methods
console.log("Calling freq.toString():", freq.toString()); // "[object Object]"
console.log("Calling freq.hasOwnProperty('toString'):", freq.hasOwnProperty('toString')); // false (not own property)

// Here's where it gets interesting for our frequency counting scenario
console.log("\n--- Potential Issues with Objects ---");

// Let's say we're counting frequencies of some unusual strings
freq["toString"] = 1;  // Oops! We just overwrote the inherited toString method
freq["constructor"] = 2;  // And now we've overwrote constructor too

console.log("After adding 'toString' and 'constructor' as keys:");
console.log("freq.toString is now:", freq.toString); // 1 (not a function anymore!)
console.log("typeof freq.toString:", typeof freq.toString); // "number"

// This could break code that expects toString to be a function
try {
    console.log("Trying to call freq.toString() now:", freq.toString());
} catch (error) {
    console.log("Error:", error.message); // toString is not a function
}

console.log("\n=== Map - Clean Slate Approach ===");

// Create a Map - truly empty container
const freqMap = new Map();

console.log("New Map:", freqMap);
console.log("Map size:", freqMap.size); // 0 - truly empty

// Maps don't have inherited properties cluttering up the namespace
console.log("freqMap.toString exists as inherited method:", typeof freqMap.toString); // "function" (but doesn't interfere)
console.log("freqMap has 'toString' as a key:", freqMap.has('toString')); // false

// We can safely use any string as a key without worrying about conflicts
freqMap.set("toString", 1);
freqMap.set("constructor", 2);
freqMap.set("hasOwnProperty", 3);

console.log("After adding the same keys to Map:");
console.log("Map still works perfectly:");
console.log("freqMap.toString is still a function:", typeof freqMap.toString); // "function"
console.log("freqMap.get('toString') returns our data:", freqMap.get('toString')); // 1

// The Map's own toString method is separate from our data
console.log("Calling freqMap.toString():", freqMap.toString()); // "[object Map]"

console.log("\n=== Practical Implications for Algorithm Problems ===");

// Scenario: What if our input strings happen to match prototype properties?
const problematicStrings = ["toString", "constructor", "hasOwnProperty", "valueOf"];

console.log("Testing with problematic string names...");

// Object approach - potential issues
console.log("--- Using Object ---");
const objFreq = {};
for (const str of problematicStrings) {
    objFreq[str] = (objFreq[str] || 0) + 1;
}

console.log("Object frequency count:", objFreq);

// Trying to iterate - this could include inherited properties if we're not careful
console.log("Iterating with for...in (potentially dangerous):");
for (const key in objFreq) {
    console.log(`${key}: ${objFreq[key]}`);
    // This might include inherited enumerable properties in some cases
}

// Safe iteration using Object.hasOwnProperty or Object.entries
console.log("Safe iteration using Object.entries():");
for (const [key, value] of Object.entries(objFreq)) {
    console.log(`${key}: ${value}`);
}

// Map approach - no worries about prototype pollution
console.log("--- Using Map ---");
const mapFreq = new Map();
for (const str of problematicStrings) {
    mapFreq.set(str, (mapFreq.get(str) || 0) + 1);
}

console.log("Map frequency count:", mapFreq);
console.log("Map size:", mapFreq.size);

// Safe iteration - no prototype concerns
console.log("Iterating over Map (always safe):");
for (const [key, value] of mapFreq) {
    console.log(`${key}: ${value}`);
}

console.log("\n=== The Clean Object Alternative ===");

// There's a third option: Object.create(null) creates an object with no prototype
const cleanObj = Object.create(null);

console.log("Clean object (no prototype):", cleanObj);
console.log("cleanObj.toString exists:", typeof cleanObj.toString); // "undefined" - truly empty!

for (const str of problematicStrings) {
    cleanObj[str] = (cleanObj[str] || 0) + 1;
}

console.log("Clean object after adding data:", cleanObj);

// Safe to iterate with for...in because no inherited properties exist
console.log("Iterating over clean object with for...in:");
for (const key in cleanObj) {
    console.log(`${key}: ${cleanObj[key]}`);
}