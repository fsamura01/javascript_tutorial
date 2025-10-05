# *Partition Labels Flowchart*

```mermaid
flowchart TD
    Start("[Start: Input string s]") --> Init[Initialize lastOccurrence map/array]
    
    Init --> Phase1{Phase 1: Record Last Occurrences}
    Phase1 --> Loop1[For i = 0 to s.length - 1]
    Loop1 --> Record["lastOccurrence s[i] = i"]
    Record --> Check1{All characters<br/>processed?}
    Check1 -->|No| Loop1
    Check1 -->|Yes| Phase2Init
    
    Phase2Init[Initialize:<br/>start = 0<br/>end = 0<br/>result = empty array] --> Phase2{Phase 2: Build Partitions}
    
    Phase2 --> Loop2[For i = 0 to s.length - 1]
    Loop2 --> GetChar["current_char = s[i]"]
    GetChar --> UpdateEnd[end = max end, lastOccurrence current_char]
    
    UpdateEnd --> CheckBoundary{Is i == end?}
    
    CheckBoundary -->|No| Continue[Move to next character]
    Continue --> Loop2Check{More characters?}
    
    CheckBoundary -->|Yes| FinishPartition[Partition found!<br/>size = i - start + 1]
    FinishPartition --> AddResult[Add size to result]
    AddResult --> UpdateStart[start = i + 1]
    UpdateStart --> Loop2Check
    
    Loop2Check -->|Yes| Loop2
    Loop2Check -->|No| Return([Return result array])
    
    style Start fill:#e1f5e1
    style Return fill:#e1f5e1
    style Phase1 fill:#fff4e1
    style Phase2 fill:#fff4e1
    style CheckBoundary fill:#ffe1e1
    style FinishPartition fill:#e1f0ff
    ```
