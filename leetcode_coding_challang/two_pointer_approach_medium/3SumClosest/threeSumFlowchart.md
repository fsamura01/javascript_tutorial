# **3Sum Closest Flowchart**

```mermaid
flowchart TD
    A[Start] --> B[Sort the input array]
    B --> C[Initialize closestSum with first three elements]
    C --> D[Loop through array for first number i = 0 to n-3]
    D --> E{"Is nums[i] same as nums[i-1] and i > 0?"}
    E -->|Yes| D
    E -->|No| F[Set left = i+1, right = n-1]
    F --> G{Is left < right?}
    G -->|Yes| H["Calculate currentSum = nums[i] + nums[left] + nums[right]"]
    G -->|No| D
    H --> I{Is currentSum == target?}
    I -->|Yes| J[Return currentSum]
    I -->|No| K{"Is |currentSum - target| < |closestSum - target|?"}
    K -->|Yes| L[Update closestSum = currentSum]
    K -->|No| M{Is currentSum < target?}
    L --> M
    M -->|Yes| N[Increment left pointer]
    M -->|No| O[Decrement right pointer]
    N --> P{"Is nums[left] same as nums[left-1]?"}
    O --> Q{"Is nums[right] same as nums[right+1]?"}
    P -->|Yes| N
    P -->|No| G
    Q -->|Yes| O
    Q -->|No| G
    D --> R{End of loop?}
    R -->|Yes| S[Return closestSum]
    R -->|No| D
    J --> Z[End]
    S --> Z[End]
    ```
