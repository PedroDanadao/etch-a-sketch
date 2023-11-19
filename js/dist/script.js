var containerDiv = document.querySelector(".container");
var divsInRow = 16;
var containerWidth = 960;
var DIVS_GAP = 2;
var divSize = Math.floor(containerWidth / divsInRow) - DIVS_GAP;
for (var i = 0; i < divsInRow * divsInRow; i++) {
    var newDiv = document.createElement("div");
    newDiv.style["backgroundColor"] = "blue";
    newDiv.style["width"] = divSize + "px";
    newDiv.style["height"] = divSize + "px";
    containerDiv.appendChild(newDiv);
}
