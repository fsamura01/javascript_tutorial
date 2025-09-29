<!--To remove non-alphanumeric characters from a string, you can use the regular expression [^a-zA-Z0-9] in most programming languages, which essentially means "match any character that is not a letter (a-z, A-Z) or a digit (0-9)" and replace it with an empty string using the appropriate string manipulation function (like replace or replaceAll) depending on your language.-->

# **Example (in JavaScript):**

```javascript
const str = "Hello, World! 123";

const cleanStr = str.replace(/[^a-zA-Z0-9]/g, ""); // "HelloWorld123"


Explanation: [1, 2, 3]

• [^a-zA-Z0-9]: This is the regular expression that matches
  any character that is not a letter (a-z, A-Z) or a number (0-9).
• g: The "global" flag ensures that all occurrences of non-alphanumeric characters are replaced.

Key points to remember:
• Regular Expressions: Most programming languages have built-in
  functions to work with regular expressions, allowing you to use
  this pattern to manipulate strings efficiently. [1, 2, 4]
• Replace with empty string: To remove the matched characters,
  you replace them with an empty string (""). [1, 2, 5]

  Since strings are immutable in JavaScript, any operation that appears to modify a string actually creates a new string. To perform string manipulation, one can use various built-in string methods that return new strings instead of modifying the original. 
Methods commonly used for string manipulation include: 

• concat(): Joins two or more strings. 
• slice(): Extracts a section of a string and returns a new string. 
• substring(): Extracts characters from a string, between two specified indices, and returns a new substring. 
• substr(): Extracts characters from a string, beginning at a specified index and with a specified number of characters. 
• replace(): Replaces a specified value with another value in a string. 
• toUpperCase(): Converts a string to uppercase. 
• toLowerCase(): Converts a string to lowercase. 
• trim(): Removes whitespace from both ends of a string. 
• split(): Splits a string into an array of substrings. 

For example, to change a character in a string, one can combine slice() to extract parts of the string and concatenate them with the new character: 
let str = "hello";
let newStr = str.slice(0, 2) + "x" + str.slice(3);
console.log(newStr); // Output: hexllo

Each of these methods returns a new string, leaving the original string unchanged. It is important to assign the result of these methods to a variable to store the modified string. 

Generative AI is experimental.





```
