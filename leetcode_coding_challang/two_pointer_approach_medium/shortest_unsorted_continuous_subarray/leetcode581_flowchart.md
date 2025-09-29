# *Leetcode581_flowchart*

```mermaid
flowchart TD
    A[Start: Input array nums] --> B[Initialize left = n, right = 0]
    B --> C[Initialize min = ∞, max = -∞]
    C --> D[For i = 0 to n-2]
    D --> E{"nums[i] > nums[i+1]?"}
    E -->|No| F[i++]
    F --> D
    E -->|Yes| G["Update min = min(min, nums[i+1])"]
    G --> H["Update max = max(max, nums[i])"]
    H --> I{left == n?}
    I -->|Yes| J[Set left = i]
    I -->|No| K[Keep current left]
    J --> L[Set right = i+1]
    K --> L
    L --> F
    D --> M{Loop complete?}
    M -->|No| D
    M -->|Yes| N{left == n?}
    N -->|Yes| O[Return 0: Already sorted]
    N -->|No| P[Expand left boundary]
    P --> Q{"left > 0 AND nums[left-1] > min?"}
    Q -->|Yes| R[left--]
    R --> Q
    Q -->|No| S[Expand right boundary]
    S --> T{"right < n-1 AND nums[right+1] < max?"}
    T -->|Yes| U[right++]
    U --> T
    T -->|No| V[Return right - left + 1]
    V --> W[End]
    O --> W
    ```
