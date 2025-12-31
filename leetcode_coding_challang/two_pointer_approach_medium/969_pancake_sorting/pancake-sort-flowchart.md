# **969. Pancake Sorting Flowchart**

```mermaid
graph TD
    Start([Start: Input Array arr]) --> Init[Initialize result = empty array<br/>currentSize = arr.length]
    Init --> LoopCheck{currentSize > 1?}
    
    LoopCheck -->|No| ReturnResult([Return result array])
    LoopCheck -->|Yes| FindMax[Find maxIndex of largest element<br/>in arr subrange 0 to currentSize-1]
    
    FindMax --> CheckPosition{maxIndex ==<br/>currentSize - 1?}
    
    CheckPosition -->|Yes: Already in place| DecrementSize[currentSize--]
    CheckPosition -->|No: Needs moving| CheckFront{maxIndex == 0?}
    
    CheckFront -->|No: Not at front| FlipToFront[Flip arr with k = maxIndex + 1<br/>Reverses arr from 0 to maxIndex]
    FlipToFront --> RecordFlip1[Add maxIndex + 1 to result]
    RecordFlip1 --> FlipToEnd
    
    CheckFront -->|Yes: Already at front| FlipToEnd[Flip arr with k = currentSize<br/>Reverses arr from 0 to currentSize-1]
    
    FlipToEnd --> RecordFlip2[Add currentSize to result]
    RecordFlip2 --> DecrementSize
    
    DecrementSize --> LoopCheck
    
    style Start fill:#e1f5e1
    style ReturnResult fill:#e1f5e1
    style FindMax fill:#fff4e1
    style FlipToFront fill:#ffe1e1
    style FlipToEnd fill:#ffe1e1
    style CheckPosition fill:#e1f0ff
    style CheckFront fill:#e1f0ff
    style LoopCheck fill:#e1f0ff
    ```
