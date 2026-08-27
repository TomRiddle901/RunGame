// Impostazioni dimensione canvas
let canvasWidth = 900;
let canvasHeight = 500;

// Funzione di setup
function setup(){
    // Creazione del canvas
    let canvas = createCanvas(canvasWidth, canvasHeight);

    // Aggiunta del canvas all'interno dell'HTML
    document.getElementById('game-container').append(canvas);

    // Imposta la modalità di disegno al centro del canvas
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
}

function draw(){
    // Colore di sfondo
    background(30, 30, 30);

    // Disegna la pista
    drawTrack();
}

