const fs = require('fs');

/**
 * Check that string is a Palindrome or not;
 * @param {String} str
 * @returns {Boolean} is polindrome
 */
isPalindrome = str => {
    return str === str.split('').reverse().join('');
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
* @param {String} paths
*/
checkJson = path => {
    const fileContent = fs.readFileSync(path).toString();
    const json = JSON.parse(fileContent);

    const checks = {
        'flag': json => { return typeof json.flag !== 'boolean' ? json.flag : undefined },
        'myPromises': json => { return !Array.isArray(json.myPromises) ? json.myPromises : undefined },
        'element': json => { return typeof json.element !== 'object' ? json.element : undefined },
        'screenshot': json => { return typeof json.screenshot !== 'object' || json.screenshot !== null ? json.screenshot : undefined },
        'elementText': json => { return typeof json.elementText !== 'string' ? json.elementText : undefined },
        'allElementsText': json => { return typeof json.allElementsText !== 'string' || !json.allElementsText.includes('const') ? json.allElementsText : undefined },
        'counter': json => { return typeof json.counter !== 'number' || json.counter <= 10 ? json.counter : undefined },
        'config': json => { return typeof json.config !== 'string' || json.config.toLowerCase() !== 'common' ? json.config : undefined },
        'const': json => { return json.const !== 'FiRst' ? json.const : undefined },
        'parameters': json => { return !Array.isArray(json.parameters) || json.parameters.length !== 8 ? json.parameters : undefined },
        'description': json => { return typeof json.description !== 'string' || json.description.length <= 5 || json.description.length >= 13 ? json.description : undefined },
    };

    const props = Object.values(checks).map(check => check(json));

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