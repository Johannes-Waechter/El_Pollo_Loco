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
  switch (e.key) {
    case "ArrowRight": keyboard.right = true; break;
    case "ArrowLeft":  keyboard.left = true; break;
    case "ArrowDown":  keyboard.down = true; break;
    case "ArrowUp":    keyboard.up = true; break; // optional
    case "d":
    case "D":          keyboard.d = true; break;
    case " ":
    case "Spacebar":
    case "Space":      keyboard.space = true; break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowRight": keyboard.right = false; break;
    case "ArrowLeft":  keyboard.left = false; break;
    case "ArrowDown":  keyboard.down = false; break;
    case "ArrowUp":    keyboard.up = false; break; // optional
    case "d":
    case "D":          keyboard.d = false; break;
    case " ":
    case "Spacebar":
    case "Space":      keyboard.space = false; break;
  }
});

function restartGame() {
    // Button wieder ausblenden
    const restartBtn = document.getElementById('restart-button');
    if (restartBtn) restartBtn.classList.add('d-none');

    // Welt komplett neu erzeugen
    world = new World(canvas, keyboard);
}
