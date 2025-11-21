# **795. Number of Subarrays with Bounded Maximum**

```mermaid
flowchart TD
    Start([Start]) --> Init[Initialize:<br/>count = 0<br/>lastValidIndex = -1<br/>lastBlockerIndex = -1]
    Init --> Loop{For each<br/>element at<br/>index i}
    
    Loop --> CheckValue{Compare<br/>nums at i with<br/>left and right}
    
    CheckValue -->|Greater than right| Blocker[BLOCKER CASE<br/>Set lastBlockerIndex = i]
    
    CheckValue -->|Between left and right| InRange[IN RANGE CASE<br/>Add i minus lastBlockerIndex to count<br/>Set lastValidIndex = i]
    
    CheckValue -->|Less than left| BelowRange[BELOW RANGE CASE<br/>Check if lastValidIndex > lastBlockerIndex<br/>If true: add lastValidIndex minus lastBlockerIndex]
    
    Blocker --> NextIteration{More<br/>elements?}
    InRange --> NextIteration
    BelowRange --> NextIteration
    
    NextIteration -->|Yes| Loop
    NextIteration -->|No| Return([Return count])
    
    style Start fill:#e1f5e1
    style Return fill:#e1f5e1
    style Blocker fill:#ffe1e1
    style InRange fill:#e1f0ff
    style BelowRange fill:#fff4e1
    style CheckValue fill:#f0e1ff
    ```
