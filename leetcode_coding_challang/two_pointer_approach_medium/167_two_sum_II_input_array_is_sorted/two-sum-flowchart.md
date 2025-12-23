# **167. Two Sum II - Input Array Is Sorted Flowchart**

```mermaid
flowchart TD
    Start([Start: Two Sum II]) --> Input[/Input: numbers array, target/]
    Input --> Init[Initialize Pointers:<br/>left = 0<br/>right = length - 1]
    Init --> Loop{left < right?}
    
    Loop -->|No| Error[Return empty array<br/>Should not reach here]
    Loop -->|Yes| CalcSum[Calculate:<br/>currentSum = numbers left + numbers right]
    
    CalcSum --> Compare{Compare currentSum<br/>with target}
    
    Compare -->|currentSum == target| Found[✓ Solution Found!]
    Found --> Convert[Convert to 1-indexed:<br/>left + 1, right + 1]
    Convert --> Return[/Return: left + 1, right + 1/]
    Return --> End("[End]")
    
    Compare -->|currentSum < target| TooSmall[Sum too small<br/>Need larger value]
    TooSmall --> MoveLeft[Move left pointer right:<br/>left++]
    MoveLeft --> Loop
    
    Compare -->|currentSum > target| TooLarge[Sum too large<br/>Need smaller value]
    TooLarge --> MoveRight[Move right pointer left:<br/>right--]
    MoveRight --> Loop
    
    Error --> End
    
    style Start fill:#e1f5e1
    style End fill:#ffe1e1
    style Found fill:#c7f5c7
    style Compare fill:#fff4e1
    style Loop fill:#e1f0ff
    style Return fill:#f0e1ff
    ```
