/**
 * @param {number[]} g - Array of children's greed factors
 * @param {number[]} s - Array of cookie sizes
 * @return {number} - Maximum number of content children
 */
function findContentChildren(g, s) {
    // Sort both arrays in ascending order
    g.sort((a, b) => a - b);
    s.sort((a, b) => a - b);
    
    let contentChildren = 0;
    let cookieIndex = 0;
    let childIndex = 0;
    
    // Continue until we've either run out of cookies or children
    while (cookieIndex < s.length && childIndex < g.length) {
        // If current cookie can satisfy current child
        if (s[cookieIndex] >= g[childIndex]) {
            contentChildren++;
            childIndex++;
        }
        // Move to next cookie regardless of whether we satisfied a child
        cookieIndex++;
    }
    
    return contentChildren;
}

// Test cases
console.log(findContentChildren([1,2,3], [1,1]));     // Output: 1
console.log(findContentChildren([1,2], [1,2,3]));     // Output: 2

/*
Time Complexity Analysis:
1. Sorting arrays: O(n log n) for g array and O(m log m) for s array, 
   where n is length of g and m is length of s
2. While loop: O(min(n, m)) as we traverse through both arrays once
Overall complexity: O(n log n + m log m)

Space Complexity Analysis:
1. Space used by sorting: O(log n) for g array and O(log m) for s array 
   (typical space complexity for built-in sorting)
2. Additional variables: O(1)
Overall space complexity: O(log n + log m)

Algorithm Explanation:
1. Sort both arrays to ensure we can match cookies and children optimally
2. Use two pointers to track current cookie and child
3. For each cookie, try to satisfy the child with the smallest greed factor
4. If current cookie can satisfy current child, increment both pointers
5. If not, only increment cookie pointer to try next cookie
6. Continue until we run out of either cookies or children

Key insights:
- Sorting is crucial as it allows us to make optimal assignments
- Greedy approach works because we always try to satisfy the child with 
  the smallest greed factor using the smallest possible cookie
- We don't need to backtrack because once we make an assignment, 
  it's guaranteed to be optimal due to the sorting
*/