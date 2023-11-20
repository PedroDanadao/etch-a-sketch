var containerDiv = document.querySelector(".container");
var divsNumberButton = document.querySelector(".divs_number_button");
divsNumberButton.addEventListener("click", changeDivsInRow);
var divsInRow = 16;
var CONTAINER_WIDTH = 960;
var DIVS_GAP = 2;
function makeDivs() {
    /**
     * creates the divs that will be inside the container
     */
    removeContainerDivs();
    var divSize = CONTAINER_WIDTH / divsInRow - DIVS_GAP;
    for (var i = 0; i < divsInRow * divsInRow; i++) {
        var newDiv = document.createElement("div");
        newDiv.style["background-color"] = "blue";
        newDiv.style["width"] = divSize + "px";
        newDiv.style["height"] = divSize + "px";
        // create a attribute in the new div to check if it's color has already 
        // been changed and to check the color that has been changed
        newDiv.setAttribute("changed_to_color", '');
        containerDiv.appendChild(newDiv);
        newDiv.addEventListener("mouseover", changeDivColor);
    }
}
function removeContainerDivs() {
    /**
     * Removes all the child divs from the container
     */
    while (containerDiv.firstChild) {
        var lastChild = containerDiv.lastChild;
        containerDiv.removeChild(lastChild);
    }
}
function changeDivColor(event) {
    /**
     * changes the color of the div that has been hovered
     */
    var div = event.target;
    if (!div.getAttribute("changed_to_color")) {
        return assignNewDivColor(div);
    }
    darkenDivColor(div);
}
function assignNewDivColor(div) {
    var randomColorValues = getRandomColor();
    var rgbString = "rgb(" + randomColorValues[0] + ", " + randomColorValues[1] + ", " + randomColorValues[2] + ")";
    var attributeString = randomColorValues[0] + " " + randomColorValues[1] + " " + randomColorValues[2];
    div.style["backgroundColor"] = rgbString;
    div.setAttribute("changed_to_color", attributeString);
}
function darkenDivColor(div) {
    var divOriginalColorString = div.getAttribute("changed_to_color");
    var colorOriginalRGBValues = divOriginalColorString.split(' ');
    var currentRGBString = div.style["backgroundColor"];
    // if the current RGB of the div is already 0, 0, 0 then there is no need to 
    // run the rest of the function
    if (currentRGBString === "rgb(0, 0, 0)")
        return;
    currentRGBString = currentRGBString.replace("rgb(", '');
    currentRGBString = currentRGBString.replace(')', '');
    var colorCurrentRGBValues = currentRGBString.split(", ");
    var darkerRGBNumbers = [];
    for (var i = 0; i < 3; i++) {
        var originalString = colorOriginalRGBValues[i];
        var currentString = colorCurrentRGBValues[i];
        var originalNumber = Number(originalString);
        var originalTenth = Math.max(originalNumber / 10, 1);
        var currentNumber = Number(currentString);
        var darkerNumber = currentNumber - originalTenth;
        darkerNumber = Math.max(Math.floor(darkerNumber), 0);
        darkerRGBNumbers.push(darkerNumber);
    }
    var newDivColor = "rgb(" + darkerRGBNumbers[0] + ", " + darkerRGBNumbers[1] + ", " + darkerRGBNumbers[2] + ")";
    div.style["backgroundColor"] = newDivColor;
}
function getRandomColor() {
    /**
     * returns a random hexadecimal value representing a color
     */
    var r_value = Math.floor(Math.random() * 256);
    var g_value = Math.floor(Math.random() * 256);
    var b_value = Math.floor(Math.random() * 256);
    return [r_value, g_value, b_value];
}
function changeDivsInRow() {
    /**
     * prompts the user to input the number of divs in a row and change the
     * number of the divs that are in the container based on it
     */
    var numberOfDivs = Number(prompt("Insert number between 1 and 100:"));
    if (isNaN(numberOfDivs) || numberOfDivs < 1) {
        alert("The div number should be a valid positive integer");
        return;
    }
    // make sure that the number will be a integer
    numberOfDivs = Math.floor(numberOfDivs);
    if (numberOfDivs > 100) {
        alert("The div number you typed is above 100. FOr this scenario 100 divs in a row will be used");
        numberOfDivs = 100;
    }
    divsInRow = numberOfDivs;
    makeDivs();
}
makeDivs();
