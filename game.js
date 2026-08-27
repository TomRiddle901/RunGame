// Impostazioni dimensione canvas
let canvasWidth = 900;
let canvasHeight = 500;

// Giocatori
let startLineX = 70; // Posizione di partenza
let runners = [ // Array di giocatori
    {id: 1, color: "#E63946", topic: "CPU Scheduler", x: startLineX, y: 80},
    {id: 2, color: "#2A9D8F", topic: "Memory Manager", x: startLineX, y: 80},
    {id: 3, color: "#E9C46A", topic: "File System", x: startLineX, y:80},
    {id: 4, color: "#DE61F4", topic: "Gestore delle periferiche", x: startLineX, y:80}
];

// Funzione di setup
function setup(){
    // Creazione del canvas
    let canvas = createCanvas(canvasWidth, canvasHeight);

    // Aggiunta del canvas all'interno dell'HTML
    canvas.parent('game-container');

    // Imposta la modalità di disegno al centro del canvas
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
}

function draw(){
    // Colore di sfondo
    background(30, 30, 30);

    // Disegna la pista
    drawTrack();

    // Disegna i giocatori
    drawRunners();
}

// Funzione per disegnare la pista
function drawTrack(){
    // Altezza di ogni corsia
    let laneHeight = 90;

    // Posizione iniziale della prima corsia
    let startY = 80;

    // Disegno delle 4 corsie
    for (let i = 0; i < 4; i++){
        fill(70, 70, 70);

        rect(width / 2, startY + i * laneHeight, width - 100, laneHeight - 10);
    }

    // Disegno della linea di partenza
    stroke(255);
    strokeWeight(3);

    line(70, 40, 70, 390);

    // Disegno della linea di traguardo
    line(width - 70, 40, width - 70, 390);

    // Rimozione bordo dei quadrati
    noStroke();
}

function drawRunners(){
    for (let i = 0; i < runners.length; i++){
        // Colore del giocatore
        fill(runners[i].color);

        // Forma del giocatore (per ora ellisse)
        ellipse(runners[i].x, runners[i].y, 30, 30);

        // Etichetta con il numero del giocatore
        fill(255);
        textSize(12);
        textAlign(CENTER, CENTER);
        text(runners[i].id, runners[i].x, runners[i].y);
    }
}