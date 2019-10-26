const fs = require('fs');

/**
 * Check that string is a Palindrome or not;
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
 * Replace letter to char sequence in each word of string
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

/**
* Check input JSON
* @param {String} path
*/
checkJson = path => {
    const fileContent = fs.readFileSync(path).toString();
    const json = JSON.parse(fileContent);

    const props = [];
    // "flag" - boolean
    if ( typeof json.flag !== 'boolean' ) { props.flag = json.flag };
    
    // "myPromises" - array
    if ( !Array.isArray(json.myPromises) ) { props.myPromises = json.myPromises };

    // "element" - object
    if ( typeof json.element !== 'object' ) { props.element = json.element };

    // "screenshot" - null
    if ( typeof json.screenshot !== 'object' || json.screenshot !== null ) { props.screenshot = json.screenshot };

    // "elementText" – string
    if ( typeof json.elementText !== 'string' ) { props.elementText = json.elementText };

    // "allElementsText" - contain "const" in string
    if ( typeof json.allElementsText !== 'string' || !json.allElementsText.includes('const')) {
        props.allElementsText = json.allElementsText;
    };

    // "counter" - more than 10
    if ( typeof json.counter !== 'number' || json.counter <= 10 ) { props.counter = json.counter };

    // "config" - equal "Common"
    if ( typeof json.config !== 'string' || !json.config.toLowerCase() !== 'common' ) { props.config = json.config };

    // "const" - equal "FiRst" (case insensitive)
    if ( json.const !== 'FiRst' ) { props.const = json.const };

    // "parameters" - array with length 8
    if ( !Array.isArray(json.parameters) || json.parameters.length !== 8 ) { props.parameters = json.parameters };

    // "description" - string with length more than 5 but less than 13
    if ( typeof json.description !== 'string' || json.description.length <= 5 || json.description.length >= 13 ) {
        props.description = json.description;
    };

    if (Object.keys(props).length === 0) {
        console.log('OK');
    } else {
        fs.writeFile('properties.json', JSON.stringify(json), error => {
            if (error) {
                return console.log(error);
            }
        }); 
    }
};

module.exports = {
    checkJson,
    isPalindrome,
    replaceChar,
}