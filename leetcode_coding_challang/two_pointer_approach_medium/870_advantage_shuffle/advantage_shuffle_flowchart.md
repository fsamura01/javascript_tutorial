# *870. Advantage Shuffle Flowchart*

```mermaid
flowchart TD
    Start([Start: Given nums1 and nums2]) --> Sort[Sort nums1 in ascending order]
    Sort --> CreatePairs[Create pairs from nums2<br/>Each pair: value, original_index]
    CreatePairs --> SortPairs[Sort pairs by value<br/>in descending order]
    SortPairs --> Init[Initialize:<br/>- result array size n<br/>- left pointer = 0<br/>- right pointer = n-1]
    Init --> Loop{More pairs<br/>to process?}
    
    Loop -->|Yes| GetPair[Get next pair:<br/>targetValue, originalIndex]
    GetPair --> Compare{nums1 right <br/> targetValue?}
    
    Compare -->|Yes, Can Win| UseRight[Assign nums1 right<br/>to result originalIndex<br/>This is our smallest winning card]
    UseRight --> DecRight[Decrement right pointer<br/>Mark card as used]
    DecRight --> Loop
    
    Compare -->|No, Cannot Win| UseLeft[Assign nums1 left<br/>to result originalIndex<br/>Sacrifice weakest card]
    UseLeft --> IncLeft[Increment left pointer<br/>Mark card as used]
    IncLeft --> Loop
    
    Loop -->|No| Return([Return result array])
    
    style Start fill:#e1f5e1
    style Return fill:#e1f5e1
    style Compare fill:#fff3cd
    style UseRight fill:#d1ecf1
    style UseLeft fill:#f8d7da
    style Sort fill:#e7d4f7
    style SortPairs fill:#e7d4f7
    ```
