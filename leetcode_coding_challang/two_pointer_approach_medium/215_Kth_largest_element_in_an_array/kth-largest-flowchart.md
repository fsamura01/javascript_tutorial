# 215. Kth Largest Element in an Array Flowchart

```mermaid
graph TD
    Start([Start: Given nums array and k]) --> Decision1{Choose Approach}
    
    Decision1 -->|Min-Heap O n log k| HeapStart[Create Min-Heap of size k]
    Decision1 -->|QuickSelect O n avg| QSStart[Convert: target = n - k]
    
    %% Min-Heap Flow
    HeapStart --> HeapInit[Add first k elements to heap]
    HeapInit --> HeapLoop{More elements?}
    HeapLoop -->|Yes| HeapCompare{Current > Heap Min?}
    HeapCompare -->|Yes| HeapReplace[Remove min, Add current]
    HeapCompare -->|No| HeapSkip[Skip element]
    HeapReplace --> HeapNext[Move to next element]
    HeapSkip --> HeapNext
    HeapNext --> HeapLoop
    HeapLoop -->|No| HeapReturn[Return heap.peek]
    HeapReturn --> End([Return Result])
    
    %% QuickSelect Flow
    QSStart --> QSChoose[Choose random pivot]
    QSChoose --> QSSwap1[Move pivot to end]
    QSSwap1 --> QSPartition[Partition: small left, large right]
    QSPartition --> QSPlace[Place pivot at final position]
    QSPlace --> QSCompare{Pivot index vs target?}
    
    QSCompare -->|Equal| QSFound[Found! Return pivot value]
    QSCompare -->|Less than target| QSRight[Recurse on right partition]
    QSCompare -->|Greater than target| QSLeft[Recurse on left partition]
    
    QSRight --> QSChoose
    QSLeft --> QSChoose
    QSFound --> End
    
    %% Styling
    classDef startEnd fill:#e1f5e,stroke:#4caf50,stroke-width:3px
    classDef decision fill:#fff3c,stroke:#ffc107,stroke-width:2px
    classDef process fill:#cfe2f,stroke:#0d6efd,stroke-width:2px
    classDef heap fill:#f8d7d,stroke:#dc3545,stroke-width:2px
    classDef quickselect fill:#d1ecf,stroke:#0dcaf0,stroke-width:2px
    
    class Start,End startEnd
    class Decision1,HeapLoop,HeapCompare,QSCompare decision
    class HeapInit,HeapReplace,HeapSkip,HeapNext,HeapReturn heap
    class QSStart,QSChoose,QSSwap1,QSPartition,QSPlace,QSFound,QSRight,QSLeft quickselect
    ```
