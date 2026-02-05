# Universal Min-Heap & QuickSelect Patterns for "Top K" Problems

## The Key Insight

All "Top K" problems follow the same structure:

1. **Transform** the problem into comparable elements
2. **Apply** Min-Heap or QuickSelect with custom comparator
3. **Extract** results

Let me show you the **unified approach** for both algorithms.

---

## Part 1: Universal Min-Heap Pattern

### The Reusable Heap Class (Use for ALL problems)

```javascript
/**
 * Universal Min-Heap Implementation
 * Works for ANY "Top K" problem
 */
class MinHeap {
    constructor(compareFn = (a, b) => a - b) {
        this.heap = [];
        this.compare = compareFn; // Custom comparison logic
    }
    
    size() {
        return this.heap.length;
    }
    
    peek() {
        return this.heap[0];
    }
    
    push(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }
    
    pop() {
        if (this.size() === 0) return null;
        if (this.size() === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return min;
    }
    
    // Core heap operations (NEVER change these!)
    bubbleUp(index) {
        while (index > 0) {
            const parentIdx = Math.floor((index - 1) / 2);
            if (this.compare(this.heap[index], this.heap[parentIdx]) >= 0) break;
            
            [this.heap[index], this.heap[parentIdx]] = 
                [this.heap[parentIdx], this.heap[index]];
            index = parentIdx;
        }
    }
    
    bubbleDown(index) {
        while (true) {
            let smallest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            
            if (left < this.size() && 
                this.compare(this.heap[left], this.heap[smallest]) < 0) {
                smallest = left;
            }
            if (right < this.size() && 
                this.compare(this.heap[right], this.heap[smallest]) < 0) {
                smallest = right;
            }
            
            if (smallest === index) break;
            
            [this.heap[index], this.heap[smallest]] = 
                [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}
```

---

### Application to Different Problems

Now, **the same heap implementation** works for ALL problems—you just change the comparator!

#### Problem 1: Kth Largest Element (LeetCode 215)

```javascript
/**
 * Find kth largest NUMBER
 * Strategy: Keep k largest, min at root
 */
var findKthLargest = function(nums, k) {
    // Min-heap of numbers (smallest at root)
    const minHeap = new MinHeap((a, b) => a - b);
    
    for (const num of nums) {
        minHeap.push(num);
        
        if (minHeap.size() > k) {
            minHeap.pop(); // Remove smallest
        }
    }
    
    return minHeap.peek(); // Smallest of k largest = kth largest
};

// Example: [3,2,1,5,6,4], k=2
// Heap after processing: [5, 6]
// Root (min) = 5 = 2nd largest ✓
```

---

#### Problem 2: Top K Frequent Elements (LeetCode 347)

```javascript
/**
 * Find k most frequent NUMBERS
 * Strategy: Keep k most frequent, least frequent at root
 */
var topKFrequent = function(nums, k) {
    // Step 1: Count frequencies
    const freqMap = new Map();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    
    // Step 2: Min-heap of {num, freq} objects
    // Compare by frequency (least frequent at root)
    const minHeap = new MinHeap((a, b) => a.freq - b.freq);
    
    for (const [num, freq] of freqMap) {
        minHeap.push({ num, freq });
        
        if (minHeap.size() > k) {
            minHeap.pop(); // Remove least frequent
        }
    }
    
    // Step 3: Extract numbers
    return minHeap.heap.map(item => item.num);
};

// Example: [1,1,1,2,2,3], k=2
// freqMap: {1:3, 2:2, 3:1}
// Heap after processing: [{num:2, freq:2}, {num:1, freq:3}]
// Root (min freq) = {num:2, freq:2}
// Result: [2, 1] ✓
```

---

#### Problem 3: K Closest Points to Origin (LeetCode 973)

