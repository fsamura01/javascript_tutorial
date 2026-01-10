# **1023. Camelcase Matching Flowchart**

```mermaid
flowchart TD
    Start([Start: Process All Queries]) --> InitResult[Initialize Result Array]
    InitResult --> LoopQueries{For Each Query in Queries}
    
    LoopQueries -->|Next Query| InitPointers[Initialize Pointers:<br/>patternIdx = 0<br/>queryIdx = 0]
    
    InitPointers --> CheckQuery{queryIdx < query.length?}
    
    CheckQuery -->|Yes| GetChars["Get Current Characters:<br/>queryChar = query[queryIdx]<br/>patternChar = pattern[patternIdx]"]
    
    GetChars --> CompareChars{queryChar ==<br/>patternChar?}
    
    CompareChars -->|Yes, Match!| MovePattern[patternIdx++<br/>queryIdx++]
    MovePattern --> CheckQuery
    
    CompareChars -->|No| CheckUppercase{Is queryChar<br/>Uppercase?}
    
    CheckUppercase -->|Yes| InvalidMatch[❌ Extra Uppercase Letter<br/>Cannot Insert!]
    InvalidMatch --> AddFalse[Add FALSE to Result]
    AddFalse --> LoopQueries
    
    CheckUppercase -->|No, Lowercase| SkipLowercase[✓ Inserted Lowercase<br/>queryIdx++<br/>Skip this character]
    SkipLowercase --> CheckQuery
    
    CheckQuery -->|No, End of Query| FinalCheck{patternIdx ==<br/>pattern.length?}
    
    FinalCheck -->|Yes| AllMatched[✓ All Pattern Characters Matched]
    AllMatched --> AddTrue[Add TRUE to Result]
    AddTrue --> LoopQueries
    
    FinalCheck -->|No| NotAllMatched[❌ Pattern Not Fully Matched]
    NotAllMatched --> AddFalse
    
    LoopQueries -->|All Queries Processed| ReturnResult[Return Result Array]
    ReturnResult --> End([End])
    
    style Start fill:#e1f5e1
    style End fill:#e1f5e1
    style InvalidMatch fill:#ffe1e1
    style NotAllMatched fill:#ffe1e1
    style AllMatched fill:#e1f5e1
    style AddTrue fill:#c8e6c9
    style AddFalse fill:#ffcdd2
    style MovePattern fill:#fff9c4
    style SkipLowercase fill:#fff9c4
    ```
