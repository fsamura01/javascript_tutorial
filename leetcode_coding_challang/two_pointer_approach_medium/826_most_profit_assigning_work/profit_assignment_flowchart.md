# **826. Most Profit Assigning Work flowchat**

```mermaid
flowchart TD
    Start([Start: Given difficulty, profit, worker arrays]) --> CreatePairs[Create job pairs: difficulty, profit]
    
    CreatePairs --> SortJobs[Sort jobs by difficulty ascending]
    
    SortJobs --> SortWorkers[Sort workers by ability ascending]
    
    SortWorkers --> InitVars[Initialize:<br/>maxProfit = 0<br/>totalProfit = 0<br/>jobIndex = 0]
    
    InitVars --> WorkerLoop{More workers<br/>to process?}
    
    WorkerLoop -->|No| ReturnResult([Return totalProfit])
    
    WorkerLoop -->|Yes| GetWorker[Get next worker's ability]
    
    GetWorker --> JobCheck{jobIndex < jobs.length<br/>AND<br/>jobs difficulty ≤ worker ability?}
    
    JobCheck -->|Yes| UpdateMax[Update maxProfit = max maxProfit, current job profit]
    
    UpdateMax --> IncrementJob[Increment jobIndex]
    
    IncrementJob --> JobCheck
    
    JobCheck -->|No| AddProfit[Add maxProfit to totalProfit<br/>This worker gets best profit they can achieve]
    
    AddProfit --> WorkerLoop
    
    style Start fill:#e1f5ff
    style ReturnResult fill:#d4edda
    style UpdateMax fill:#fff3cd
    style AddProfit fill:#f8d7da
    style JobCheck fill:#e7d4f7
    style WorkerLoop fill:#e7d4f7
    ```
