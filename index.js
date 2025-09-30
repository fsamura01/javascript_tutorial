/**
 * @param {number[]} difficulty
 * @param {number[]} profit
 * @param {number[]} worker
 * @return {number}
 */
function maxProfitAssignment(difficulty, profit, worker) {
  // Step 1: Create job pairs and sort by difficulty
  // We pair each difficulty with its corresponding profit so we don't lose the association
  const jobs = [];
  for (let i = 0; i < difficulty.length; i++) {
    jobs.push([difficulty[i], profit[i]]);
  }

  // Sort jobs by difficulty in ascending order
  // This allows us to process jobs from easiest to hardest
  jobs.sort((a, b) => a[0] - b[0]);

  // Step 2: Sort workers by ability in ascending order
  // This enables us to use a two-pointer approach efficiently
  worker.sort((a, b) => a - b);

  // Step 3: Process workers and assign best jobs
  let maxProfit = 0; // Running maximum profit seen so far
  let totalProfit = 0; // Total profit accumulated across all workers
  let jobIndex = 0; // Pointer to track our position in the jobs array

  // Process each worker in order of increasing ability
  for (let workerAbility of worker) {
    // For this worker, scan through all jobs they can complete
    // We only move forward because we sorted both arrays
    // Jobs we've already passed are guaranteed to be easier than future ones
    while (jobIndex < jobs.length && jobs[jobIndex][0] <= workerAbility) {
      // Update the maximum profit we've seen for jobs up to this difficulty
      // This is the greedy choice: always remember the best profit so far
      maxProfit = Math.max(maxProfit, jobs[jobIndex][1]);
      jobIndex++;
    }

    // Assign the best profit this worker can achieve
    // Even if we didn't advance jobIndex (worker can't do new jobs),
    // maxProfit still holds the best from previous jobs they can do
    totalProfit += maxProfit;
  }

  return totalProfit;
}

// Example usage and testing
const difficulty1 = [2, 4, 6, 8, 10];
const profit1 = [10, 20, 30, 40, 50];
const worker1 = [4, 5, 6, 7];
console.log("Example 1:", maxProfitAssignment(difficulty1, profit1, worker1)); // Expected: 100

const difficulty2 = [85, 47, 57];
const profit2 = [24, 66, 99];
const worker2 = [40, 25, 25];
console.log("Example 2:", maxProfitAssignment(difficulty2, profit2, worker2)); // Expected: 0
