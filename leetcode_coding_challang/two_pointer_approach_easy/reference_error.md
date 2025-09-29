# **ReferenceError**

<!--The error **"ReferenceError: Cannot access 'sumOfSquare' before initialization"** occurs in JavaScript when trying to use a variable **before it has been declared or initialized**. Here are the possible reasons and how to fix them:
-->

---

## 🔍 **Common Causes and Fixes**

### 1️⃣ **Using `let` or `const` before declaration**

```js
console.log(sumOfSquare); // ❌ ReferenceError
let sumOfSquare = 10;
```

**Fix:** Declare the variable **before** using it.

```js
let sumOfSquare = 10;
console.log(sumOfSquare); // ✅ Works fine
```

---

### 2️⃣ **Calling a Function Expression before initialization**

```js
console.log(sumOfSquare(5)); // ❌ ReferenceError
const sumOfSquare = function (n) {
  return n * n;
};
```

**Fix:** Move the function declaration above the function call.

```js
const sumOfSquare = function (n) {
  return n * n;
};
console.log(sumOfSquare(5)); // ✅ Works fine
```

**OR** use a **function declaration** instead of an expression:

```js
console.log(sumOfSquare(5)); // ✅ Works fine
function sumOfSquare(n) {
  return n * n;
}
```

(💡 Function declarations are **hoisted**, so they can be called before their definition.)

---

### 3️⃣ **Block Scope Issue (`let` or `const`)**

Variables declared with `let` or `const` are **block-scoped** and do **not** get hoisted like `var`.

```js
if (true) {
  console.log(sumOfSquare); // ❌ ReferenceError
  let sumOfSquare = 20;
}
```

**Fix:** Declare the variable **before using it** inside the block.

```js
let sumOfSquare;
if (true) {
  sumOfSquare = 20;
  console.log(sumOfSquare); // ✅ Works fine
}
```

---

### 4️⃣ **Using `import` Before Module is Loaded**

If you’re working with ES6 modules (`import`), make sure you're not trying to access an imported variable **before** the module is loaded.

```js
console.log(sumOfSquare); // ❌ ReferenceError
import { sumOfSquare } from "./mathUtils.js";
```

**Fix:** Always use imported modules **after** their declaration.

---

### 🚀 **Summary of Fixes**

| Cause                                             | Solution                                           |
| ------------------------------------------------- | -------------------------------------------------- |
| Using `let`/`const` before declaration            | Declare before using                               |
| Calling function expression before initialization | Move declaration above or use function declaration |
| Block scope issue                                 | Declare outside the block or before usage          |
| Importing before module is loaded                 | Ensure proper module loading                       |