```javascript
/**
 * Find k closest POINTS to origin
 * Strategy: Keep k closest, farthest at root (use MAX-heap!)
 */
var kClosest = function(points, k) {
    // MAX-heap of points (farthest at root)
    // Note: We flip comparison to create max-heap from min-heap
    const maxHeap = new MinHeap((a, b) => {
        const distA = a[0]**2 + a[1]**2;
        const distB = b[0]**2 + b[1]**2;
        return distB - distA; // Reversed! (max-heap behavior)
    });
    
    for (const point of points) {
        maxHeap.push(point);
        
        if (maxHeap.size() > k) {
            maxHeap.pop(); // Remove farthest
        }
    }
    
    return maxHeap.heap;
};

// Example: [[1,3],[-2,2],[5,8]], k=2
// Distances: 10, 8, 89
// Heap after processing: [[-2,2], [1,3]]
// Root (max dist) = [-2,2] (dist=8)
// Result: [[-2,2], [1,3]] ✓
```

**Why MAX-heap here?** We want to keep k *smallest* distances, so we remove the *largest* from our k-sized heap.

---

#### Problem 4: Top K Frequent Words (LeetCode 692)

```javascript
/**
 * Find k most frequent WORDS (with tie-breaking)
 * Strategy: Keep k most frequent, least frequent at root
 *           If tied, keep lexicographically larger at root
 */
var topKFrequent = function(words, k) {
    // Step 1: Count frequencies
    const freqMap = new Map();
    for (const word of words) {
        freqMap.set(word, (freqMap.get(word) || 0) + 1);
    }
    
    // Step 2: Min-heap with tie-breaking
    const minHeap = new MinHeap((a, b) => {
        // Primary: Compare by frequency
        if (a.freq !== b.freq) {
            return a.freq - b.freq; // Less frequent at root
        }
        // Tie-breaker: Compare alphabetically (REVERSED)
        return b.word.localeCompare(a.word); // Larger alphabetically at root
    });
    
    for (const [word, freq] of freqMap) {
        minHeap.push({ word, freq });
        
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }
    
    // Step 3: Extract and sort (heap doesn't guarantee order beyond root)
    const result = minHeap.heap.map(item => item.word);
    return result.sort((a, b) => {
        const freqA = freqMap.get(a);
        const freqB = freqMap.get(b);
        if (freqA !== freqB) return freqB - freqA; // More frequent first
        return a.localeCompare(b); // Then alphabetically
    });
};

// Example: ["i","love","leetcode","i","love","coding"], k=2
// freqMap: {i:2, love:2, leetcode:1, coding:1}
// Tie between "i" and "love" (both freq=2)
// Result: ["i", "love"] (alphabetically) ✓
```

---

## The Pattern Summary (Min-Heap)

### Universal Template

```javascript
var topKProblem = function(input, k) {
    // Step 1: Transform data if needed (e.g., count frequencies)
    const transformedData = transformInput(input);
    
    // Step 2: Create min-heap with custom comparator
    const minHeap = new MinHeap(comparatorFunction);
    
    // Step 3: Process each element
    for (const item of transformedData) {
        minHeap.push(item);
        
        if (minHeap.size() > k) {
            minHeap.pop(); // Keep only k elements
        }
    }
    
    // Step 4: Extract results
    return extractResults(minHeap);
};
```

### Comparison Logic Table

| Problem             | What to Store | Comparator Logic                         | Heap Type |
|---------------------|---------------|------------------------------------------|-----------|
| Kth Largest Number  | Numbers       | `(a, b) => a - b`                        | Min-Heap  |
| Kth Smallest Number | Numbers       | `(a, b) => b - a`                        | Max-Heap  |
| Top K Frequent      | {num, freq}   | `(a, b) => a.freq - b.freq`              | Min-Heap  |
| K Closest Points    | [x, y]        | `(a, b) => distB - distA` (reversed!)    | Max-Heap  |
| K Largest Sums      | Sums          | `(a, b) => a - b`                        | Min-Heap  |
| Top K Frequent Words| {word, freq}  | Multi-condition (freq, then alphabetical)| Min-Heap  |

---

## Part 2: Universal QuickSelect Pattern

Now let's apply the **same QuickSelect algorithm** to all problems!

### The Reusable QuickSelect Function

