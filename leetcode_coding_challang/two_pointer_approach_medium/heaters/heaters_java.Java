import java.util.Arrays;

class Solution {
    public int findRadius(int[] houses, int[] heaters) {
        // Step 1: Sort heaters array to enable binary search operations
        Arrays.sort(heaters);
        
        int maxRadius = 0;
        
        // Step 2: For each house, determine the minimum radius needed to reach nearest heater
        for (int house : houses) {
            int closestDistance = findClosestHeaterDistance(house, heaters);
            
            // Step 3: Keep track of the maximum radius needed among all houses
            maxRadius = Math.max(maxRadius, closestDistance);
        }
        
        return maxRadius;
    }
    
    /**
     * Helper method to find the distance from a house to its closest heater
     * Uses binary search to efficiently locate the nearest heater(s)
     * 
     * @param house The position of the house we're analyzing
     * @param heaters Sorted array of heater positions
     * @return The distance to the closest heater
     */
    private int findClosestHeaterDistance(int house, int[] heaters) {
        int left = 0, right = heaters.length - 1;
        
        // Standard binary search to find exact match or insertion point
        while (left <= right) {
            int mid = left + (right - left) / 2;  // Prevents integer overflow
            
            if (heaters[mid] == house) {
                // House is exactly at a heater location
                return 0;
            } else if (heaters[mid] < house) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        // After binary search completes:
        // right = index of largest heater <= house position (or -1 if none)
        // left = index of smallest heater > house position (or heaters.length if none)
        
        int minDistance = Integer.MAX_VALUE;
        
        // Calculate distance to the heater on the left (if it exists)
        if (right >= 0) {
            minDistance = Math.min(minDistance, house - heaters[right]);
        }
        
        // Calculate distance to the heater on the right (if it exists)
        if (left < heaters.length) {
            minDistance = Math.min(minDistance, heaters[left] - house);
        }
        
        return minDistance;
    }
}

// Alternative implementation using Arrays.binarySearch for cleaner code
class SolutionAlternative {
    public int findRadius(int[] houses, int[] heaters) {
        Arrays.sort(heaters);
        
        int maxRadius = 0;
        
        for (int house : houses) {
            // Use Arrays.binarySearch - returns insertion point if not found
            int index = Arrays.binarySearch(heaters, house);
            
            int closestDistance;
            
            if (index >= 0) {
                // Exact match found - house is at heater position
                closestDistance = 0;
            } else {
                // Convert insertion point to actual index
                // Arrays.binarySearch returns -(insertion point) - 1 for non-matches
                index = -(index + 1);
                
                int leftDist = index > 0 ? house - heaters[index - 1] : Integer.MAX_VALUE;
                int rightDist = index < heaters.length ? heaters[index] - house : Integer.MAX_VALUE;
                
                closestDistance = Math.min(leftDist, rightDist);
            }
            
            maxRadius = Math.max(maxRadius, closestDistance);
        }
        
        return maxRadius;
    }
}