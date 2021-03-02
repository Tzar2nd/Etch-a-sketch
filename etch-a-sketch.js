let squares = 16;
let text = "test";
let DRAW_CHOICE = "normal"

// Set the chosen number of columns and rows
function drawGrid() {
    const grid = document.querySelector(".grid-container");
    grid.style.gridTemplateColumns = `repeat(${squares}, 1fr)`;

    // Loop up filling in the columns and rows with a div
    for (let i = 1; i <= squares * squares; i++) {
        cell = grid.appendChild(document.createElement("div"));
        cell.classList.add("grid-element");
        
        switch (DRAW_CHOICE) {
        case "normal":
            cell.addEventListener('mouseover', 
                e => e.target.classList.add('color-solid'))
            break;

        case "rainbow":
            cell.addEventListener('mouseover', 
                e => e.target.style.backgroundColor = randomRainbowColor());
            break;

        case "shaded":
            cell.addEventListener('mouseover', 
                e => e.target.style.filter = darken(e.target.style.filter));
            break;
        }
    }
}

function removeGrid() {
    const grid = document.querySelector(".grid-container");
    let divs = document.getElementsByClassName("grid-element");

    while(divs.length > 0) {
        divs[0].parentNode.removeChild(divs[0]);
    }
}

function refreshGrid(option) {
    DRAW_CHOICE = option;
    removeGrid();
    drawGrid();
}

function resetGridSize() {
    squares = prompt("Enter a number between 16 and 100: ", 16);

    if (isNaN(squares)) squares = 16;
    if (squares > 100) squares = 100;
    if (squares < 16) squares = 16;

    document.getElementById('dimensions-button').textContent = 
        `${squares} x ${squares}`;
    removeGrid();
    drawGrid();
}

function randomRainbowColor() {
    return `hsla(${Math.random() * 360}, 100%, 50%, 1)`;
}

function darken(filter) {
    if (filter == "") {
        return "brightness(0.9)";
    }
    else {
        brightness = 
            filter.substring(filter.lastIndexOf("(") + 1, filter.lastIndexOf(")"));
        if (brightness > 0) brightness -= 0.1;
        return `brightness(${brightness})`;
    }
}

function setSelectedButton(button) {

    buttons = document.getElementsByClassName('option-button');
    Array.from(buttons).forEach((button) => {
        button.classList.remove("selected");
    });
    document.getElementById(button).classList.add("selected");
}

// Set buttons and listeners for options
buttonNames = ['normal','rainbow','shaded'];
for(let i = 0; i <= 2; i ++) {
    document.getElementById(buttonNames[i]).addEventListener('click', 
    e => setSelectedButton(buttonNames[i]));
    document.getElementById(buttonNames[i]).addEventListener('click', 
    e => refreshGrid(buttonNames[i]));
}

// Set the grid button
document.getElementById('dimensions-button').addEventListener('click', 
e => resetGridSize());

// Reset button
document.getElementById('reset-button').addEventListener('click', 
e => refreshGrid(DRAW_CHOICE));

drawGrid();


