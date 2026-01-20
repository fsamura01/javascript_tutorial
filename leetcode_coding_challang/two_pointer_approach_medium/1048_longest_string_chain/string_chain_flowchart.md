# 1048. Longest String Chain Flowchart

````mermaid
flowchart TD
    Start([Start: Receive words array]) --> Sort[Sort words by length ascending]
    Sort --> InitDP[Initialize empty HashMap dp]
    InitDP --> InitMax[Initialize maxChain = 1]
    InitMax --> Loop{For each word<br/>in sorted array}

    Loop -->|Next word| SetCurrent[Set currentChainLength = 1]
    SetCurrent --> InnerLoop{For i = 0 to<br/>word.length - 1}

    InnerLoop -->|Next position| RemoveChar[Generate predecessor:<br/>remove character at index i]
    RemoveChar --> CheckDP{Does predecessor<br/>exist in dp?}

    CheckDP -->|Yes| UpdateChain[currentChainLength = max<br/>currentChainLength,<br/>dp predecessor + 1]
    CheckDP -->|No| InnerLoop
    UpdateChain --> InnerLoop

    InnerLoop -->|All positions<br/>processed| StoreDp[Store in dp:<br/>dp word = currentChainLength]
    StoreDp --> UpdateMax[maxChain = max<br/>maxChain,<br/>currentChainLength]
    UpdateMax --> Loop

    Loop -->|All words<br/>processed| Return([Return maxChain])

    style Start fill:#1f5e1
    style Return fill:#fe1e1
    style Sort fill:#fff4e
    style CheckDP fill:#e1f0f
    style UpdateChain fill:#f0e1f
    style StoreDp fill:#ffe1f
    ```
````
