
# 556. Next Greater Element III Flowchart

```mermaid
flowchart TD
    A[Start: Input n] --> B[Convert n to digit array]
    B --> C[Find pivot: rightmost digit < next digit]
    C --> D{Pivot found?}
    D -->|No| E[Return -1: No greater permutation]
    D -->|Yes| F[Find successor: smallest digit > pivot to the right]
    F --> G[Swap pivot and successor]
    G --> H[Reverse all digits after pivot position]
    H --> I[Convert back to integer]
    I --> J{Result > 2^31 - 1?}
    J -->|Yes| K[Return -1: Overflow]
    J -->|No| L[Return result]
    
    style A fill:#e1f5fe
    style E fill:#ffcdd2
    style K fill:#ffcdd2
    style L fill:#c8e6c9
    ```
