/**
 * Create a function that will take a String value in parameters and return
 * message that will say is that string a Palindrome or not;
 * @param {String} str
 * @returns {Boolean} is polindrome
 */
isPalindrome = str => {
    str = str.toLowerCase();
    const lenth = str.length

    for (let i = 0; i < lenth / 2; i++) {
      if (str[i] !== str[lenth - 1 - i]) {
        return false
      }
    }
    return true
};


/**
 * Create a function that will take a String value as first parameter, 
 * Number value as second and String value as third. 
 * First parameter should be a sentence or set of sentences, second parameter 
 * should be a number of letter in each word in the sentence 
 * that should be replaced by the third parameter. That function should return updated sentence.
 * @param {String} input
 * @param {Number} letterNumber 
 * @param {String} newChars
 * @returns {String} string with replaced chars
 */
replaceChar = (inputStr, letterNumber, newChars) => {
    letterNumber -= 1;
    return inputStr.split(' ').map( word => {
        return word.length > letterNumber
            ? word.substr(0, letterNumber) + newChars + word.substr(letterNumber + 1)
            : word;
    }).join(' ');
};


module.exports = {
    isPalindrome,
    replaceChar,
}