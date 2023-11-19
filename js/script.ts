const containerDiv = document.querySelector(".container") as HTMLDivElement;

const divsInRow = 16;
const containerWidth = 960;
const DIVS_GAP = 2;

const divSize = Math.floor(containerWidth / divsInRow) - DIVS_GAP

for(let i=0; i < divsInRow * divsInRow; i++){
    let newDiv = document.createElement("div") as HTMLElement;

    newDiv.style["backgroundColor"] = "blue";
    newDiv.style["width"] = `${divSize}px`;
    newDiv.style["height"] = `${divSize}px`;

    containerDiv.appendChild(newDiv);
}
