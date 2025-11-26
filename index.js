/**
 * LeetCode 825: Friends Of Appropriate Ages
 *
 * Core Insight: Use counting + prefix sums since ages are bounded [1, 120]
 * For age A, valid targets are in range (0.5*A + 7, A]
 */
var numFriendRequests = function (ages) {
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

  let totalRecipients = 0;

  for (let age = 15; age < 120; age++) {
    if (count[age] === 0) continue;

    let low = Math.flow(0.5 * age + 7);

    if (low >= age) continue;

    let validRecipients = prefix[age] - prefix[low];

    totalRecipients = count[age] * (validRecipients - 1);
  }

  return totalRecipients;
};

// ----- Test Cases -----
console.log(numFriendRequests([16, 16])); // Expected: 2
console.log(numFriendRequests([16, 17, 18])); // Expected: 2
console.log(numFriendRequests([20, 30, 100, 110, 120])); // Expected: 3
