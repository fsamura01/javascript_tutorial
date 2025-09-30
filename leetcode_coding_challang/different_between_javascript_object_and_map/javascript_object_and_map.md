# Java object and map

Great observation! The issue is with how you're iterating over the Map in the second function. Let me explain the difference:

**The Problem:**

```javascript
// This is INCORRECT
for(const key of freqMap){
    if(freqMap.get(key) === 1){
        return key
    }
}
```

When you use `for...of` on a Map, it iterates over **entries** (key-value pairs), not just keys!

**What's actually happening:**

```javascript
// When you do: for(const key of freqMap)
// 'key' is actually an ARRAY: [actualKey, value]

// Example:
const freqMap = new Map([[1, 2], [3, 1], [4, 2]]);

for(const key of freqMap){
    console.log(key); 
    // Output: [1, 2]  ← This is an array!
    // Output: [3, 1]  ← This is an array!
    // Output: [4, 2]  ← This is an array!
}
```

So when you do `freqMap.get(key)`, you're passing an **array** as the key, which doesn't exist in the Map, so it returns `undefined`.

**Solutions:**

- **Option 1: Iterate over keys explicitly**

```javascript
for(const key of freqMap.keys()){  // ← Use .keys()
    if(freqMap.get(key) === 1){
        return key
    }
}
```

- **Option 2: Destructure the entry**

```javascript
for(const [key, value] of freqMap){  // ← Destructure
    if(value === 1){
        return key
    }
}
```

- **Option 3: Use entries (most explicit)**

```javascript
for(const [key, value] of freqMap.entries()){
    if(value === 1){
        return key
    }
}
```

**Complete Working Function:**

```javascript
function lonelyinteger(a) {
    const freqMap = new Map();
    
    for (let num of a) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    
    // Solution 1: Use .keys()
    for(const key of freqMap.keys()){
        if(freqMap.get(key) === 1){
            return key;
        }
    }
    
    // OR Solution 2: Destructure (cleaner!)
    // for(const [key, value] of freqMap){
    //     if(value === 1){
    //         return key;
    //     }
    // }
}
```

**Why the Object Literal Works:**

```javascript
for (let num in count) {  // ← for...in loops over KEYS in objects
    if (count[num] === 1) {
        return parseInt(num);
    }
}
```

With objects, `for...in` iterates over the **keys** directly, not key-value pairs like Map does with `for...of`.

**Key Differences:**

| Structure | Loop Type              | What it Iterates     |
|-----------|------------------------|----------------------|
| Object    | `for...in`             | Keys (as strings)    |
| Map       | `for...of`             | Entries [key, value] |
| Map       | `for...of map.keys()`  | Keys only            |
| Map       | `for...of map.values()`| Values only          |

I recommend **Solution 2** (destructuring) as it's the cleanest and most idiomatic JavaScript!

You're absolutely right! Let me correct that important distinction:

## **`gps: Map(0)`**

- Has **two expandable properties**:
  1. **`[[Entries]]`**: Contains the actual key-value pairs stored in the Map
  2. **`[[Prototype]]`**: Contains Map's built-in methods (`.get()`, `.set()`, `.has()`, `.delete()`, etc.)

## **`obj: Object`**

- Has **only one expandable property**:
  1. **`[[Prototype]]`**: Contains Object's built-in methods (`.toString()`, `.hasOwnProperty()`, etc.)
  - No `[[Entries]]` section because Objects store properties directly on themselves

## **What This Tells You:**

**Map structure separates:**

- **Data** (`[[Entries]]`) - where your actual content lives
- **Methods** (`[[Prototype]]`) - where functionality lives

**Object structure combines:**

- Your custom properties and the prototype methods are at the same level
- Properties you add go directly on the object itself, not in a separate container

## **Practical Impact:**

```javascript
// Map keeps data separate
gps.set('home', {lat: 40, lng: -74});
// Data goes into [[Entries]], not mixed with methods

// Object mixes everything
obj.home = {lat: 40, lng: -74};
// 'home' property sits alongside [[Prototype]]
```

This structural difference is why Maps are better for pure data storage - there's clear separation between your data and the built-in functionality!
