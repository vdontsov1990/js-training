const fs = require('fs');

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

/**
* Create a Function that will take a path to the .json file, 
* will read it and confirm that that json is satisfied to conditions:
* "flag" - boolean	
* "myPromises" - array	
* "element" - object	
* "screenshot" - null	
* "elementText" – string
* "allElementsText" - contain "const" in string
* "counter" - more than 10	
* "config" - equal "Common"	
* "const" - equal "FiRst" (case insensitive)
* "parameters" - array with length 8
* "description" - string with length more than 5 but less than 13
* If it satisfied show “OK” in console, if not, create new file with properties that not satisfied and reason why.
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
    if ( typeof json.screenshot !== 'object' || json.screenshot === null ) { props.screenshot = json.screenshot };

    // "elementText" – string
    if ( typeof json.elementText !== 'string' ) { props.elementText = json.elementText };

    // "allElementsText" - contain "const" in string
    if ( typeof json.allElementsText !== 'string' || !json.allElementsText.includes('const')) {
        props.allElementsText = json.allElementsText;
    };

    // "counter" - more than 10
    if ( typeof json.counter !== 'number' || json.counter <= 10 ) { props.counter = json.counter };

    // "config" - equal "Common"
    if ( typeof json.config !== 'string' || json.config.toLowerCase() !== 'common' ) { props.config = json.config };

    // "const" - equal "FiRst" (case insensitive
    if ( typeof json.const !== 'string' || json.const !== 'FiRst' ) { props.const = json.const };

    // "parameters" - array with length 8
    if ( Array.isArray(json.parameters) || json.parameters.length !== 8 ) { props.parameters = json.parameters };

    // "description" - string with length more than 5 but less than 13
    if ( typeof json.description === 'string' || json.description.length > 5 || json.description.length < 8 ) {
        props.description = json.description;
    };

    if (Object.keys(props).length === 0) {
        console.log('OK');
    } else {
        fs.writeFile('properties.json', JSON.stringify(json), err => {
            if (err) {
                return console.log(err);
            }
        }); 
    }
};

module.exports = {
    checkJson,
    isPalindrome,
    replaceChar,
}