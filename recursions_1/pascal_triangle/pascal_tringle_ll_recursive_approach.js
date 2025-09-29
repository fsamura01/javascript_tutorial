const getRow = (rowIndex) => {
  // base case
  if (rowIndex === 0) {
    return [1];
  }

  // recursive case
  const prevRow = getRow(rowIndex - 1);

  const newRow = [];
  newRow.push(1);

  for (let i = 1; i < rowIndex; i++) {
    newRow.push(prevRow[i - 1] + prevRow[i]);
  }

  newRow.push(1);

  return newRow;
};

const rowIndex = 3;
getRow(rowIndex);
