/**
 * LeetCode 825: Friends Of Appropriate Ages
 * 
 * Core Insight: Use counting + prefix sums since ages are bounded [1, 120]
 * For age A, valid targets are in range (0.5*A + 7, A]
 */
var numFriendRequests = function(ages) {
    // Step 1: Count frequency of each age (ages range from 1 to 120)
    const count = new Array(121).fill(0);
    for (const age of ages) {
        count[age]++;
    }
    
    // Step 2: Build prefix sum array
    // prefix[i] = total number of people with age <= i
    const prefix = new Array(121).fill(0);
    for (let i = 1; i <= 120; i++) {
        prefix[i] = prefix[i - 1] + count[i];
    }
    
    let totalRequests = 0;
    
    // Step 3: For each possible sender age, count valid requests
    for (let age = 15; age <= 120; age++) {
        // Skip if no one has this age
        if (count[age] === 0) continue;
        
        // Calculate the valid range for recipients: (low, age]
        // Recipients must satisfy: age[y] > 0.5 * age[x] + 7
        const low = Math.floor(0.5 * age + 7);
        
        // Ensure valid range exists (low < age)
        if (low >= age) continue;
        
        // Count people in range (low, age] using prefix sums
        // This equals prefix[age] - prefix[low]
        const validRecipients = prefix[age] - prefix[low];
        
        // Each person of this age sends to all valid recipients
        // But subtract count[age] because they can't send to themselves
        // (themselves are included in validRecipients when age[y] == age[x])
        totalRequests += count[age] * (validRecipients - 1);
    }
    
    return totalRequests;
};

// ----- Test Cases -----
console.log(numFriendRequests([16, 16]));           // Expected: 2
console.log(numFriendRequests([16, 17, 18]));       // Expected: 2
console.log(numFriendRequests([20, 30, 100, 110, 120])); // Expected: 3
