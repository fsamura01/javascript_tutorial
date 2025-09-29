/**
 * Comprehensive demonstration of key type differences between Objects and Maps
 * This explores why "keys are not converted to strings" in Maps is so important
 */

console.log("=== Object Key Conversion Behavior ===");

// Objects automatically convert all keys to strings
const obj = {};

// These look like different keys, but they're all converted to strings
obj[1] = "number key 1";
obj["1"] = "string key '1'";
obj[true] = "boolean key true";
obj["true"] = "string key 'true'";

console.log("Object after adding different 'key types':");
console.log(obj);
console.log("Number of properties in obj:", Object.keys(obj).length);

// The shocking result: we only have 2 properties, not 4!
// This is because 1 and "1" become the same key, and true and "true" become the same key
console.log("obj[1]:", obj[1]); // "string key '1'" - the string overwrote the number!
console.log("obj['1']:", obj["1"]); // Same as above
console.log("obj[true]:", obj[true]); // "string key 'true'" - string overwrote boolean!
console.log("obj['true']:", obj["true"]); // Same as above

console.log("\n=== Understanding the String Conversion Process ===");

// Let's see exactly what happens during key conversion
const conversionDemo = {};

// Watch how different types get converted to the same string
console.log("Converting different types to string keys:");
console.log("Number 42 becomes:", String(42)); // "42"
console.log("Boolean true becomes:", String(true)); // "true"
console.log("Array [1,2,3] becomes:", String([1,2,3])); // "1,2,3"
console.log("Object {a: 1} becomes:", String({a: 1})); // "[object Object]"

// Now let's see the collision in action
conversionDemo[42] = "forty-two";
conversionDemo["42"] = "string forty-two";
conversionDemo[[1,2,3]] = "array one-two-three";
conversionDemo["1,2,3"] = "string one-two-three";

console.log("After adding colliding keys:");
console.log(conversionDemo);
console.log("conversionDemo[42]:", conversionDemo[42]); // "string forty-two"
console.log("conversionDemo['42']:", conversionDemo["42"]); // Same!

console.log("\n=== Map: True Key Type Preservation ===");

// Maps preserve the actual type and identity of keys
const map = new Map();

// These are genuinely different keys in a Map
map.set(1, "number key 1");
map.set("1", "string key '1'");
map.set(true, "boolean key true");
map.set("true", "string key 'true'");

console.log("Map after adding different key types:");
console.log("Map size:", map.size); // 4 - all keys are preserved!

// Each key maintains its type and can be accessed independently
console.log("map.get(1):", map.get(1)); // "number key 1"
console.log("map.get('1'):", map.get("1")); // "string key '1'" - different!
console.log("map.get(true):", map.get(true)); // "boolean key true"
console.log("map.get('true'):", map.get("true")); // "string key 'true'" - different!

console.log("\n=== Complex Key Types That Objects Cannot Handle ===");

// Maps can use objects, arrays, functions, and other complex types as keys
const complexMap = new Map();

// Using objects as keys
const objKey1 = {id: 1, name: "Alice"};
const objKey2 = {id: 1, name: "Alice"}; // Different object, same content
const arrayKey = [1, 2, 3];
const functionKey = function() { return "hello"; };

complexMap.set(objKey1, "value for Alice object 1");
complexMap.set(objKey2, "value for Alice object 2"); // Different key!
complexMap.set(arrayKey, "value for array [1,2,3]");
complexMap.set(functionKey, "value for function");

console.log("Complex Map size:", complexMap.size); // 4

console.log("Retrieving with object keys:");
console.log("complexMap.get(objKey1):", complexMap.get(objKey1));
console.log("complexMap.get(objKey2):", complexMap.get(objKey2)); // Different!
console.log("complexMap.get({id: 1, name: 'Alice'}):", 
    complexMap.get({id: 1, name: "Alice"})); // undefined! Different object reference

console.log("\n=== What Happens When We Try Complex Keys in Objects ===");

const objWithComplexKeys = {};

// Objects will convert these to strings, causing problems
objWithComplexKeys[objKey1] = "object as key attempt 1";
objWithComplexKeys[objKey2] = "object as key attempt 2";
objWithComplexKeys[arrayKey] = "array as key attempt";
objWithComplexKeys[functionKey] = "function as key attempt";

console.log("Object with 'complex' keys:");
console.log(objWithComplexKeys);
console.log("Number of properties:", Object.keys(objWithComplexKeys).length);

// All object keys became "[object Object]" - they collided!
console.log("The '[object Object]' key contains:", 
    objWithComplexKeys["[object Object]"]);

console.log("\n=== Practical Algorithm Implications ===");

// Scenario: We need to count occurrences of coordinate pairs
const coordinates = [
    [0, 0], [1, 1], [0, 0], [2, 3], [1, 1], [2, 3]
];

console.log("Counting coordinate pairs...");

// Object approach - problematic due to string conversion
console.log("--- Using Object (problematic) ---");
const coordCountObj = {};
for (const coord of coordinates) {
    const key = coord; // This becomes a string like "0,0"
    coordCountObj[key] = (coordCountObj[key] || 0) + 1;
}
console.log("Object coordinate counts:", coordCountObj);
console.log("coordCountObj['0,0']:", coordCountObj["0,0"]); // Works by accident

// But what if coordinates had different string representations?
const trickyCoords = [[0, 0], ["0", "0"], ["0,0"]]; // These could all become "0,0"!

// Map approach - robust and correct
console.log("--- Using Map (robust) ---");
const coordCountMap = new Map();
for (const coord of coordinates) {
    coordCountMap.set(coord, (coordCountMap.get(coord) || 0) + 1);
}
console.log("Map coordinate counts:");
for (const [coord, count] of coordCountMap) {
    console.log(`[${coord.join(', ')}]: ${count}`);
}

console.log("\n=== Summary of Key Differences ===");
console.log("Object keys are always converted to strings:");
console.log("- Number 1 and string '1' become the same key");
console.log("- Complex objects become '[object Object]'");
console.log("- Arrays become their comma-separated string representation");
console.log("- This can cause unexpected collisions and bugs");

console.log("\nMap keys preserve their original type and identity:");
console.log("- Number 1 and string '1' remain different keys");
console.log("- Objects are compared by reference, not content");
console.log("- Arrays maintain their identity as distinct objects");
console.log("- No unexpected collisions occur");