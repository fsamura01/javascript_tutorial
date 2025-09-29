function getRow(rowIndex) {
  // Initialize the result array with the first row [1]
  let result = [1];

  // Loop from 1 to rowIndex to generate each row
  for (let i = 1; i <= rowIndex; i++) {
    // Create a new array for the current row
    const newRow = [];

    // Set the first element of the row to 1
    newRow.push(1);

    // Generate the middle elements of the row using the previous row
    for (let j = 1; j < i; j++) {
      newRow.push(result[j - 1] + result[j]);
    }

    // Set the last element of the row to 1
    newRow.push(1);

    // Update the result array with the new row
    result = newRow;
  }

  return result;
}

const rowIndex = 3;
getRow(rowIndex);
