function solution(line) {
  var atLeastOneDigit = false;

  if (line[line.length - 1] === "#") {
    // Case: Base-representation integer
    var i = 0;
    var base = 0;

    // Extract the base value
    while (i < line.length && line[i] !== "#") {
      if (line[i] !== "_") {
        base += line[i];
      }
      i++;
    }

    if (base < 2 || base > 16) {
      return false;
    }
    i++; // Move past the '#'

    // Check digits within the base representation
    while (i < line.length - 1) {
      if (line[i] !== "_") {
        var digit = -1;
        if ("a" <= line[i] && line[i] <= "f") {
          digit = line.charCodeAt(i) - "a".charCodeAt(0) + 10;
        }
        if ("A" <= line[i] && line[i] <= "F") {
          digit = line.charCodeAt(i) - "A".charCodeAt(0) + 10;
        }
        if ("0" <= line[i] && line[i] <= "9") {
          digit = line.charCodeAt(i) - "0".charCodeAt(0);
        }
        if (0 <= digit && digit < base) {
          atLeastOneDigit = true;
        } else {
          return false;
        }
      }
      i++;
    }
  } else {
    // Case: Simple decimal integer
    for (var i = 0; i < line.length; i++) {
      if (line[i] !== "_") {
        if ("0" <= line[i] && line[i] <= "9") {
          atLeastOneDigit = true;
        } else {
          return false;
        }
      }
    }
  }
  return atLeastOneDigit;
}

// Example usage:
console.log(solution("123_456_789")); // true
console.log(solution("16#123abc#")); // true
console.log(solution("10#123abc#")); // false
console.log(solution("10#10#123ABC#")); // false
console.log(solution("10#0#")); // true
console.log(solution("10##")); // false