```javascript
/**
 * Universal QuickSelect Implementation
 * Works for ANY "Top K" problem with custom comparator
 */
function quickSelect(arr, k, compareFn = (a, b) => a - b) {
    const n = arr.length;
    const targetIndex = n - k; // Convert to index
    
    function partition(left, right) {
        // Random pivot to avoid worst case
        const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
        const pivot = arr[pivotIndex];
        
        // Move pivot to end
        [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];
        
        // Partition using custom comparator
        let storeIndex = left;
        for (let i = left; i < right; i++) {
            // Use comparator: if arr[i] < pivot (by comparator)
            if (compareFn(arr[i], pivot) < 0) {
                [arr[i], arr[storeIndex]] = [arr[storeIndex], arr[i]];
                storeIndex++;
            }
        }
        
        // Place pivot in final position
        [arr[storeIndex], arr[right]] = [arr[right], arr[storeIndex]];
        
        return storeIndex;
    }
    
    function select(left, right) {
        if (left === right) return;
        
        const pivotIndex = partition(left, right);
        
        if (pivotIndex === targetIndex) {
            return;
        } else if (pivotIndex < targetIndex) {
            select(pivotIndex + 1, right);
        } else {
            select(left, pivotIndex - 1);
        }
    }
    
    select(0, n - 1);
    return arr.slice(targetIndex); // Return k largest elements
}
```

---

### Application to Different Problems_

#### Problem 1: Kth Largest Element

```javascript
var findKthLargest = function(nums, k) {
    // QuickSelect with default comparator (ascending order)
    quickSelect(nums, k, (a, b) => a - b);
    return nums[nums.length - k]; // Return kth largest
};

// Example: [3,2,1,5,6,4], k=2
// After quickSelect: [..., 5, 6] (last k elements are k largest)
// Return nums[6-2] = nums[4] = 5 ✓
```

---

#### Problem 2: Top K Frequent Elements

```javascript
var topKFrequent = function(nums, k) {
    // Step 1: Count frequencies
    const freqMap = new Map();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    
    // Step 2: Create array of {num, freq} objects
    const items = Array.from(freqMap, ([num, freq]) => ({ num, freq }));
    
    // Step 3: QuickSelect by frequency
    quickSelect(items, k, (a, b) => a.freq - b.freq);
    
    // Step 4: Extract top k
    return items.slice(items.length - k).map(item => item.num);
};

// Example: [1,1,1,2,2,3], k=2
// items: [{num:1,freq:3}, {num:2,freq:2}, {num:3,freq:1}]
// After quickSelect: [..., {num:2,freq:2}, {num:1,freq:3}]
// Result: [2, 1] ✓
```

---

#### Problem 3: K Closest Points

```javascript
var kClosest = function(points, k) {
    // QuickSelect by distance
    quickSelect(points, k, (a, b) => {
        const distA = a[0]**2 + a[1]**2;
        const distB = b[0]**2 + b[1]**2;
        return distA - distB; // Ascending order
    });
    
    // Return first k elements (k smallest distances)
    return points.slice(0, k);
};

// Example: [[1,3],[-2,2],[5,8]], k=2
// After quickSelect: [[-2,2], [1,3], [5,8]] (first k are smallest)
// Result: [[-2,2], [1,3]] ✓
```

---

## The Pattern Summary (QuickSelect)

### Universal Template_

```javascript
var topKProblem = function(input, k) {
    // Step 1: Transform data if needed
    const arr = transformInput(input);
    
    // Step 2: QuickSelect with custom comparator
    quickSelect(arr, k, comparatorFunction);
    
    // Step 3: Extract results
    // For "k largest": arr.slice(n - k)
    // For "k smallest": arr.slice(0, k)
    return extractResults(arr, k);
};
```

---

## Side-by-Side Comparison

### LeetCode 215: Kth Largest Element

