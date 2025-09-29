# **Minimum Average Solution Flowchart**

```mermaid
flowchart TD
    A[Start] --> B[Sort array nums in ascending order]
    B --> C[Initialize minAverage = Infinity]
    C --> D[Loop from i=0 to n/2-1]
    D --> E{i < n/2?}
    E -->|Yes| F[Get minElement = take the element at index i]
    F --> G[Get maxElement = take the element at index n-1-i]
    G --> H[Calculate average = minElement + maxElement / 2]
    H --> I[Update minAverage if needed]
    I --> J[i++]
    J --> E
    E -->|No| K[Return minAverage]
    K --> L[End]
    ```
