# Sorting Algorithms

```Javascript
// ============================================
// COMPARISON-BASED SORTING ALGORITHMS
// ============================================

// 1. BUBBLE SORT
// Time: O(n²), Space: O(1)
// Repeatedly swaps adjacent elements if they're in wrong order
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
            }
        }
    }
    return arr;
}

// 2. SELECTION SORT
// Time: O(n²), Space: O(1)
// Finds minimum element and places it at the beginning
function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]; // Swap
        }
    }
    return arr;
}

// 3. INSERTION SORT
// Time: O(n²), Space: O(1)
// Builds sorted array one element at a time
function insertionSort(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}

// 4. MERGE SORT
// Time: O(n log n), Space: O(n)
// Divide and conquer algorithm
function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// 5. QUICK SORT
// Time: O(n log n) average, O(n²) worst, Space: O(log n)
// Divide and conquer with pivot partitioning
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// 6. HEAP SORT
// Time: O(n log n), Space: O(1)
// Uses binary heap data structure
function heapSort(arr) {
    const n = arr.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    const left = 2 *i + 1;
    const right = 2* i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

// ============================================
// NON-COMPARISON SORTING ALGORITHMS
// ============================================

// 7. COUNTING SORT
// Time: O(n + k), Space: O(k)
// Works with integers in a known range
function countingSort(arr, max = Math.max(...arr)) {
    const count = new Array(max + 1).fill(0);
    const output = new Array(arr.length);

    // Count occurrences
    for (let i = 0; i < arr.length; i++) {
        count[arr[i]]++;
    }
    
    // Cumulative count
    for (let i = 1; i <= max; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    
    return output;
}

// 8. RADIX SORT
// Time: O(d * (n + k)), Space: O(n + k)
// Sorts numbers digit by digit
function radixSort(arr) {
    const max = Math.max(...arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
    
    return arr;
}

function countingSortByDigit(arr, exp) {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);

    for (let i = 0; i < n; i++) {
        const digit = Math.floor(arr[i] / exp) % 10;
        count[digit]++;
    }
    
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

// 9. BUCKET SORT
// Time: O(n + k) average, Space: O(n + k)
// Distributes elements into buckets
function bucketSort(arr, bucketSize = 5) {
    if (arr.length === 0) return arr;

    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const bucketCount = Math.floor((max - min) / bucketSize) + 1;
    const buckets = Array.from({ length: bucketCount }, () => []);
    
    // Distribute into buckets
    for (let i = 0; i < arr.length; i++) {
        const bucketIndex = Math.floor((arr[i] - min) / bucketSize);
        buckets[bucketIndex].push(arr[i]);
    }
    
    // Sort each bucket and concatenate
    return buckets.reduce((sorted, bucket) => {
        return sorted.concat(insertionSort([...bucket]));
    }, []);
}

// ============================================
// TESTING AND COMPARISON
// ============================================

function testSortingAlgorithm(sortFn, name, arr) {
    const testArr = [...arr]; // Copy array
    const start = performance.now();
    const sorted = sortFn(testArr);
    const end = performance.now();
    const time = (end - start).toFixed(4);

    console.log(`${name}: [${sorted.join(', ')}] - ${time}ms`);
}

// Test data
const testArray = [64, 34, 25, 12, 22, 11, 90, 88, 45, 50, 23, 36, 18, 77];

console.log("Original array:", testArray);
console.log("\n=== Comparison-Based Sorts ===");
testSortingAlgorithm(bubbleSort, "Bubble Sort    ", testArray);
testSortingAlgorithm(selectionSort, "Selection Sort ", testArray);
testSortingAlgorithm(insertionSort, "Insertion Sort ", testArray);
testSortingAlgorithm(mergeSort, "Merge Sort     ", testArray);
testSortingAlgorithm(quickSort, "Quick Sort     ", testArray);
testSortingAlgorithm(heapSort, "Heap Sort      ", testArray);

console.log("\n=== Non-Comparison Sorts ===");
testSortingAlgorithm(countingSort, "Counting Sort  ", testArray);
testSortingAlgorithm(radixSort, "Radix Sort     ", testArray);
testSortingAlgorithm(bucketSort, "Bucket Sort    ", testArray);

console.log("\n=== Built-in JavaScript Sort ===");
testSortingAlgorithm((arr) => arr.sort((a, b) => a - b), "Array.sort()   ", testArray);

// Performance comparison table
console.log("\n=== Time Complexity Summary ===");
console.log("Algorithm       | Best        | Average     | Worst       | Space");
console.log("----------------|-------------|-------------|-------------|----------");
console.log("Bubble Sort     | O(n)        | O(n²)       | O(n²)       | O(1)");
console.log("Selection Sort  | O(n²)       | O(n²)       | O(n²)       | O(1)");
console.log("Insertion Sort  | O(n)        | O(n²)       | O(n²)       | O(1)");
console.log("Merge Sort      | O(n log n)  | O(n log n)  | O(n log n)  | O(n)");
console.log("Quick Sort      | O(n log n)  | O(n log n)  | O(n²)       | O(log n)");
console.log("Heap Sort       | O(n log n)  | O(n log n)  | O(n log n)  | O(1)");
console.log("Counting Sort   | O(n + k)    | O(n + k)    | O(n + k)    | O(k)");
console.log("Radix Sort      | O(d(n + k)) | O(d(n + k)) | O(d(n + k)) | O(n + k)");
console.log("Bucket Sort     | O(n + k)    | O(n + k)    | O(n²)       | O(n + k)");
```

I've created a comprehensive guide to sorting algorithms in JavaScript! Here's a summary:

## **Comparison-Based Sorts** (compare elements)

1. **Bubble Sort** - Simple but slow, repeatedly swaps adjacent elements
2. **Selection Sort** - Finds minimum and places it at the start
3. **Insertion Sort** - Builds sorted array one element at a time (good for small/nearly sorted arrays)
4. **Merge Sort** - Efficient divide-and-conquer, always O(n log n)
5. **Quick Sort** - Fast average case, uses pivot partitioning
6. **Heap Sort** - Uses binary heap, guaranteed O(n log n)

## **Non-Comparison Sorts** (no direct comparisons)

1. **Counting Sort** - Perfect for integers in known range, O(n + k)
2. **Radix Sort** - Sorts digit by digit, great for fixed-length numbers
3. **Bucket Sort** - Distributes into buckets, good for uniformly distributed data

## **When to Use Each:**

- **Small arrays (<50 elements)**: Insertion Sort
- **Nearly sorted data**: Insertion Sort or Bubble Sort
- **General purpose**: Quick Sort or Merge Sort
- **Integers in small range**: Counting Sort
- **Need guaranteed O(n log n)**: Merge Sort or Heap Sort
- **Limited memory**: Heap Sort (in-place)
- **Multi-digit numbers**: Radix Sort

The code includes working implementations of all algorithms with test cases and a performance comparison table!
