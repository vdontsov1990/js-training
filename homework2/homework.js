var diff = require('fast-diff');
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
            };
        };
    };
};

/**s
 * Create .xlsx file from input JSON files
 * @param {String} pathToJsonFiles Path to folder with JSON files
 * @param {String} outputFolder Path to folder where .xlsx file will be created
 * @param {String} outputFileName Output file name
 * @param {String} sheetName Sheet name
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

/**
 * @param {String} inputFolder Path to input folde
 * @param {String} outputFile Path to output JSON file
 */
watchToChangesInFolder = (inputFolder, outputFile) => {

    // Get current filenames and content
    getFiles = () => {
        return fs.readdirSync(inputFolder).map(file => {
            return {
                'filename': file,
                'content': fs.readFileSync(path.join(inputFolder, file)).toString()
            }
        });
    };

    let currentFiles = getFiles();
    const events = [];

    fs.watch(inputFolder, (event, filename) => {
        if (filename.endsWith('.csv')) {

            const changes = {
                'event': event,
                'filename': filename
            };

            switch(event) {
                case 'change':
                    const file = currentFiles.find(file => file.filename === filename);
                    const updatedContent = fs.readFileSync(path.join(inputFolder, filename)).toString();
                    const updates = diff(file.content, updatedContent);
                    changes.actions = new Array();

                    const regExp = /(\r\n|\n|\r)/gm;
                    for (let update of updates) {
                        switch(update[0]) {
                            case -1:
                                changes.actions.push( {'delete': update[1].replace(regExp, '')} );
                                break;
                            case 1:
                                changes.actions.push( {'add': update[1].replace(regExp, '')} );
                                break;
                        };
                    };

                    if (!changes.actions.length) { changes.actions = 'save' };
                    currentFiles = getFiles();
                    events.push(changes);
                    break;

                case 'rename':
                    const currentFileNames = currentFiles.map(state => state.filename);
                    const updatedFileNames = fs.readdirSync(inputFolder);

                    switch(true) {
                        case currentFileNames.length > updatedFileNames.length:
                            changes.actions = 'delete file';
                            break;
                        case currentFileNames.length < updatedFileNames.length:
                            changes.actions = 'create file';
                            break;
                        case currentFileNames.length === updatedFileNames.length:
                            const newFilename = updatedFileNames.filter(name => !currentFileNames.includes(name))[0];                        
                            changes.actions = 'rename';
                            changes.new_filename = newFilename;
                            break;
                    };

                    currentFiles = getFiles();
                    events.push(changes);
                    break;
            };

            fs.writeFileSync(outputFile, JSON.stringify(events), error => {
                if (error) {
                    return console.log(error);
                };
            }); 
        };
    });
};

watchToChangesInFolder('/Users/vdontsov/code/js-training/homework2/csv', '/Users/vdontsov/code/js-training/homework2/result.json')

module.exports = {
    convertJsonsToXlsx,
    watchToChangesInFolder,
};