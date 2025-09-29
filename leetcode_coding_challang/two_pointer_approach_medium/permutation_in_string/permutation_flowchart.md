# *567. Permutation in String Flowchat*

```mermaid
flowchart TD
    A[Start: s1, s2] --> B{s1.length > s2.length?}
    B -->|Yes| C[Return false]
    B -->|No| D[Create frequency arrays]
    
    D --> E[Count s1 frequencies]
    E --> F[Initialize window with first s1.length chars of s2]
    F --> G{First window matches s1 frequencies?}
    G -->|Yes| H[Return true]
    G -->|No| I[Start sliding window from position s1.length]
    
    I --> J{i < s2.length?}
    J -->|No| K[Return false - No match found]
    J -->|Yes| L["Add s2[i] to window frequency"]
    
    L --> M["Remove s2[i - s1.length] from window frequency"]
    M --> N{Current window matches s1 frequencies?}
    N -->|Yes| O[Return true]
    N -->|No| P[Increment i]
    P --> J
    
    style A fill:#e1f5fe
    style C fill:#ffcdd2
    style H fill:#c8e6c9
    style K fill:#ffcdd2
    style O fill:#c8e6c9
    ```
