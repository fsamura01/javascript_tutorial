# **845. Longest Mountain in Array Flowchart**

```mermaid
flowchart TD
    Start([Start: i = 0, maxLength = 0]) --> CheckBounds{i < n?}
    
    CheckBounds -->|No| Return([Return maxLength])
    CheckBounds -->|Yes| SaveBase[base = i]
    
    SaveBase --> CheckAscent{"arr[i] < arr[i+1]?"}
    
    CheckAscent -->|No| NoMovement{i == base?}
    NoMovement -->|Yes| Increment1[i++]
    Increment1 --> CheckBounds
    NoMovement -->|No| CheckBounds
    
    CheckAscent -->|Yes| AscentLoop{"arr[i] < arr[i+1]?"}
    AscentLoop -->|Yes| AscentMove[i++]
    AscentMove --> AscentLoop
    AscentLoop -->|No| AtPeak[At Peak: i]
    
    AtPeak --> CheckDescent{"arr[i] > arr[i+1]?"}
    
    CheckDescent -->|No| NoValidMountain[No valid mountain]
    NoValidMountain --> NoMovement
    
    CheckDescent -->|Yes| DescentLoop{"arr[i] > arr[i+1]?"}
    DescentLoop -->|Yes| DescentMove[i++]
    DescentMove --> DescentLoop
    DescentLoop -->|No| CalcLength[length = i - base + 1]
    
    CalcLength --> UpdateMax["maxLength = max(maxLength, length)"]
    UpdateMax --> CheckBounds
    
    style Start fill:#90EE90
    style Return fill:#FFB6C1
    style AtPeak fill:#FFD700
    style UpdateMax fill:#87CEEB
    ```
