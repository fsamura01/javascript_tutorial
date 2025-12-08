# **838: Push Dominoes FlowChart**

The flowchart now properly visualizes the Push Dominoes algorithm with its three-pass approach:

First pass (left to right): Calculate rightward forces
Second pass (right to left): Calculate leftward forces
Third pass: Compare forces to determine final state

```mermaid
graph TD
    Start([Start: Input dominoes string]) --> Init[Initialize arrays:<br/>rightForces and leftForces<br/>all set to Infinity/Large Value]
    
    Init --> Pass1{First Pass:<br/>Left to Right Scan}
    
    Pass1 --> P1Start[Start from index i=0<br/>rightDistance = Infinity]
    
    P1Start --> P1Loop{i < n?}
    
    P1Loop -->|Yes| P1Check{Check<br/>dominoes at i}
    
    P1Check -->|R| P1R[Set rightDistance = 0<br/>Found rightward force source]
    P1Check -->|L| P1L[Set rightDistance = Infinity<br/>Leftward domino blocks right force]
    P1Check -->|.| P1Dot{rightDistance<br/>not Infinity?}
    
    P1Dot -->|Yes| P1Inc[Increment rightDistance<br/>Force propagates one step further]
    P1Dot -->|No| P1Keep[Keep rightDistance as Infinity]
    
    P1R --> P1Store[Store rightDistance<br/>in rightForces at i]
    P1L --> P1Store
    P1Inc --> P1Store
    P1Keep --> P1Store
    
    P1Store --> P1Next[i++]
    P1Next --> P1Loop
    
    P1Loop -->|No| Pass2{Second Pass:<br/>Right to Left Scan}
    
    Pass2 --> P2Start[Start from index i=n-1<br/>leftDistance = Infinity]
    
    P2Start --> P2Loop{i >= 0?}
    
    P2Loop -->|Yes| P2Check{Check<br/>dominoes at i}
    
    P2Check -->|L| P2L[Set leftDistance = 0<br/>Found leftward force source]
    P2Check -->|R| P2R[Set leftDistance = Infinity<br/>Rightward domino blocks left force]
    P2Check -->|.| P2Dot{leftDistance<br/>not Infinity?}
    
    P2Dot -->|Yes| P2Inc[Increment leftDistance<br/>Force propagates one step further]
    P2Dot -->|No| P2Keep[Keep leftDistance as Infinity]
    
    P2L --> P2Store[Store leftDistance<br/>in leftForces at i]
    P2R --> P2Store
    P2Inc --> P2Store
    P2Keep --> P2Store
    
    P2Store --> P2Next[i--]
    P2Next --> P2Loop
    
    P2Loop -->|No| Pass3{Third Pass:<br/>Compare Forces}
    
    Pass3 --> P3Start[Start from index i=0<br/>Initialize result array]
    
    P3Start --> P3Loop{i < n?}
    
    P3Loop -->|Yes| P3Compare{Compare<br/>rightForces at i vs<br/>leftForces at i}
    
    P3Compare -->|rightForces less| P3Right[Rightward force wins<br/>result at i = R]
    P3Compare -->|leftForces less| P3Left[Leftward force wins<br/>result at i = L]
    P3Compare -->|Equal forces| P3Balance[Forces balanced<br/>result at i = .]
    
    P3Right --> P3Next[i++]
    P3Left --> P3Next
    P3Balance --> P3Next
    
    P3Next --> P3Loop
    
    P3Loop -->|No| Return([Return final result string])
    
    style Start fill:#e1f5e1
    style Return fill:#e1f5e1
    style Pass1 fill:#fff4e1
    style Pass2 fill:#fff4e1
    style Pass3 fill:#fff4e1
    style P3Compare fill:#ffe1e1
    style P1Check fill:#e1f0ff
    style P2Check fill:#e1f0ff
    ```
