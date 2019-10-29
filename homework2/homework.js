const Excel = require('exceljs');
const fs = require('fs');
const path = require('path');

/**
 * Convert object to array
 * @param {Object} object
 * @param {Number} propertyDepth Property depth
 * @param {Function} callback
 */
recursiveIteration = (object, propertyDepth, callback) => {
    propertyDepth += 1;
    for (let property in object) {
        if(object.hasOwnProperty(property)) {
            if (typeof object[property] === 'object') {
                callback(object[property], propertyDepth, property);
                recursiveIteration(object[property], propertyDepth, callback);
            } else {
                callback(object, propertyDepth, property);
            }
        }
    }
}

/**s
 * Create .xlsx file from input JSON files
 * @param pathToJsonFiles Path to folder with JSON files
 * @param outputFolder Path to folder where .xlsx file will be created
 * @param outputFileName Output file name
 * @param sheetName Sheet name
 */
convertJsonsToXlsx = (pathToJsonFiles, outputFolder, outputFileName = 'result.xlsx', sheetName = 'Sheet1') => {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    fs.readdirSync(pathToJsonFiles).forEach(file => {
        const jsonContent = fs.readFileSync(path.join(pathToJsonFiles, file)).toString();
        recursiveIteration(JSON.parse(jsonContent), 0, (object, propertyDepth, property) => {
            const props = [];
            props[propertyDepth] = property;
            props[propertyDepth + 1] = object[property];
            worksheet.addRow(props);
        });
    });

    workbook.xlsx.writeFile(path.join(outputFolder, outputFileName));
};

module.exports = {
    convertJsonsToXlsx,
};