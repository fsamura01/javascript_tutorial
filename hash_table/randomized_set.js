/**
 * RandomizedSet Class Implementation
 * - Uses a Map to store value -> index mapping for O(1) lookups
 * - Uses an Array to store values for O(1) random access
 * - Achieves O(1) removal by swapping with last element
 */
var RandomizedSet = function () {
  // Map to store value -> index mapping
  this.valueToIndex = new Map();
  // Array to store actual values
  this.values = [];
};

/**
 * Inserts a value into the set
 * Time Complexity: O(1)
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  // If value already exists, return false
  if (this.valueToIndex.has(val)) {
    return false;
  }

  // Add value to array and store its index in map
  this.valueToIndex.set(val, this.values.length);
  this.values.push(val);
  return true;
};

/**
 * Removes a value from the set
 * Time Complexity: O(1)
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
  // If value doesn't exist, return false
  if (!this.valueToIndex.has(val)) {
    return false;
  }

  // Get index of value to remove
  const index = this.valueToIndex.get(val);
  const lastVal = this.values[this.values.length - 1];

  // Move last element to index of element to remove
  this.values[index] = lastVal;
  this.valueToIndex.set(lastVal, index);

  // Remove last element and delete from map
  this.values.pop();
  this.valueToIndex.delete(val);
  return true;
};

/**
 * Returns a random element from the set
 * Time Complexity: O(1)
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  // Generate random index and return value at that index
  const randomIndex = Math.floor(Math.random() * this.values.length);
  return this.values[randomIndex];
};
