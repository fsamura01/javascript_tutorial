# **923. 3Sum With Multiplicity Flowchart**

```mermaid
flowchart TD
    Start([Start: arr, target]) --> BuildFreq[Build Frequency Map<br/>freq = count of each value 0-100]
    
    BuildFreq --> InitResult[Initialize result = 0<br/>MOD = 10^9 + 7]
    
    InitResult --> LoopX{For x = 0 to 100}
    
    LoopX -->|x exists| LoopY{For y = x to 100}
    LoopX -->|Done| Return([Return result])
    
    LoopY -->|y exists| CalcZ[Calculate z = target - x - y]
    LoopY -->|Done| LoopX
    
    CalcZ --> ValidateZ{"Is z valid?<br/>0 ≤ z ≤ 100<br/>z ≥ y<br/>freq[z] > 0"}
    
    ValidateZ -->|No| LoopY
    ValidateZ -->|Yes| CheckCase{Which Case?}
    
    CheckCase -->|x == y == z| Case1["Case 1: All Same<br/>Need freq[x] ≥ 3<br/>Count = C freq x, 3"]
    CheckCase -->|x == y < z| Case2a["Case 2a: Two Same x<br/>Need freq[x] ≥ 2<br/>Count = C freq x, 2 × freq[z]"]
    CheckCase -->|x < y == z| Case2b["Case 2b: Two Same y<br/>Need freq[y] ≥ 2<br/>Count = freq[x] × C freq y, 2"]
    CheckCase -->|x < y < z| Case3["Case 3: All Different<br/>Count = freq[x] × freq[y] × freq[z]"]
    
    Case1 --> AddResult[result += count<br/>result %= MOD]
    Case2a --> AddResult
    Case2b --> AddResult
    Case3 --> AddResult
    
    AddResult --> LoopY
    
    style Start fill:#e1f5e1
    style Return fill:#e1f5e1
    style CheckCase fill:#fff4e1
    style Case1 fill:#e1e5ff
    style Case2a fill:#e1e5ff
    style Case2b fill:#e1e5ff
    style Case3 fill:#e1e5ff
    style ValidateZ fill:#ffe1e1
    style BuildFreq fill:#f0e1ff
    style AddResult fill:#e1fff4
    ```
