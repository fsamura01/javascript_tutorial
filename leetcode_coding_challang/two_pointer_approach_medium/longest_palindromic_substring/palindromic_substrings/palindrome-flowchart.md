# *Palindromic Substring flowchart*

```mermaid
flowchart TD
    A[Start: Input string s] --> B[Initialize count = 0]
    B --> C[For each index i from 0 to s.length-1]
    
    C --> D["Case 1: Odd-length palindromes<br/>Call expandAroundCenter(i, i)"]
    C --> E["Case 2: Even-length palindromes<br/>Call expandAroundCenter(i, i+1)"]
    
    D --> F[expandAroundCenter Function]
    E --> F
    
    F --> G[Set left = leftIndex, right = rightIndex<br/>localCount = 0]
    G --> H{"left >= 0 AND right < s.length<br/>AND s[left] == s[right]?"}
    
    H -->|Yes| I[Found palindrome!<br/>localCount++]
    I --> J[Expand: left--, right++]
    J --> H
    
    H -->|No| K[Return localCount]
    K --> L[Add localCount to total count]
    
    L --> M{More centers to check?}
    M -->|Yes| C
    M -->|No| N[Return total count]
    
    N --> O[End]
    
    style A fill:#e1f5fe
    style O fill:#c8e6c9
    style F fill:#fff3e0
    style I fill:#f3e5f5
    ```
