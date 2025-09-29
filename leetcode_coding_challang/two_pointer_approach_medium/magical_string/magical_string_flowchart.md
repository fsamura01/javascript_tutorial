# *Magical String Flowchart*

```mermaid
flowchart TD
    A["🎯 Start: Input n"] --> B{"n ≤ 0?"}
    
    B -->|Yes| C["Return 0"]
    B -->|No| D{"n ≤ 3?"}
    
    D -->|Yes| E["Return 1<br/>(First 3 chars '122' have 1 one)"]
    D -->|No| F["📝 Initialize:<br/>magicalStr = [1, 2, 2]<br/>head = 2, tail = 3<br/>currentChar = 1"]
    
    F --> G{"tail < n?"}
    
    G -->|No| H["🔢 Count ones in first n chars"]
    G -->|Yes| I["📖 Read groupSize = magicalStr[head]"]
    
    I --> J["📝 Initialize group counter: i = 0"]
    J --> K{"i < groupSize AND tail < n?"}
    
    K -->|No| L["📍 Move to next:<br/>head++<br/>currentChar = (currentChar == 1) ? 2 : 1"]
    K -->|Yes| M["✏️ Write: magicalStr[tail] = currentChar<br/>tail++, i++"]
    
    M --> K
    L --> G
    
    H --> N["🏁 Return count of ones"]
    
    style A fill:#e1f5fe
    style B fill:#fff3e0
    style D fill:#fff3e0
    style G fill:#fff3e0
    style K fill:#fff3e0
    style F fill:#f3e5f5
    style I fill:#e8f5e8
    style M fill:#e8f5e8
    style H fill:#ffebee
    style N fill:#e1f5fe
    
    %% Add annotations
    O["💡 Key Insights:<br/>• Start with '122' seed<br/>• head reads instructions<br/>• tail writes new chars<br/>• Alternate between 1s and 2s<br/>• Self-referential construction"] 
    
    style O fill:#fffde7
    ```
