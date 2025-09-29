var kthGrammar = function (n, k) {
  if (n === 1) return 0;

  const prevSymbol = kthGrammar(n - 1, Math.ceil(k / 2));
  if (k % 2 === 1) {
    return prevSymbol;
  } else {
    return prevSymbol === 0 ? 1 : 0;
  }
};

const n = 3,
  k = 2;

/* const n = 2,
  k = 1; */
/* const n = 2,
  k = 2; */
kthGrammar(n, k);
