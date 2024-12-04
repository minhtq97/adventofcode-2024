const fs = require('fs');
const path = require('path');

var leftColumns = [];
var rightColumns = [];

function loadTextFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error("File not found:", filePath);
        return;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');

    const separatedColumns = separateColumns(fileContent);
    leftColumns = separatedColumns.leftColumn;
    rightColumns = separatedColumns.rightColumn;

    const diff = calculateDiff(leftColumns, rightColumns);
    console.log(diff);

    const summarityScore = calculateSimilarityScore(leftColumns, rightColumns);
    console.log(summarityScore);
}

function separateColumns(input) {
    const rows = input.trim().split('\n');
    const leftColumn = [];
    const rightColumn = [];

    rows.forEach(row => {
        const [left, right] = row.trim().split(/\s+/);
        leftColumn.push(parseInt(left, 10));
        rightColumn.push(parseInt(right, 10));
    });
    return { leftColumn, rightColumn };
}

function calculateDiff(left, right) {
    const sortLeft = left.sort((a, b) => a - b);
    const sortRight = right.sort((a, b) => a - b);
    let diff = 0;
    for (let i = 0; i < sortLeft.length; i++) {
        diff += Math.abs(sortLeft[i] - sortRight[i])
    }

    return diff;
}

function calculateSimilarityScore(left, right) {
    const sortLeft = [...new Set(left.sort((a, b) => a - b))];
    const sortRight = right.sort((a, b) => a - b);
    let score = 0;
    let j = 0;
    let endIndex = 0;
    while (j < sortLeft.length - 1) {
        let count = 0;
        for (let i = 0; i < sortRight.length; i++) {
            if (sortRight[i] === sortLeft[j]) {
                count++;
                score += sortLeft[j];
                endIndex = i;
            }
        }
        
        sortRight.splice(endIndex - count, count);
        j++;
    }
    return score;
}

const filePath = path.join(__dirname, 'data.txt');
loadTextFile(filePath);





