# **Flowchart for findMaxK Function**

```mermaid
flowchart TD
    A[Start] --> B[Initialize: <br>- Create empty Set 'numSet'<br>- Set maxK = -1]
    B --> C[Populate numSet with <br>all numbers from input array]
    C --> D[For each number 'num' in input array]

    D --> E{Is num > 0?}
    E -->|Yes| F{Does numSet <br>contain -num?}
    E -->|No| G[Continue to <br>next number]
    
    F -->|Yes| H[maxK = Math.max<br>maxK, num]
    F -->|No| G
    
    H --> G
    G --> I{More numbers <br>to check?}
    I -->|Yes| D
    I -->|No| J[Return maxK]
    
    J --> K[End]
    
    classDef process fill:#a8d5ba,stroke:#178a44,stroke-width:2px;
    classDef decision fill:#ffda99,stroke:#ff8c00,stroke-width:2px;
    classDef start fill:#c4e3f3,stroke:#337ab7,stroke-width:2px;
    classDef end fill:#f2dede,stroke:#a94442,stroke-width:2px;
    
    class A,K start;
    class B,C,G,H,J process;
    class E,F,I decision;
```
