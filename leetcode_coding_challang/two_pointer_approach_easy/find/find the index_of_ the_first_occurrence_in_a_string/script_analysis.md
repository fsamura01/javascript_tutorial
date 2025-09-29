<!--
Primary Functionality:

The code defines a function named strStr that aims to find the first occurrence of a substring (needle) within a larger string (haystack). It's essentially implementing a string search algorithm. Here's a breakdown:

Input: It takes two string arguments: haystack (the string to search within) and needle (the substring to search for).
Edge Cases: It first checks if the needle is empty or if its length is greater than the haystack. If either of these conditions is true, it returns -1, indicating that the substring cannot be found.
Iteration: It then iterates through the haystack using a for loop. The loop runs up to haystack.length - needle.length because if there is less remaining characters in haystack than the needle length, there is no point in running the loop.
Substring Comparison: Inside the loop, it extracts a substring from haystack of the same length as needle, starting at the current index i. It uses the substring method for this. It then compares this extracted substring with needle.
Match Found: If the extracted substring is equal to needle, it means a match has been found. The function immediately returns the starting index i of the match.
No Match: If the loop completes without finding a match, it means the needle is not present in haystack. The function returns -1 in this case.
Function call: the script then calls the strStr function passing it "sadbutsad" and "sad" as parameters.
Framework/Library/Technologies:

JavaScript: The code is written in plain JavaScript.
String Manipulation: It heavily relies on JavaScript's built-in string manipulation methods, specifically substring() and length.
Algorithm: It implements a basic form of the string search algorithm (sometimes referred to as the "naive" string search algorithm).
Comments: The code has JSDoc style comments, allowing to have more details about the function.
External Resources:

MDN Web Docs: String.prototype.substring(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
MDN Web Docs: String.prototype.length: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length
MDN Web Docs: JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript
Why the file was loaded:

The app.js file was loaded because it is referenced in the index.html file's script tag. The request initiator chain provided confirms this: the browser first requested index.html, and then, during the parsing of index.html, it encountered a script tag that specified app.js, leading to the request for and loading of app.js.
http://127.0.0.1:5501/index.html loads http://127.0.0.1:5501/app.js
 -->
