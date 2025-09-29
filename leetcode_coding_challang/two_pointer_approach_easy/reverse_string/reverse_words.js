/*  1. Using the split(), reverse(), and join() methods
    2. Using the spread operator and the reverse() method:
 */
function reverseString(str) {
  // Split the string into an array of characters.
  const characters = str.split("");

  // Reverse the order of the characters in the array.
  characters.reverse();

  // Join the characters back into a string.
  const reversedString = characters.join("");

  // Return the reversed string.
  return reversedString;
}

// Example usage:
const originalString = "Hello World!";
const reversedString = reverseString(originalString);

console.log(reversedString); // "!dlroW olleH"

/* 
function reverseString(str) {
  // Spread the characters of the string into an array.
  const characters = [...str];

  // Reverse the order of the characters in the array.
  characters.reverse();

  // Join the characters back into a string.
  const reversedString = characters.join("");

  // Return the reversed string.
  return reversedString;
}

// Example usage:
const originalString = "Hello World!";
const reversedString = reverseString(originalString);

console.log(reversedString); // "!dlroW olleH" */
/* 

function reverseString(str, i = 0, j = str.length - 1) {
  if (i < j) {
    const temp = str[i];
    str[i] = str[j];
    str[j] = temp;
    reverseString(str, i + 1, j - 1);
  }
}

const str = "Hello, world!";
reverseString(str);
console.log(str); // Output: "!dlrow ,olleH"
 */