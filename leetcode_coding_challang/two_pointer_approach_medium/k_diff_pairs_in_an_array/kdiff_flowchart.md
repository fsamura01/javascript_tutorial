# LeetCode 532: K-diff Pairs in an Array

```mermaid
flowchart TD
    A[Start: nums array, k value] --> B{Is k = 0?}
    
    B -->|Yes| C[Create frequency map]
    C --> D[Count each number's frequency]
    D --> E[Count numbers with frequency >= 2]
    E --> F[Return count]
    
    B -->|No| G[Create set from nums array]
    G --> H[Initialize count = 0]
    H --> I[For each unique number in set]
    I --> J{Does set contain num + k?}
    J -->|Yes| K[Increment count]
    J -->|No| L[Continue to next number]
    K --> L
    L --> M{More numbers to check?}
    M -->|Yes| I
    M -->|No| N[Return count]
    
    F --> O[End]
    N --> O
    
    style A fill:#e1f5fe
    style O fill:#e8f5e8
    style B fill:#fff3e0
    style J fill:#fff3e0
    ```
