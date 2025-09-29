// JavaScript doesn't have a built-in HashSet, so we'll use Set
function main() {
  // 1. initialize the hash set
  let hashSet = new Set();

  // 2. add new keys
  hashSet.add(3);
  hashSet.add(2);
  hashSet.add(1);

  // 3. remove a key
  hashSet.delete(2);

  // 4. check if the key is in the hash set
  if (!hashSet.has(2)) {
    console.log("Key 2 is not in the hash set.");
  }

  // 5. get the size of the hash set
  console.log("The size of the hash set is: " + hashSet.size);

  // 6. iterate the hash set
  let output = "";
  for (let i of hashSet) {
    output += i + " ";
  }
  console.log(output + "are in the hash set.");

  // 7. clear the hash set
  hashSet.clear();

  // 8. check if the hash set is empty
  if (hashSet.size === 0) {
    console.log("hash set is empty now!");
  }
}

// Call the main function
main();
