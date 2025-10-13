let canvas;
let world;
let keyboard = new steering();

function init() {
    canvas = document.getElementById('canvas');
    canvas.width = 720;
    canvas.height = 480;

    world = new World(canvas, keyboard); //  Spiel starten
}

window.addEventListener("keydown", (e) => {
    switch(e.key) {
        case "ArrowRight": keyboard.right = true; break;
        case "ArrowLeft":  keyboard.left = true; break;
        case "ArrowUp":    keyboard.up = true; break;
        case "ArrowDown":  keyboard.down = true; break;
        case " ":          keyboard.space = true; break;
    }
});

window.addEventListener("keyup", (e) => {
    switch(e.key) {
        case "ArrowRight": keyboard.right = false; break;
        case "ArrowLeft":  keyboard.left = false; break;
        case "ArrowUp":    keyboard.up = false; break;
        case "ArrowDown":  keyboard.down = false; break;
        case " ":          keyboard.space = false; break;
    }
});
