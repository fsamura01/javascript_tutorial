/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isIsomorphic(s, t) {
  // Step 1: Check if the lengths are equal
  if (s.length !== t.length) {
    return false;
  }

  // Step 2: Create two maps to store character mappings
  const sToT = new Map();
  const tToS = new Map();

  // Step 3: Iterate through both strings simultaneously
  for (let i = 0; i < s.length; i++) {
    const charS = s[i];
    const charT = t[i];

    // Step 4: Check if the current characters are already mapped
    if (
      (sToT.has(charS) && sToT.get(charS) !== charT) ||
      (tToS.has(charT) && tToS.get(charT) !== charS)
    ) {
      return false;
    }

    // Step 5: Add the mappings to both maps
    sToT.set(charS, charT);
    tToS.set(charT, charS);
  }

  // Step 6: If we've made it through the entire strings, they are isomorphic
  return true;
}

// Example usage:
console.log(isIsomorphic("egg", "add")); // Output: true
console.log(isIsomorphic("foo", "bar")); // Output: false
console.log(isIsomorphic("paper", "title")); // Output: true

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isIsomorphic(s, t) {
  // Use arrays instead of Maps, leveraging the ASCII character constraint
  const sToT = new Array(256).fill(-1);
  const tToS = new Array(256).fill(-1);

  for (let i = 0; i < s.length; i++) {
    const charSCode = s.charCodeAt(i);
    const charTCode = t.charCodeAt(i);

    // If the characters are not consistently mapped, return false
    if (sToT[charSCode] !== tToS[charTCode]) {
      return false;
    }

    // If the characters are not yet mapped, map them to each other
    if (sToT[charSCode] === -1) {
      sToT[charSCode] = charTCode;
      tToS[charTCode] = charSCode;
    }
  }

  return true;
}

// Example usage:
console.log(isIsomorphic("egg", "add")); // Output: true
console.log(isIsomorphic("foo", "bar")); // Output: false
console.log(isIsomorphic("paper", "title")); // Output: true
