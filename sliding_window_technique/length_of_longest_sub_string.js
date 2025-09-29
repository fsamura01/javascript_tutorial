const lengthOfLongestSubstring = function (s) {
  let hash = {};
  let left = 0;
  let right = 0;
  let maxSubStr = "";

  while (right < s.length) {
    const char = s[right];

    if (char in hash && hash[char] >= left) {
      left = hash[char] + 1;
    }

    hash[char] = right;
    const curSubStr = s.slice(left, right + 1);

    if (maxSubStr.length < curSubStr.length) {
      maxSubStr = curSubStr;
    }

    right++;
  }

  return maxSubStr;
};

/*
const lengthOfLongestSubstring = function(s) {
    const hash = new Map();
    let left = 0;
    let right = 0;
    let maxSubString = "";
    
    while(right < s.length){
        
      let char = s[right];
      if(hash.has(char) && hash.get(char) >= left){
         left = hash.get(char) + 1
      }
      
      hash.set(char, right)
      let currentSubString = s.slice(left, right + 1);
      
      if(maxSubString.length < currentSubString.length){
         maxSubString = currentSubString
      }
      
      right++;
    }
    
    return maxSubString
};

const  s = "abcabcbb"
lengthOfLongestSubstring(s)
*/

/*
 const s = "abcabcbb"
 lengthOfLongestSubstring(s)
 const s = "bbbbb"
 lengthOfLongestSubstring(s)
 const s = "pwwkew"
 lengthOfLongestSubstring(s)
 const s = "bbbbb"
lengthOfLongestSubstring(s)
const s = "pwwkew"
 lengthOfLongestSubstring(s)
 const s = "a"
 lengthOfLongestSubstring(s)
 const s = "abba"
 lengthOfLongestSubstring(s)
*/

/*
function lengthOfLongestSubstring(s) {
    let charSet = new Set();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        // If we encounter a duplicate character, move the left pointer to the right
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        
        // Add the current character to the set
        charSet.add(s[right]);
        
        // Update maxLength if the current window is larger
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}
*/

/*
 var lengthOfLongestSubstring = function(s) {
   const dictionary = {};
   console.log(dictionary)
   let left = 0;
   let maxSubStr = "";
   
   for(let right = 0; right < s.length; right++){
       let char = s[right];
       
      while(dictionary.hasOwnProperty(char)){
        delete dictionary[char]
         left++
      }
      
      dictionary[char] = right
      const curSubStr = s.slice(left, right + 1);
      
      if(maxSubStr.length < curSubStr.length){
         maxSubStr = curSubStr;
      }
   }
   
   return maxSubStr
}

const  s = "abcabcbb"
lengthOfLongestSubstring(s);
*/
