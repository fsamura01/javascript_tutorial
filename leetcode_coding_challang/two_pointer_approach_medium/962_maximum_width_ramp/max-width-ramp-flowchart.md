# **962. Maximum Width Ramp Flowchart**

```mermaid
graph TD
    Start([Start: nums array]) --> Init[Initialize empty stack and maxWidth = 0]
    
    Init --> Phase1[Phase 1: Build Monotonic Stack]
    
    Phase1 --> Loop1{For i = 0 to n-1}
    Loop1 -->|Has more| Check1{"Stack empty OR<br/>nums[i] < nums[stack.top]?"}
    
    Check1 -->|Yes| Push[Push i to stack]
    Check1 -->|No| Skip1[Skip this index]
    
    Push --> Loop1
    Skip1 --> Loop1
    
    Loop1 -->|Done| Phase2[Phase 2: Scan from Right]
    
    Phase2 --> Loop2{For j = n-1 down to 0}
    
    Loop2 -->|Has more| Check2{"Stack not empty AND<br/>nums[stack.top] <= nums[j]?"}
    
    Check2 -->|Yes| Pop[Pop i from stack]
    Pop --> Calc[Calculate width = j - i]
    Calc --> Update[maxWidth = max of maxWidth and width]
    Update --> Check2
    
    Check2 -->|No| Next[Move to j-1]
    Next --> Loop2
    
    Loop2 -->|Done| Return([Return maxWidth])
    
    style Phase1 fill:#e1f5ff
    style Phase2 fill:#fff4e1
    style Return fill:#d4edda
    style Start fill:#d4edda
    ```
