# **881. Boats to Save People Flowchart**

```mermaid
flowchart TD
    Start([Start: Rescue All People]) --> Input[/Input: people array, limit/]
    Input --> Sort[Sort people array in ascending order]
    Sort --> Init[Initialize:<br/>left = 0<br/>right = length - 1<br/>boats = 0]
    Init --> Check{left <= right?}
    
    Check -->|No| Return[/Return boats/]
    Check -->|Yes| Compare{"people[left] +<br/>people[right]<br/><= limit?"}
    
    Compare -->|Yes - Can Share Boat| Pair[Pair them together<br/>Move both pointers:<br/>left++, right--]
    Compare -->|No - Too Heavy| Alone[Heavy person goes alone<br/>Move right pointer:<br/>right--]
    
    Pair --> Increment[boats++]
    Alone --> Increment
    
    Increment --> Check
    
    Return --> End([End: Minimum boats found])
    
    style Start fill:#e1f5e1
    style End fill:#e1f5e1
    style Compare fill:#fff4e1
    style Pair fill:#e1f0ff
    style Alone fill:#ffe1e1
    style Return fill:#f0e1ff
    ```
