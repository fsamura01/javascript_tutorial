function isSubsequence(s, t) {
  let i = 0,
    j = 0;

  // Iterate through string t
  while (i < s.length && j < t.length) {
    if (s[i] === t[j]) {
      i++; // Move to the next character in s
    }
    j++; // Always move to the next character in t
  }

  // If all characters in s are matched, return true
  return i === s.length;
}

isSubsequence("abc", "ahbgdc");
isSubsequence("axc", "ahbgdc");

/*Analysis:*/

/* Primary Functionality: */

/* The code defines a function isSubsequence that determines if a string s is a subsequence of another string t.*/

/* The function takes two parameters: s (the string to check if it is a subsequence of t) and t (the string to check for the subsequence).*/

/*A subsequence is a sequence that can be derived from another sequence by deleting some or 
  no elements without changing the order of the remaining elements.*/

/*The function initializes two pointers, i and j. i 
is used to iterate through string s, 
while j is used to iterate through string t.*/

/*The while loop continues as long as i is within the bounds of s and j is within the bounds of t.*/

/* If the characters at s[i] and t[j] are equal, it means a character from s has been found in t in the correct order, so i is incremented.
If the characters at s[i] and t[j] are not equal, j is incremented in t. This ensures that the search continues in the correct order in t.
j is incremented in each iteration, regardless of whether a matching character is found or not. */

/*After the loop finishes, it checks if i is equal to the length of s.
If it is, it means all characters of s were found in t in order, and it returns true.Otherwise, it returns false.*/

/*The script then calls isSubsequence twice with different inputs to test the functionality.*/

/*Framework/Library:
This code is written in plain JavaScript and does not appear to be associated with any specific framework or library.*/

/*Key Technologies/APIs/Patterns:
JavaScript: The code is written in JavaScript.
String Manipulation: The code uses string indexing (s[i], t[j]) to access individual characters and compares them.
Control Flow: It utilizes while loops and if statements for control flow.
Pointers: It uses the i and j variables as pointers to traverse the strings.*/

/*Functions : It utilizes a function isSubsequence to encapsulate the desired logic*/

/*Comparison operator: === is used to compare strings*/

/*Return value: return is used to return boolean result*/

/*External Resources:
MDN Web Docs: JavaScript Strings: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
MDN Web Docs: Control flow and error handling: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling
MDN Web Docs: Functions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
Why the file was loaded? There is no request initiator chain provided, so it is not possible to determine why the file was loaded.
DevTools suggestions */

/*Since this script is fairly isolated, you can use the following:

Run the code in the Console to try different strings.
Set breakpoints in the isSubsequence function to step through the execution and observe the values of i and j.
Watch the i and j variable values while stepping through the code.
Use the debugger.*/
