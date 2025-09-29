function solution(queries) {
  const container = [];
  const results = [];

  const getNext = (value) => {
    const sortedContainer = [...container].sort((a, b) => a - b);
    for (let num of sortedContainer) {
      if (num > value) {
        return num.toString();
      }
    }
    return "";
  };

  queries.forEach((query) => {
    const [operation, value] = query;

    if (operation === "ADD") {
      container.push(parseInt(value));
      results.push("");
    } else if (operation === "EXISTS") {
      const exist = container.includes(parseInt(value));
      results.push(exist ? "true" : "false");
    } else if (operation === "REMOVE") {
      const index = container.indexOf(parseInt(value));
      if (index !== -1) {
        container.splice(index, 1);
        results.push("true");
      } else {
        results.push("false");
      }
    } else if (operation === "GET_NEXT") {
      results.push(getNext(parseInt(value)));
    }
  });

  return results;
}
// Example usage:
const queries = [
  ["ADD", "1"],
  ["ADD", "2"],
  ["ADD", "5"],
  ["ADD", "2"],
  ["EXISTS", "2"],
  ["EXISTS", "5"],
  ["EXISTS", "1"],
  ["EXISTS", "4"],
  ["EXISTS", "3"],
  ["EXISTS", "0"],
];

queries: [
  ["EXISTS", "0"],
  ["EXISTS", "10"],
  ["ADD", "2"],
  ["ADD", "3"],
  ["ADD", "9"],
  ["EXISTS", "3"],
  ["EXISTS", "4"],
  ["EXISTS", "9"],
  ["EXISTS", "10"],
  ["ADD", "10"],
  ["ADD", "0"],
  ["EXISTS", "0"],
  ["EXISTS", "1"],
  ["EXISTS", "2"],
  ["EXISTS", "3"],
  ["EXISTS", "4"],
  ["EXISTS", "9"],
  ["EXISTS", "10"],
  ["EXISTS", "11"],
];

queries: [
  ["ADD", "0"],
  ["ADD", "1"],
  ["ADD", "2"],
  ["ADD", "0"],
  ["EXISTS", "-1"],
  ["EXISTS", "0"],
  ["EXISTS", "1"],
  ["EXISTS", "2"],
  ["EXISTS", "3"],
];

queries: [
  ["ADD", "1"],
  ["ADD", "2"],
  ["ADD", "2"],
  ["ADD", "3"],
  ["EXISTS", "1"],
  ["EXISTS", "2"],
  ["EXISTS", "3"],
  ["REMOVE", "2"],
  ["REMOVE", "1"],
  ["EXISTS", "2"],
  ["EXISTS", "1"],
];

queries: [
  ["ADD", "2"],
  ["ADD", "3"],
  ["ADD", "9"],
  ["REMOVE", "10"],
  ["REMOVE", "5"],
  ["REMOVE", "5"],
  ["REMOVE", "9"],
  ["REMOVE", "2"],
  ["REMOVE", "2"],
  ["REMOVE", "9"],
  ["EXISTS", "10"],
  ["EXISTS", "2"],
  ["EXISTS", "3"],
  ["EXISTS", "9"],
  ["ADD", "10"],
  ["EXISTS", "10"],
];

queries: [
  ["ADD", "0"],
  ["ADD", "1"],
  ["ADD", "2"],
  ["REMOVE", "1"],
  ["ADD", "0"],
  ["ADD", "1"],
  ["ADD", "2"],
  ["ADD", "1"],
  ["REMOVE", "2"],
  ["EXISTS", "2"],
  ["REMOVE", "2"],
  ["EXISTS", "2"],
  ["REMOVE", "2"],
  ["REMOVE", "1"],
  ["EXISTS", "1"],
  ["REMOVE", "1"],
  ["EXISTS", "1"],
  ["REMOVE", "1"],
  ["EXISTS", "1"],
  ["REMOVE", "1"],
  ["REMOVE", "0"],
  ["EXISTS", "0"],
  ["REMOVE", "0"],
  ["EXISTS", "0"],
  ["REMOVE", "0"],
  ["ADD", "0"],
  ["EXISTS", "0"],
];

queries: [
  ["ADD", "1"],
  ["ADD", "2"],
  ["ADD", "2"],
  ["ADD", "4"],
  ["GET_NEXT", "1"],
  ["GET_NEXT", "2"],
  ["GET_NEXT", "3"],
  ["GET_NEXT", "4"],
  ["REMOVE", "2"],
  ["GET_NEXT", "1"],
  ["GET_NEXT", "2"],
  ["GET_NEXT", "3"],
  ["GET_NEXT", "4"],
];

queries: [
  ["ADD", "2"],
  ["ADD", "4"],
  ["ADD", "9"],
  ["GET_NEXT", "0"],
  ["GET_NEXT", "1"],
  ["GET_NEXT", "2"],
  ["GET_NEXT", "3"],
  ["GET_NEXT", "4"],
  ["GET_NEXT", "9"],
];

queries: [
  ["ADD", "0"],
  ["ADD", "1"],
  ["ADD", "1"],
  ["ADD", "11"],
  ["ADD", "22"],
  ["ADD", "3"],
  ["ADD", "5"],
  ["GET_NEXT", "0"],
  ["GET_NEXT", "1"],
  ["REMOVE", "1"],
  ["GET_NEXT", "1"],
  ["ADD", "0"],
  ["ADD", "1"],
  ["ADD", "2"],
  ["ADD", "1"],
  ["GET_NEXT", "1"],
  ["GET_NEXT", "2"],
  ["GET_NEXT", "3"],
  ["GET_NEXT", "5"],
];
