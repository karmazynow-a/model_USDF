/*TODO:
 * new rules
 */


//initial values
var areBtnsDisabled = false;
var paramsChanged = false;
var continueAnimating = false;

var timeInterval = 200; //in miliseconds
var timer = null;

function onLoad() {
    enableBtns();

    document.getElementById('symStop').addEventListener('click',onStop);

    document.getElementById("startPercent").value = startPercent;
    onSliderChange();

    document.getElementById("matrixH").value = Math.floor(window.innerHeight / 8);
    document.getElementById("matrixW").value = Math.floor(window.innerWidth / 13);
    setMatrixSize();
    onReset();
    return false;
}

//start game
function onStart() {
    continueAnimating = true;
    if(paramsChanged){
        onReset();
        paramsChanged = false;
    }
    disableBtns();
    updatePlot();
    timer = setInterval(nextStep, timeInterval);
    return false;
}

//reset matrix
function onReset() {
    paintPlot();
    initMatrix();
    paintMatrix();
    return false;
}

//stop game
function onStop() {
    continueAnimating = false;
    clearInterval(timer);
    enableBtns();
    return false;
}

function onSliderChange() {
    startPercent = Number(document.getElementById("startPercent").value);
    document.getElementById("rangeValue").innerHTML = startPercent + "%";
    paramsChanged = true;
    initMatrix();
    paintMatrix();
}

//do next step of the game
function nextStep() {
    if (continueAnimating) {
	setTimeout(updateMatrix, 10);
        setTimeout(paintMatrix, 10);
	setTimeout(updatePlot, 10);
    }
}

function onWindowResize() {
    setMatrixSize();
    initMatrix();
}

function disableBtns() {
    //only stop is enabled - to stop the game
    areBtnsDisabled = true;
    document.getElementById("symStart").disabled = true;
    document.getElementById("symStop").disabled = false;
    document.getElementById("symReset").disabled = true;

    document.getElementById("startPercent").disabled = true;

    document.getElementById("matrixW").disabled = true;
    document.getElementById("matrixH").disabled = true;
    return false;
}

function enableBtns() {
    //only stop is disabled
    areBtnsDisabled = false;
    document.getElementById("symStart").disabled = false;
    document.getElementById("symStop").disabled = true;
    document.getElementById("symReset").disabled = false;

    document.getElementById("startPercent").disabled = false;
    document.getElementById("matrixW").disabled = false;
    document.getElementById("matrixH").disabled = false;
    return false;
}