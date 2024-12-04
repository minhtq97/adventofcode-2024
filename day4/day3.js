const fs = require('fs');
const path = require('path');

function loadTextFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error("File not found:", filePath);
        return;
    }

    const str = fs.readFileSync(filePath, 'utf8');

    findMultiple(str);

    findMultipleWithEnableCondition(str);
}

const filePath = path.join(__dirname,'data.txt');
loadTextFile(filePath)
