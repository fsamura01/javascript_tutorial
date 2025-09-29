/**
 * @param {string} sentence
 * @param {string} searchWord
 * @return {number}
 */
var isPrefixOfWord = function (sentence, searchWord) {
  const words = sentence.split(" ");

  for (let i = 0; i < words.length; i++) {
    const currentWord = words[i];
    if (currentWord.substring(0, searchWord.length) === searchWord) {
      return i + 1;
    }
  }

  return -1;
};

isPrefixOfWord("i love eating burger", "burg");
isPrefixOfWord("this problem is an easy problem", "pro");
isPrefixOfWord("i am tired", "you");
isPrefixOfWord("i use triple pillow", "pill");
isPrefixOfWord("hello from the other side", "they");
