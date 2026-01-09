# **986. Interval List Intersections Flowchart**

```mermaid
flowchart TD
    Start([Start]) --> Init[Initialize:<br/>- result array = empty<br/>- pointer i = 0 for firstList<br/>- pointer j = 0 for secondList]
    
    Init --> CheckBounds{Are both<br/>i < firstList.length<br/>AND<br/>j < secondList.length?}
    
    CheckBounds -->|No| Return([Return result array])
    
    CheckBounds -->|Yes| GetIntervals["Get current intervals:<br/>interval1 = firstList[i]<br/>interval2 = secondList[j]"]
    
    GetIntervals --> CalcBounds[Calculate potential intersection:<br/>intersectionStart = max of start1, start2<br/>intersectionEnd = min of end1, end2]
    
    CalcBounds --> CheckIntersection{Is<br/>intersectionStart ≤<br/>intersectionEnd?}
    
    CheckIntersection -->|Yes| AddIntersection[Add the intersection<br/>intersectionStart, intersectionEnd<br/>to result array]
    
    CheckIntersection -->|No| CompareEnds
    
    AddIntersection --> CompareEnds{Which interval<br/>ends first?<br/>Compare end1 vs end2}
    
    CompareEnds -->|end1 < end2| AdvanceI[Increment pointer i<br/>Move to next interval in firstList]
    
    CompareEnds -->|end1 ≥ end2| AdvanceJ[Increment pointer j<br/>Move to next interval in secondList]
    
    AdvanceI --> CheckBounds
    AdvanceJ --> CheckBounds
    
    style Start fill:#90EE90
    style Return fill:#FFB6C1
    style CheckIntersection fill:#FFE4B5
    style CheckBounds fill:#FFE4B5
    style CompareEnds fill:#FFE4B5
    style AddIntersection fill:#87CEEB
    ```
