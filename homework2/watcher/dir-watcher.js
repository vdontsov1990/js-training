const diff = require('fast-diff');
const fs = require('fs');
const path = require('path');

/**
 * @param {String} inputFolder Path to input folde
 * @param {String} outputFile Path to output JSON file
 */
watchToChangesInDir = (inputFolder, outputFile) => {

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

module.exports = {
    watchToChangesInDir
}