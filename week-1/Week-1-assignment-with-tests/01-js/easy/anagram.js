/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.

  Once you've implemented the logic, test your code by running
  - `npm run test-anagram`
*/

function isAnagram(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  let frequency = {};
  for (let index = 0; index < str1.length; index++) {
    if (frequency.hasOwnProperty(str1[index])) {
      frequency[str1[index]]++;
    } else {
      frequency[str1[index]] = 1;
    }
  }

  for (let index = 0; index < str2.length; index++) {
    if (frequency.hasOwnProperty(str2[index])) {
      frequency[str2[index]]--;
    } else {
      return false;
    }
  }

  for (const alphabet in frequency) {
    if (frequency[alphabet] !== 0) {
      return false;
    }
  }
  return true;
}

console.log(isAnagram("abc", "def"));

module.exports = isAnagram;
