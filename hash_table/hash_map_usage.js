// JavaScript doesn't have a built-in HashMap, so we'll use a regular object or Map

function main() {
  // 1. initialize a hash map
  let hashmap = new Map();

  // 2. insert a new (key, value) pair
  if (!hashmap.has(0)) hashmap.set(0, 0);
  if (!hashmap.has(2)) hashmap.set(2, 3);

  // 3. insert a new (key, value) pair or update the value of existed key
  hashmap.set(1, 1);
  hashmap.set(1, 2);

  // 4. get the value of specific key
  console.log("The value of key 1 is: " + hashmap.get(1));

  // 5. delete a key
  hashmap.delete(2);

  // 6. check if a key is in the hash map
  if (!hashmap.has(2)) {
    console.log("Key 2 is not in the hash map.");
  }

  // 7. get the size of the hash map
  console.log("The size of hash map is: " + hashmap.size);

  // 8. iterate the hash map
  for (let [key, value] of hashmap) {
    console.log(`(${key},${value}) `);
  }
  console.log("are in the hash map.");

  // 9. clear the hash map
  hashmap.clear();

  // 10. check if the hash map is empty
  if (hashmap.size === 0) {
    console.log("hash map is empty now!");
  }
}

// Call the main function
main();
