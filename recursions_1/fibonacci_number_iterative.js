const fib = (n) => {
  if (n === 0) return 0;
  if (n === 1) return 1;

  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
};
fib(2);

let n1 = 0,
  n2 = 1,
  nextTerm;
for (let i = 1; i <= 10; i++) {
  console.log(n1);
  nextTerm = n1 + n2;
  n1 = n2;
  n2 = nextTerm;
}
