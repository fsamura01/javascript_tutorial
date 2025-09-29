const getRow = (rowIndex) => {
  let result = [1];

  for (let i = 1; i <= rowIndex; i++) {
    const newRow = [];
    newRow.push(1);

    for (let j = 1; j < i; j++) {
      newRow.push(result[j - 1] + result[j]);
    }
    newRow.push(1);

    result = newRow;
  }

  return result;
};

const rowIindex = 3;

console.log(getRow(rowIindex));
