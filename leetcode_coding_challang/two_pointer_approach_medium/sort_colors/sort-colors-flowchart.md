# **Sort Colors Flowchart**

```mermaid


flowchart TD
    A[Start] --> B[Initialize three pointers: low = 0, mid = 0, high = nums.length - 1]
    B --> C{Is mid <= high?}
    C -->|Yes| D{Is the element at the mid == 0?}
    D -->|0| E[Swap the element at the low pointer with the element at the mid pointer]
    E --> F[Increment low]
    F --> G[Increment mid]
    G --> C

    D -->|1| H[Increment mid]
    H --> C
    
    D -->|2| I[Swap the element at the mid pointer with the element at the high pointer]
    I --> J[Decrement high]
    J --> C
    
    C -->|No| K[End: Array is sorted]
    ```
