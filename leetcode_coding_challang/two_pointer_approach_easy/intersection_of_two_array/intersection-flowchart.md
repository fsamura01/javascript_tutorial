# **Intersection of Two Arrays - Solution Flowchart**

```Mermaid
flowchart TD
    A[Start] --> B[Input: nums1, nums2]
    B --> C[Create Set from nums1]
    C --> D[Initialize empty result Set]
    D --> E[For each num in nums2]
    E --> F{Is num in set1?}
    F -- Yes --> G[Add num to result Set]
    F -- No --> H[Skip num]
    G --> I{More elements in nums2?}
    H --> I
    I -- Yes --> E
    I -- No --> J[Convert result Set to array]
    J --> K[Return result array]
    K --> L[End]
```
