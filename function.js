const x = 2;
let y = 4;
function update(arg) {
  return Math.random() + y * arg;
}
y = 2;
y = (6 - Math.random()) / x;
const result = update(x);
