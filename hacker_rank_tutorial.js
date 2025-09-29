// ! plusMinus
/* function plusMinus(arr) {
  // initialize varible to count positive, negative, and zero
  let positiveCount = 0;
  let negativeCount = 0;
  let zeroCount = 0;

  for (let number of arr) {
    if (number > 0) {
      positiveCount++;
    } else if (number < 0) {
      negativeCount++;
    } else {
      zeroCount++;
    }
  }
  
  const totalElements = arr.length
  const positiveRatio = positiveCount / totalElements;
  const negativeRatio = negativeCount / totalElements;
  const zeroRatio = zeroCount / totalElements;

  console.log(positiveRatio.toFixed(6).toString());
  console.log(negativeRatio.toFixed(6).toString());
  console.log(zeroRatio.toFixed(6).toString());
}

// Example usage:
const arrayExample = [1, -1, 0, 2, -2];
plusMinus(arrayExample); */

// ! minMaxSum
/* function minMaxSum(arr) {
  console.log(arr);
  arr.sort((a, b) => a - b);
  console.log(arr);
  const totalElement = arr.reduce((acc, number) => acc + number, 0);
  console.log(totalElement);

  const minSum = totalElement - arr[arr.length - 1];
  const maxSum = totalElement - arr[0];

  console.log(`${minSum} ${maxSum}`);
}

const arrayExample = [1, 3, 6, 8, 4];
minMaxSum(arrayExample) */

// ! consectiveOne
/* function consetiveOne(arr) {
  // initialize two variable to store the one in a squence and max consective one encouter
  let maxCount = 0;
  let currentCount = 0;
  // iterate throunght each element in the arry to check base on whether current element is a 1 0r 0
  for (let number of arr) {
    if (number === 1) {
      currentCount++;
      maxCount = Math.max(maxCount, currentCount)
    } else {
      currentCount = 0
    }
  }
  return maxCount
}
const arrayExample = [1, 1, 0, 1, 1, 1];
consetiveOne(arrayExample)
console.log("🚀 ~ consetiveOne(arrayExample):", consetiveOne(arrayExample))
 */

// ! Event Digit
/* function evenDigit(arr) {
  let count = 0;
  for (let number of arr) {
    const convertString = number.toString()
    if (convertString.length % 2 === 0) {
      console.log("🚀 ~ evenDigit ~ number.length:", number.length);
      count++;
    }
   }
    return count
}
const arrryExample = [22, 234, 12345, 1234, 123456, 1235678, 12345678]
evenDigit(arrryExample);
console.log("🚀 ~ evenDigit(arrryExample):", evenDigit(arrryExample))
 */

// ! Square Element
/* const squareElement = (arr) => {
  console.log("🚀 ~ squareElement ~ arr:", arr)
  let square = [];

  for (let number of arr) {
    square.push(number * number);
  }

  square

  return square;
}

const arrryExample = [1, 3, 2, 5, 4];
squareElement(arrryExample);
console.log("🚀 ~ squareElement(arrryExample):", squareElement(arrryExample))
 */

// ! Matchin String
/* const matchinString = (strs, qurs) => {
  const stringFrequency = {};

  for (let str of strs) {
    stringFrequency[str] = (stringFrequency[str] || 0) + 1
    // if (stringFrequency[str]) {
    //   stringFrequency[str]++;
    // } else {
    //   stringFrequency[str] = 1;
    // }
  }

  const result = [];
  for (let que of qurs) {
    if (stringFrequency[que]) {
   result.push(stringFrequency[que])
    } else {
      result.push(0);
 }
  }
  return result;
  
}
let strings = ["ab", "ab", "abc"];
let queries = ['ab', 'abc', 'bc'];

matchinString(strings, queries);
console.log("🚀 ~ matchinString(strings, queries):", matchinString(strings, queries)) */

// ! diagonalDifference

/* const diagonalDifference = (arr) => {
  // initialize two variable to store the sum of of the diagonal
  let primaryDiagonalSum = 0;
  let secondaryDiagonalSum = 0;

  // iterate through each element in the matrix array

  for (let i = 0; i < arr.length; i++) {
    primaryDiagonalSum += arr[i][i];
    secondaryDiagonalSum += arr[i][arr.length - 1 - i]
  }

  const absoluteDifference = Math.abs(primaryDiagonalSum - secondaryDiagonalSum);
  return absoluteDifference;
};

let arrayExample = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
diagonalDifference(arrayExample); */
