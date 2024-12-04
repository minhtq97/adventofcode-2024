const fs = require('fs');
const path = require('path');

const NEGATIVE_LIST = new Map([[-3, -3], [-2, -2], [-1, -1]])
const POSITIVE_LIST = new Map([[3, 3], [2, 2], [1, 1]])

function loadTextFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error("File not found:", filePath);
        return;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');

    const rows = separateColumns(fileContent);
    const result = checkSafe(rows)
    const resultWhenRemoveOne = checkSafeByRemoveOneLevel(rows);


    console.log('part 1 ', result)
    console.log('part 2', resultWhenRemoveOne)

}

function separateColumns(input) {
    const rows = input.trim().split('\n');;

    rows.forEach((row, index) => {
        const rowArray = row.trim().split(/\s+/).map(n => Number(n));
        rows.splice(index, 1, rowArray)
    });
    return rows;
}

function checkSafe(rows) {

    let count = 0;
    for (let i = 0; i < rows.length; i++) {
        let desc = false;

        if (rows[i][1] - rows[i][0] < 0) {
            desc = true;
        }
        for (let j = 0; j < rows[i].length - 1; j++) {
            let value = rows[i][j + 1] - rows[i][j];
            if (desc) {
                if (!NEGATIVE_LIST.has(value)) {
                    count++;
                    break;
                }
            } else {
                if (!POSITIVE_LIST.has(value)) {
                    count++;
                    break;
                }
            }
        }
    }

    return rows.length - count;
}

function checkSafeByRemoveOneLevel(rows) {
    let safe = 0;

    for (let i = 0; i < rows.length; i++) {
        if (isSafe(rows[i])) {
            safe++;
        } else {
            for (let j = 0; j < rows[i].length; j++) {
                const dampened = [...rows[i]];
                dampened.splice(j, 1);
                if (isSafe(dampened)) {
                    safe++;
                    break;
                }
            }
        }
    }


    return safe;
}

const Direction = {
    NotEstablished: "NotEstablished",
    Down: "Down",
    Up: "Up",
};

// Safety Check Function
const isSafe = (layers) => {
    let m = 0;

    for (let i = 1; i < layers.length; i++) {
        const curr = layers[i];
        const prev = layers[i - 1];
        const diff = Math.abs(curr - prev);

        if (diff < 1 || diff > 3) {
            m = 0;
            break;
        }

        if ((m > 0 && curr < prev) || (m < 0 && curr > prev)) {
            m = 0;
            break;
        }

        if (m === 0) {
            m = prev < curr ? 1 : -1;
        }
    }

    return !!m;
};

const filePath = path.join(__dirname, 'data.txt');
loadTextFile(filePath)