# *786. K-th Smallest Prime Fraction*

```mermaid
flowchart TD
    Start([Start: arr, k]) --> Input[/"Input: sorted array arr, integer k"/]
    Input --> Init[Initialize Min Heap]
    
    Init --> InitLoop{For each denominator j<br/>from 1 to n-1}
    InitLoop -->|Yes| AddToHeap["Add fraction arr[0]/arr[j]<br/>as tuple: index 0, j"]
    AddToHeap --> InitLoop
    InitLoop -->|No| Extract[Extract count = 0]
    
    Extract --> ExtractLoop{count < k - 1?}
    ExtractLoop -->|Yes| PopMin[Pop minimum from heap<br/>Get indices i, j]
    PopMin --> CheckNext{i + 1 < j?}
    CheckNext -->|Yes| AddNext["Add fraction arr[i+1]/arr[j]<br/>to heap"]
    CheckNext -->|No| Increment
    AddNext --> Increment[count++]
    Increment --> ExtractLoop
    
    ExtractLoop -->|No| GetKth[Pop k-th element from heap<br/>Get indices i, j]
    GetKth --> Return[/"Return: arr[i], arr[j]"/]
    Return --> End([End])
    
    style Start fill:#e1f5e1
    style End fill:#ffe1e1
    style Init fill:#e1e5ff
    style PopMin fill:#fff4e1
    style GetKth fill:#ffe1f5
    style Return fill:#e1f5e1
    
    subgraph "Key Insight"
        Insight1[Each denominator creates<br/>a sorted sequence of fractions]
        Insight2[Heap efficiently merges<br/>these sequences]
    end
    
    subgraph "Example Trace: arr=[1,2,3,5], k=3"
        Ex1["Initial heap:<br/>[1/2, 1/3, 1/5]"]
        Ex2["Extract 1st (1/5):<br/>Add 2/5"]
        Ex3["Extract 2nd (1/3):<br/>Add 2/3"]
        Ex4["Extract 3rd (2/5):<br/>Answer: [2,5]"]
        Ex1 --> Ex2 --> Ex3 --> Ex4
    end
    ```
