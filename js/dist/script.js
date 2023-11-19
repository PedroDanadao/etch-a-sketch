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
        newDiv.style["backgroundColor"] = "blue";
        newDiv.style["width"] = divSize + "px";
        newDiv.style["height"] = divSize + "px";
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
    div.style["backgroundColor"] = "red";
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
