# **Compression Flowchart**

```mermaid
flowchart TD
    A[Initialize: writeIndex = 0, readIndex = 0] --> B{readIndex < chars.length?}
    
    B -->|Yes| C["currentChar = chars[readIndex]"]
    B -->|No| N[Return writeIndex]
    
    C --> D[count = 0]
    D --> E{"readIndex < chars.length AND chars[readIndex] == currentChar?"}
    
    E -->|Yes| F[count++, readIndex++]
    F --> E
    
    E -->|No| G["Write currentChar to chars[writeIndex]"]
    G --> H[writeIndex++]
    
    H --> I{count > 1?}
    
    I -->|Yes| J[Convert count to string]
    I -->|No| B
    
    J --> K[For each digit in count string]
    K --> L["Write digit to chars[writeIndex]"]
    L --> M[writeIndex++]
    M --> O{More digits?}
    
    O -->|Yes| K
    O -->|No| B
    
    style A fill:#e1f5fe
    style N fill:#c8e6c9
    style G fill:#fff3e0
    style L fill:#fff3e0
    style B fill:#f3e5f5
    style E fill:#f3e5f5
    style I fill:#f3e5f5
    style O fill:#f3e5f5
    ```
