# 1471. The k Strongest Values in an Array

```mermaid
flowchart TD
    Start([Start: getStrongest arr, k]) --> Step1[Create sorted copy of arr]
    Step1 --> Step2[Sort the copy in ascending order]
    Step2 --> Step3[Calculate n = arr.length]
    Step3 --> Step4[Calculate medianIndex = floor n - 1 / 2]
    Step4 --> Step5[Get median = sorted medianIndex]
    
    Step5 --> Step6[Sort original arr with custom comparator]
    Step6 --> CompareStart{Compare elements a and b}
    
    CompareStart --> CalcDist["Calculate:<br/>distA = |a - median|<br/>distB = |b - median|"]
    CalcDist --> CheckDist{distA ≠ distB?}
    
    CheckDist -->|Yes| ReturnDistDiff[Return distB - distA<br/>larger distance first]
    CheckDist -->|No| ReturnValueDiff[Return b - a<br/>larger value first]
    
    ReturnDistDiff --> NextPair{More pairs<br/>to compare?}
    ReturnValueDiff --> NextPair
    
    NextPair -->|Yes| CompareStart
    NextPair -->|No| Step7[Array now sorted by strength<br/>strongest elements first]
    
    Step7 --> Step8[Return arr.slice 0, k<br/>first k elements]
    Step8 --> End([End: Return k strongest values])
    
    style Start fill:#e1f5e
    style End fill:#ffe1e
    style Step6 fill:#fff4e
    style CheckDist fill:#e1f0f
    style NextPair fill:#e1f0f
    ```
