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
    
        newDiv.style["backgroundColor"] = "blue";
        newDiv.style["width"] = `${divSize}px`;
        newDiv.style["height"] = `${divSize}px`;
    
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

    div.style["backgroundColor"] = "red";
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
