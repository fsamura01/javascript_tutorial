function audienceOverlap(blog1, blog2) {
  // implement this
  const audienceOverlap = new Set(blog1);
  return blog2.some((blog) => audienceOverlap.has(blog));
}

let blog1 = [1, 2, 3, 4, 5];
let blog2 = [6, 7, 8, 9, 10];

if (audienceOverlap(blog1, blog2))
  console.log("Yes, there is an audience overlap between both blogs.");
else console.log("No, there is no audience overlap between both blogs.");
