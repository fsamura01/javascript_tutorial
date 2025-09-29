// JSON string representing user data
let jsonString = '{"name": "Alice", "age": 30, "city": "Wonderland"}';

// Deserializing the JSON string into a JavaScript object
let user = JSON.parse(jsonString);
console.log("🚀 ~ user:", user);

// Accessing properties of the JavaScript object
console.log("Name:", user.name); // Output: Alice
console.log("Age:", user.age); // Output: 30
console.log("City:", user.city); // Output: Wonderland

/*
To communicate over HTTP using JSON in JavaScript, follow these steps:

Create a JavaScript object to represent your data structure.
Use JSON.stringify() function to convert the object into a JSON string.
Send the JSON string to a server as the body of an HTTP request using the fetch() function or XMLHttpRequest.

*/
// convert javascript object into JSON
let data = { name: "John", age: 30 };
let json = JSON.stringify(data);
fetch("https://example.com/api", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: json,
});

// let data = JSON.parse(request.body);
