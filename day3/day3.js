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

function findMultiple(str) {
    const regex = /mul\((\d+),(\d+)\)/g;
    let results = 0;
    let match;

    while ((match = regex.exec(str)) !== null) {
        results += Number(match[1]) * Number(match[2])
    }
    console.log(results)
}

function findMultipleWithEnableCondition(str) {
    const regex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;
    let results = 0;
    let isDo = true;
    const matchList = [...str.matchAll(regex)].map(s => s[0]);

    for (const el of matchList) {
        if (el === 'do()') isDo = true;
        if (el === `don't()`) isDo = false;

        if (isDo && el.indexOf('mul') > -1) {
            const [x, y] = el.slice(4, -1).split(",").map(Number);
            results += x * y;
        }
    }

    console.log(results)
}



const filePath = path.join(__dirname, 'data.txt');
loadTextFile(filePath)