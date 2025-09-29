
var applyOperations = function(nums) {
    let n = nums.length;

    // Step 1: Apply the operation to double values and set second to zero
    for (let i = 0; i < n - 1; i++) {
        if (nums[i] === nums[i + 1]) {
            nums[i] *= 2;
            nums[i + 1] = 0;
        }
    }

    // Step 2: Move non-zero values forward
    let j = 0; // Position for the next nonzero element
    for (let i = 0; i < n; i++) {
        if (nums[i] !== 0) {
            nums[j++] = nums[i]; // Place nonzero number at position j and increment j
        }
    }

    // Fill remaining elements with 0
    while (j < n) {
        nums[j++] = 0;
    }

    return nums;
};

var applyOperations = function (nums) {
    let n = nums.length;
    let result = new Array(n).fill(0);
    let idx = 0;

    // Apply operation
    for (let i = 0; i < n - 1; i++) {
        if (nums[i] === nums[i + 1]) {
            nums[i] *= 2;
            nums[i + 1] = 0;
        }
    }

    // Store nonzero elements in result array
    for (let num of nums) {
        if (num !== 0) {
            result[idx++] = num;
        }
    }

    return result;
};
