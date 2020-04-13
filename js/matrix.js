//operations with matrix

var matrixSizeX = 32;
var matrixSizeY = 32;
var startPercent = 50;

var chosenX = matrixSizeX+1;
var chosenY = matrixSizeY+1;

var matrix = new Array(matrixSizeX).fill(0).map(() => new Array(matrixSizeY).fill(0));
var newMatrix = [];

const negColor = "#fe5f55";
const posColor = "#6ace96";
const negChosenColor = "#E63A2E";
const posChosenColor = "#2E9A5D";
const strokeColor = "#585b64";
const chosenColor = "#fff";
const cellSize = 12;

testMatrix = [
    [1,0,0,1,1,0,1,0,1,0],
    [1,1,0,0,1,0,0,1,1,0],
    [0,0,1,1,1,1,0,1,0,1],
    [1,1,1,1,1,0,1,0,1,1],
    [0,1,0,1,1,0,0,0,1,0],
    [1,0,1,0,0,1,1,1,0,1],
    [0,1,1,1,0,1,0,0,0,0],
    [1,0,0,1,1,0,0,0,1,0],
    [0,0,1,1,1,1,1,1,1,0],
    [1,1,1,0,0,1,0,1,0,1]
]

function updateMatrix() {
    chosenX = Math.floor(Math.random() * Math.floor(matrixSizeX));
    chosenY = Math.floor(Math.random() * Math.floor(matrixSizeY));

    if (getVal(chosenX, chosenY) == getVal(chosenX, chosenY+1)) {
        //influece
        val = getVal(chosenX, chosenY);
        setVal(chosenX-1, chosenY, val);
        setVal(chosenX-1, chosenY+1, val);
        setVal(chosenX, chosenY-1, val);
        setVal(chosenX, chosenY+2, val);
        setVal(chosenX+1, chosenY, val);
        setVal(chosenX+1, chosenY+1, val);
    }
}

function getVal(i, j){
    if (i < 0) tmp_i = matrixSizeX - 1;
    else if (i > matrixSizeX - 1 ) tmp_i = 0;
    else tmp_i = i;

    if (j < 0) tmp_j = matrixSizeY - 1;
    else if (j > matrixSizeY - 1 ) tmp_j = 0;
    else tmp_j = j;

    return matrix[tmp_i][tmp_j];
}

function setVal(i, j, val){
    if (i < 0) tmp_i = matrixSizeX - 1;
    else if (i > matrixSizeX - 1 ) tmp_i = i % (matrixSizeX);
    else tmp_i = i;

    if (j < 0) tmp_j = matrixSizeY - 1;
    else if (j > matrixSizeY - 1 ) tmp_j = j % (matrixSizeY);
    else tmp_j = j;

    console.log("values are", tmp_i, tmp_j);

    matrix[tmp_i][tmp_j] = val;
}

function initMatrix() {
    matrix = new Array(matrixSizeX).fill(0).map(() => new Array(matrixSizeY).fill(0));
    for (var i = 0; i < matrixSizeX; ++i) {
        for (var j = 0; j < matrixSizeY; ++j) {
            matrix[i][j] = Math.random() < startPercent / 100.0 ? 1 : 0;
        }
    }
}

function paintMatrix() {
    const drawBoard = (ctx, step) => {
        for (var i = 0; i < matrixSizeX; ++i) {
            for (var j = 0; j < matrixSizeY; ++j) {
                var pCol, nCol, sCol;
                if (i == chosenX
                    && (
                        (j == chosenY || j == chosenY + 1)
                        ||
                        (chosenY == matrixSizeY - 1 && j == 0))
                ) {
                    pCol = posChosenColor;
                    nCol = negChosenColor;
                    sCol = chosenColor;
                } else {
                    pCol = posColor;
                    nCol = negColor;
                    sCol = strokeColor;
                }

                ctx.fillStyle = (matrix[i][j] == 1) ? pCol : nCol;
                ctx.fillRect(j * step, i * step, step, step);

                ctx.beginPath();
                ctx.strokeStyle = sCol;
                ctx.strokeRect(j * step, i * step, step, step);
                ctx.closePath();
    	    }
        }
    };
    const c = document.getElementById('matrix');

    c.height = cellSize * matrixSizeX;
    c.width = cellSize * matrixSizeY;
    const ctx = c.getContext("2d");

    drawBoard(ctx, cellSize);
}

function sumMatrix() {
    return matrix.reduce(function (a, b) { return a.concat(b) })
        .reduce(function (a, b) { return a + b });
}

//proportions matrix to window size
divideX = 15;
divideY = 32;

function setMatrixSize() {
    matrixSizeX = Number(document.getElementById("matrixW").value);
    matrixSizeY = Number(document.getElementById("matrixH").value);
    maxX = Math.floor(window.innerHeight / divideX);
    maxY = Math.floor(window.innerWidth / divideY);

    if (matrixSizeX < 10){
        console.log("Za mała wartość parametru W!");
        matrixSizeX = 10;
        document.getElementById("matrixW").value = matrixSizeX;
    }
    
    if (matrixSizeX > maxX){
        console.log("Za duża wartość parametru! Maksymalna wartość: " + maxX);
        matrixSizeX = maxX;
        document.getElementById("matrixW").value = matrixSizeX;
    }

    if (matrixSizeY < 10) {
        console.log("Za mała wartość parametru H!");
        matrixSizeY = 10;
        document.getElementById("matrixH").value = matrixSizeY;
    }

    if (matrixSizeY > maxY){
        console.log("Za duża wartość parametru! Maksymalna wartość: " + maxY);
        matrixSizeY = maxY;
        document.getElementById("matrixH").value = matrixSizeY;
    }

    matrix = new Array(matrixSizeX).fill(0).map(() => new Array(matrixSizeY).fill(0));

    chosenX = matrixSizeX+1;
    chosenY = matrixSizeY+1;

    initMatrix();
    paintMatrix();
}
