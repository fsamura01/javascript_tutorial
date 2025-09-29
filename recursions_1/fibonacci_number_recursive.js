function fibonacci(n) {
  const memo = [];

  function fib(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;

    if (memo[n] !== undefined) {
      return memo[n];
    }

    memo[n] = fib(n - 1) + fib(n - 2);
    return memo[n];
  }

  return fib(n);
}

fibonacci(3);
