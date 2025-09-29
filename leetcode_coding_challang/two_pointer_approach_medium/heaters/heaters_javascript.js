/**
 * @param {number[]} houses
 * @param {number[]} heaters
 * @return {number}
 */
var findRadius = function(houses, heaters) {
    // Step 1: Sort heaters to enable binary search
    heaters.sort((a, b) => a - b);
    
    let maxRadius = 0;
    
    // Step 2: For each house, find the minimum radius needed
    for (let house of houses) {
        // Find the position where this house would be inserted in sorted heaters
        let closestDistance = findClosestHeaterDistance(house, heaters);
        
        // Step 3: Update our maximum radius if this house needs a larger radius
        maxRadius = Math.max(maxRadius, closestDistance);
    }
    
    return maxRadius;
};

/**
 * Helper function to find the distance to the closest heater for a given house
 * Uses binary search approach to efficiently find nearest heater(s)
 */
function findClosestHeaterDistance(house, heaters) {
    let left = 0, right = heaters.length - 1;
    
    // Binary search to find the insertion point
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (heaters[mid] === house) {
            // House is exactly at a heater position - distance is 0
            return 0;
        } else if (heaters[mid] < house) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    // After binary search:
    // - right points to the largest heater <= house (or -1 if none exists)
    // - left points to the smallest heater > house (or heaters.length if none exists)
    
    let minDistance = Infinity;
    
    // Check distance to left heater (largest heater <= house position)
    if (right >= 0) {
        minDistance = Math.min(minDistance, house - heaters[right]);
    }
    
    // Check distance to right heater (smallest heater > house position)  
    if (left < heaters.length) {
        minDistance = Math.min(minDistance, heaters[left] - house);
    }
    
    return minDistance;
}

// Alternative cleaner implementation using JavaScript's built-in binary search concepts
var findRadiusAlternative = function(houses, heaters) {
    heaters.sort((a, b) => a - b);
    
    return Math.max(...houses.map(house => {
        // Find insertion point using binary search logic
        let left = 0, right = heaters.length;
        
        while (left < right) {
            let mid = Math.floor((left + right) / 2);
            if (heaters[mid] < house) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        // left is now the insertion point
        // Calculate distances to adjacent heaters
        let leftDist = left > 0 ? house - heaters[left - 1] : Infinity;
        let rightDist = left < heaters.length ? heaters[left] - house : Infinity;
        
        return Math.min(leftDist, rightDist);
    }));
};