/*----------------------------------------------------------------*/

/**
 * A container of integers that should support
 * addition, removal, and search for the median integer
 */
class Container {
  constructor() {
    this.container = [];
  }

  /**
   * Adds the specified value to the container
   *
   * @param {number} value
   */
  add(value) {
    // TODO: implement this method
    this.container.push(value);
  }

  /**
   * Attempts to delete one item of the specified value from the container
   *
   * @param {number} value
   * @return {boolean} true, if the value has been deleted, or
   *                   false, otherwise.
   */
  delete(value) {
    // TODO: implement this method
    const index = this.container.indexOf(value);
    if (index !== -1) {
      this.container.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Finds the container's median integer value, which is
   * the middle integer when the all integers are sorted in order.
   * If the sorted array has an even length,
   * the leftmost integer between the two middle
   * integers should be considered as the median.
   *
   * @return {number} the median if the array is not empty, or
   * @throws {Error} a runtime exception, otherwise.
   */
  getMedian() {
    // TODO: implement this method
    if (this.container.length === 0) {
      throw new error("Container is empty");
    }
    const n = this.container.length;
    const sortedContainer = [...this.container].sort((a, b) => a - b);
    const mid = Math.floor((n - 1) / 2);

    return sortedContainer[mid];
  }
}

module.exports = Container;
