# **948. Bag of Tokens Flowchart**

```mermaid
flowchart TD
    Start([Start: tokens, power]) --> CheckEmpty{Is tokens<br/>empty?}
    
    CheckEmpty -->|Yes| ReturnZero[Return 0]
    CheckEmpty -->|No| Sort[Sort tokens array<br/>in ascending order]
    
    Sort --> Init[Initialize:<br/>left = 0<br/>right = tokens.length - 1<br/>score = 0<br/>maxScore = 0]
    
    Init --> LoopCheck{left <= right?}
    
    LoopCheck -->|No| ReturnMax[Return maxScore]
    
    LoopCheck -->|Yes| CanAfford{"Can afford<br/>tokens[left]?<br/>power >= tokens[left]"}
    
    CanAfford -->|Yes| FaceUp["Face-Up Play:<br/>power -= tokens[left]<br/>score++<br/>left++"]
    
    FaceUp --> UpdateMax[maxScore = max<br/>maxScore, score]
    
    UpdateMax --> LoopCheck
    
    CanAfford -->|No| HasScore{Have score<br/>to trade?<br/>score >= 1}
    
    HasScore -->|Yes| FaceDown["Face-Down Play:<br/>power += tokens[right]<br/>score--<br/>right--"]
    
    FaceDown --> LoopCheck
    
    HasScore -->|No| Stuck[Stuck! Cannot<br/>make any move]
    
    Stuck --> ReturnMax
    
    ReturnZero --> End([End])
    ReturnMax --> End
    
    style Start fill:#e1f5ff
    style End fill:#e1f5ff
    style Sort fill:#fff4e1
    style FaceUp fill:#d4edda
    style FaceDown fill:#f8d7da
    style ReturnMax fill:#d1ecf1
    style Stuck fill:#f8d7da
    ```