```javascript
// MIN-HEAP APPROACH
var findKthLargest = function(nums, k) {
    const minHeap = new MinHeap((a, b) => a - b);
    
    for (const num of nums) {
        minHeap.push(num);
        if (minHeap.size() > k) minHeap.pop();
    }
    
    return minHeap.peek();
};

// QUICKSELECT APPROACH
var findKthLargest = function(nums, k) {
    quickSelect(nums, k, (a, b) => a - b);
    return nums[nums.length - k];
};
```

### LeetCode 347: Top K Frequent

```javascript
// MIN-HEAP APPROACH
var topKFrequent = function(nums, k) {
    const freqMap = new Map();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    
    const minHeap = new MinHeap((a, b) => a.freq - b.freq);
    
    for (const [num, freq] of freqMap) {
        minHeap.push({ num, freq });
        if (minHeap.size() > k) minHeap.pop();
    }
    
    return minHeap.heap.map(item => item.num);
};

// QUICKSELECT APPROACH
var topKFrequent = function(nums, k) {
    const freqMap = new Map();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    
    const items = Array.from(freqMap, ([num, freq]) => ({ num, freq }));
    quickSelect(items, k, (a, b) => a.freq - b.freq);
    
    return items.slice(items.length - k).map(item => item.num);
};
```

---

## Master Checklist

### **When implementing ANY "Top K" problem:**

✅ **Step 1:** Identify what you're comparing (numbers, frequencies, distances, etc.)

✅ **Step 2:** Choose your algorithm:

- **Min-Heap**: Good for small k, streaming data
- **QuickSelect**: Better average performance, in-place

✅ **Step 3:** Write the comparator function:

- For "k largest": `(a, b) => a - b` (min-heap keeps smallest at root)
- For "k smallest": `(a, b) => b - a` (max-heap keeps largest at root)
- For objects: `(a, b) => a.property - b.property`

✅ **Step 4:** Apply the template (heap or quickselect) with your comparator

✅ **Step 5:** Extract results appropriately

---

## Final Code Libraries

Save these two functions—they solve **95% of Top K problems**!

### Complete Min-Heap Library

```javascript
class MinHeap {
    constructor(compareFn = (a, b) => a - b) {
        this.heap = [];
        this.compare = compareFn;
    }
    
    size() { return this.heap.length; }
    peek() { return this.heap[0]; }
    
    push(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }
    
    pop() {
        if (this.size() === 0) return null;
        if (this.size() === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return min;
    }
    
    bubbleUp(index) {
        while (index > 0) {
            const parentIdx = Math.floor((index - 1) / 2);
            if (this.compare(this.heap[index], this.heap[parentIdx]) >= 0) break;
            [this.heap[index], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[index]];
            index = parentIdx;
        }
    }
    
    bubbleDown(index) {
        while (true) {
            let smallest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            if (left < this.size() && this.compare(this.heap[left], this.heap[smallest]) < 0) smallest = left;
            if (right < this.size() && this.compare(this.heap[right], this.heap[smallest]) < 0) smallest = right;
            if (smallest === index) break;
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}
```

### Complete QuickSelect Library

```javascript
function quickSelect(arr, k, compareFn = (a, b) => a - b) {
    const n = arr.length;
    const targetIndex = n - k;
    
    function partition(left, right) {
        const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
        const pivot = arr[pivotIndex];
        [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];
        
        let storeIndex = left;
        for (let i = left; i < right; i++) {
            if (compareFn(arr[i], pivot) < 0) {
                [arr[i], arr[storeIndex]] = [arr[storeIndex], arr[i]];
                storeIndex++;
            }
        }
        [arr[storeIndex], arr[right]] = [arr[right], arr[storeIndex]];
        return storeIndex;
    }
    
    function select(left, right) {
        if (left === right) return;
        const pivotIndex = partition(left, right);
        if (pivotIndex === targetIndex) return;
        else if (pivotIndex < targetIndex) select(pivotIndex + 1, right);
        else select(left, pivotIndex - 1);
    }
    
    select(0, n - 1);
}
```

---

**Now you have a consistent, reusable approach for ALL "Top K" problems! Just plug in the right comparator, and the rest is identical.** 🎯
