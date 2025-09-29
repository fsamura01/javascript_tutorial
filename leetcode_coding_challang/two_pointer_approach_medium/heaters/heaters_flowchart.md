# Heaters Flowchart

```mermaid
flowchart TD
    A[Start: Given houses and heaters arrays] --> B[Sort heaters array]
    B --> C[Initialize maxRadius = 0]
    C --> D[For each house in houses array]
    D --> E[Perform binary search on sorted heaters]
    E --> F{Found exact match?}
    F -->|Yes| G[Distance = 0]
    F -->|No| H[Find insertion point]
    H --> I[Calculate distance to left heater if exists]
    I --> J[Calculate distance to right heater if exists]
    J --> K[Take minimum of left and right distances]
    K --> L["Update maxRadius = max(maxRadius, currentDistance)"]
    G --> L
    L --> M{More houses to process?}
    M -->|Yes| D
    M -->|No| N[Return maxRadius]
    
    subgraph "Binary Search Details"
        E --> E1[Set left = 0, right = heaters.length - 1]
        E1 --> E2[While left <= right]
        E2 --> E3["Calculate mid = left + (right - left) / 2"]
        E3 --> E4{"heaters[mid] == house?"}
        E4 -->|Yes| E5[Return 0 - exact match]
        E4 -->|No| E6{"heaters[mid] < house?"}
        E6 -->|Yes| E7[left = mid + 1]
        E6 -->|No| E8[right = mid - 1]
        E7 --> E2
        E8 --> E2
        E2 -->|Exit loop| H
    end
    
    subgraph "Distance Calculation Details"
        I --> I1{right >= 0?}
        I1 -->|Yes| I2["leftDist = house - heaters[right]"]
        I1 -->|No| I3[leftDist = INFINITY]
        J --> J1{left < heaters.length?}
        J1 -->|Yes| J2["rightDist = heaters[left] - house"]
        J1 -->|No| J3[rightDist = INFINITY]
        I2 --> K
        I3 --> K
        J2 --> K
        J3 --> K
    end
    
    style A fill:#e1f5fe
    style N fill:#c8e6c9
    style F fill:#fff3e0
    style M fill:#fff3e0
    ```
