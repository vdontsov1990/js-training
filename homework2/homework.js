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
recursiveIteration = (object, depth, callback) => {
    depth += 1;
    for (let property in object) {
        if(object.hasOwnProperty(property)) {
            const value = object[property];
            callback(property, value, depth);
            if (typeof value === 'object') { recursiveIteration(value, depth, callback); }
        }
    }
}

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
        recursiveIteration(JSON.parse(jsonContent), 0, (property, value, depth) => {
            const props = [];
            props[depth] = property;
            props[depth + 1] = value;
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

    const currentFiles = fs.readdirSync(inputFolder).map(file => {
        return {
            'filename': file,
            'content': fs.readFileSync(path.join(inputFolder, file)).toString()
        }
    });

    const events = [];

    fs.watch(inputFolder, (event, filename) => {
        if (filename.includes('.csv')) {

            const changes = {
                'event': event,
                'filename': filename
            };

            console.log(events)


            switch(event) {
                case 'change':
                    const file = currentFiles.find(file => file.filename === filename);
                    if (file) {
                        const updatedContent = fs.readFileSync(path.join(inputFolder, filename)).toString();
                        const differences = diff(file.content, updatedContent);
                        changes.actions = new Array();

                        const regExp = /(\r\n|\n|\r)/gm;
                        for (let difference of differences) {
                            switch(difference[0]) {
                                case -1:
                                    changes.actions.push( {'delete': difference[1].replace(regExp, '')} );
                                    break;
                                case 1:
                                    changes.actions.push( {'add': difference[1].replace(regExp, '')} );
                                    break;
                            } 
                        }

                        currentFiles[currentFiles.findIndex(file => file.filename === filename)].content = updatedContent;
                    } else {
                        const currentFileNames = currentFiles.map(state => state.filename);
                        const updatedFileNames = fs.readdirSync(inputFolder);
                        const difference = currentFileNames.filter(x => !updatedFileNames.includes(x))[0];
                        
                        changes.actions = 'rename';
                        changes.filename = difference;
                        changes.new_filename = filename;
                        currentFiles[currentFiles.findIndex(file => file.filename === difference)].filename = filename;
                    };
                    
                    events.push(changes);
                    break;

                case 'rename':
                    const currentFileNames = currentFiles.map(state => state.filename);
                    const updatedFileNames = fs.readdirSync(inputFolder);

                    if (currentFileNames.length > updatedFileNames.length) {
                        changes.actions = 'delete file';
                        const index = currentFiles.findIndex(file => file.filename === filename);
                        currentFileNames.splice(index, 0);
                    } else {
                        changes.actions = 'create file';

                        currentFiles.push({
                            'filename': filename,
                            'content': fs.readFileSync(path.join(inputFolder, filename)).toString()
                        });
                    };

                    events.push(changes);
                    break;
            }

            fs.writeFile(outputFile, JSON.stringify(events), error => {
                if (error) {
                    return console.log(error);
                }
            }); 
        }
    });
};

module.exports = {
    convertJsonsToXlsx,
    watchToChangesInFolder,
};