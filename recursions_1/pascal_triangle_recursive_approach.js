function getRow(rowIndex) {
  // Base case: if rowIndex is 0, return [1]
  if (rowIndex === 0) {
    return [1];
  }

  // Recursive call to get the previous row
  const prevRow = getRow(rowIndex - 1);

  // Calculate the current row based on the previous row
  const row = [1];
  for (let i = 1; i < prevRow.length; i++) {
    row.push(prevRow[i - 1] + prevRow[i]);
  }
  row.push(1); // Add the last element

  return row;
}

const rowIndex = 3;
getRow(rowIndex);
