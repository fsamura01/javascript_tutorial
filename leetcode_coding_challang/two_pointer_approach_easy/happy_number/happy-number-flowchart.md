# **Happy Number Algorithm Flowchart**

```mermaid
flowchart TD
    A[Start] --> B[Input: n]
    B --> C[Initialize Set seen]
    C --> D{Is n = 1?}
    D -->|Yes| E[Return true]
    D -->|No| F{Is n in seen?}
    F -->|Yes| G[Return false]
    F -->|No| H[Add n to seen]
    H --> I[Calculate sum of squares of digits]
    I --> J[Set n = sum]
    J --> D

    subgraph "Calculate sum of squares of digits"
    K[Initialize sum = 0] --> L{Is n > 0?}
    L -->|Yes| M[digit = n % 10]
    M --> N[sum += digit * digit]
    N --> O[n = Math.floor n / 10]
    O --> L
    L -->|No| P[Return sum]
    end
``
