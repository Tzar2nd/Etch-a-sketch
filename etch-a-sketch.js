let squares = 16;
let text = "test";
const DRAW_CHOICE = "Darken"

// Set the chosen number of columns and rows
const grid = document.querySelector(".grid-container");
grid.style.gridTemplateColumns = `repeat(${squares}, 1fr)`;

// Loop up filling in the columns and rows with a div
for (let i = 1; i <= squares * squares; i++) {
    cell = grid.appendChild(document.createElement("div"));
    cell.classList.add("grid-element");
    
    switch (DRAW_CHOICE) {
    case "Normal":
        cell.addEventListener('mouseover', 
        e => e.target.classList.add('color-solid'))
        break;

    case "Rainbow":
        cell.addEventListener('mouseover', 
            e => e.target.style.backgroundColor = randomRainbowColor());
        break;

    case "Darken":
        cell.addEventListener('mouseover', 
            e => e.target.style.filter = darken(e.target.style.filter));
        break;
    }
}

// Reset the grid
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