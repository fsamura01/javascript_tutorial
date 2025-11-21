# *809. Expressive Words Flowchart*

```mermaid
graph TD
    Start([Start: expressiveWords]) --> Init[Initialize count = 0]
    Init --> LoopWords{For each word<br/>in words array}
    
    LoopWords -->|Next word| CheckStretchy[Call isStretchy<br/>target, word]
    LoopWords -->|Done| ReturnCount[Return count]
    ReturnCount --> End([End])
    
    CheckStretchy --> InitPointers[Initialize i = 0, j = 0<br/>i for target, j for word]
    InitPointers --> WhileLoop{i < target.length<br/>AND<br/>j < word.length?}
    
    WhileLoop -->|No| CheckBothEnd{Both pointers<br/>at end?}
    CheckBothEnd -->|Yes| IncrementCount[Increment count]
    CheckBothEnd -->|No| NextWord[Move to next word]
    IncrementCount --> NextWord
    NextWord --> LoopWords
    
    WhileLoop -->|Yes| CompareChar{"target[i]<br/>==<br/>word[j]?"}
    CompareChar -->|No| ReturnFalse[Return false<br/>Not stretchy]
    ReturnFalse --> NextWord
    
    CompareChar -->|Yes| GetGroups[Get group lengths:<br/>targetGroupLength<br/>wordGroupLength]
    
    GetGroups --> CheckRule1{targetGroupLength<br/><br/>wordGroupLength?}
    CheckRule1 -->|Yes| ReturnFalse
    
    CheckRule1 -->|No| CheckRule2{targetGroupLength<br/>><br/>wordGroupLength<br/>AND<br/>targetGroupLength < 3?}
    
    CheckRule2 -->|Yes| ReturnFalse
    
    CheckRule2 -->|No| AdvancePointers[Advance pointers:<br/>i += targetGroupLength<br/>j += wordGroupLength]
    
    AdvancePointers --> WhileLoop
    
    style Start fill:#e1f5e1
    style End fill:#e1f5e1
    style ReturnCount fill:#fff4e1
    style IncrementCount fill:#e1f0ff
    style ReturnFalse fill:#ffe1e1
    style CheckStretchy fill:#f0e1ff
    style GetGroups fill:#f0e1ff
    ```
