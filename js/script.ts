const containerDiv = document.querySelector(".container") as HTMLDivElement;
const divsNumberButton = document.querySelector(".divs_number_button") as HTMLButtonElement;

divsNumberButton.addEventListener("click", changeDivsInRow)

let divsInRow = 16;
const CONTAINER_WIDTH = 960;
const DIVS_GAP = 2;


function makeDivs() {
    /**
     * creates the divs that will be inside the container
     */
    removeContainerDivs();

    const divSize = CONTAINER_WIDTH / divsInRow - DIVS_GAP
    
    for(let i=0; i < divsInRow * divsInRow; i++){
        let newDiv = document.createElement("div") as HTMLElement;
    
        newDiv.style["background-color"] = "blue";
        newDiv.style["width"] = `${divSize}px`;
        newDiv.style["height"] = `${divSize}px`;

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
    while(containerDiv.firstChild) {
        let lastChild = containerDiv.lastChild as HTMLDivElement;
        containerDiv.removeChild(lastChild);
    }
}

function changeDivColor(event: Event) {
    /**
     * changes the color of the div that has been hovered
     */
    const div = event.target as HTMLDivElement;

    if(!div.getAttribute("changed_to_color")){
        return assignNewDivColor(div);
    }

    darkenDivColor(div);
}

function assignNewDivColor(div: HTMLDivElement) {
    const randomColorValues = getRandomColor();
    const rgbString = `rgb(${randomColorValues[0]}, ${randomColorValues[1]}, ${randomColorValues[2]})`;
    const attributeString = `${randomColorValues[0]} ${randomColorValues[1]} ${randomColorValues[2]}`;

    div.style["backgroundColor"] = rgbString;
    div.setAttribute("changed_to_color", attributeString);
}

function darkenDivColor(div: HTMLDivElement) {
    const divOriginalColorString = div.getAttribute("changed_to_color") as string;
    const colorOriginalRGBValues = divOriginalColorString.split(' ');

    let currentRGBString = div.style["backgroundColor"];
    // if the current RGB of the div is already 0, 0, 0 then there is no need to 
    // run the rest of the function
    if (currentRGBString === "rgb(0, 0, 0)") return
    
    currentRGBString = currentRGBString.replace("rgb(", '');
    currentRGBString = currentRGBString.replace(')', '');
    const colorCurrentRGBValues = currentRGBString.split(", ");

    const darkerRGBNumbers : Number[] = [];

    for(let i=0; i < 3; i++){
        let originalString = colorOriginalRGBValues[i];
        let currentString = colorCurrentRGBValues[i];

        let originalNumber = Number(originalString);
        let originalTenth = Math.max( originalNumber / 10, 1 );

        let currentNumber = Number(currentString);
        let darkerNumber = currentNumber - originalTenth;
        darkerNumber = Math.max( Math.floor(darkerNumber), 0 );

        darkerRGBNumbers.push(darkerNumber);
    }

    const newDivColor = `rgb(${darkerRGBNumbers[0]}, ${darkerRGBNumbers[1]}, ${darkerRGBNumbers[2]})`;
    div.style["backgroundColor"] = newDivColor;
}

function getRandomColor() {
    /**
     * returns a random hexadecimal value representing a color
     */
    const r_value = Math.floor( Math.random() * 256 );
    const g_value = Math.floor( Math.random() * 256 );
    const b_value = Math.floor( Math.random() * 256 );

    return [r_value, g_value, b_value];
}

function changeDivsInRow() {
    /**
     * prompts the user to input the number of divs in a row and change the 
     * number of the divs that are in the container based on it
     */
    let numberOfDivs = Number(prompt("Insert number between 1 and 100:"));

    if(isNaN(numberOfDivs) || numberOfDivs < 1){
        alert("The div number should be a valid positive integer");
        return
    }

    // make sure that the number will be a integer
    numberOfDivs = Math.floor(numberOfDivs);

    if(numberOfDivs > 100) {
        alert("The div number you typed is above 100. FOr this scenario 100 divs in a row will be used");
        numberOfDivs = 100;
    }

    divsInRow = numberOfDivs;
    makeDivs();
}

makeDivs();
