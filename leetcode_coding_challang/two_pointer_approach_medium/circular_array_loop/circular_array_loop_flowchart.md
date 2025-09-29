# **Circular Array Loop Flowchart**

```mermaid
flowchart TD
    A[Start: Input array nums] --> B[Initialize index i = 0]
    B --> C{i < nums.length?}
    C -->|No| R[Return false - No cycle found]
    C -->|Yes| D{"nums[i]" == 0?}
    D -->|Yes| S[i++, Skip already visited]
    S --> C
    D -->|No| E["Initialize slow = i, fast = getNext(i)"]
    E --> F{Same direction AND fast can move 2 steps?}
    F -->|No| P[Mark path as visited]
    F -->|Yes| G{slow == fast?}
    G -->|No| H[Move slow 1 step, fast 2 steps]
    H --> F
    G -->|Yes| I{"slow == getNext(slow)?"}
    I -->|Yes| P
    I -->|No| Q[Return true - Valid cycle found!]
    P --> P1[slow = i]
    P1 --> P2{Same direction to next?}
    P2 -->|Yes| P3["Mark nums[slow] = 0"]
    P3 --> P4["slow = getNext(slow)"]
    P4 --> P5{"nums[slow] == 0?"}
    P5 -->|Yes| P6[Mark final position]
    P5 -->|No| P2
    P6 --> S
    P2 -->|No| P6
    
    style A fill:#e1f5fe
    style Q fill:#c8e6c9
    style R fill:#ffcdd2
    style F fill:#fff3e0
    style G fill:#f3e5f5
    style I fill:#f3e5f5
    ```
