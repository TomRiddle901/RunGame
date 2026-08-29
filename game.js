// Impostazioni dimensione canvas
let canvasWidth = 900;
let canvasHeight = 500;

// Impostazioni stato del gioco e variabili globali
let gameState = 'START'; // Stato del gioco: 'START', 'RACING', FINISH'
let winner = null;
let inputRisposta = null; // Testo in input risposta domande
let btnInvia = null; // Bottone per inviare la risposta

// Giocatori
let startLineX = 70; // Posizione di partenza
let runners = [ // Array di giocatori
    {id: 1, color: "#E63946", topic: "CPU Scheduler", x: startLineX, y: 80},
    {id: 2, color: "#2A9D8F", topic: "Memory Manager", x: startLineX, y: 169},
    {id: 3, color: "#E9C46A", topic: "File System", x: startLineX, y: 262},
    {id: 4, color: "#DE61F4", topic: "Gestore delle periferiche", x: startLineX, y: 350}
];

// Domande per argomento
const domandeTPSIT = {
    "CPU Scheduler": [
        "Quali sono gli stati di un processo?",
        "Qual'è la differenza tra uno scheduling preemptive e non-preemptive?"
    ],
    "Memory Manager": [
        "Cos'è la memoria virtuale e a cosa serve?",
        "Qual'è la differenza tra frammentazione esterna e frammentazione interna?"
    ],
    "File System": [
        "Qual'è la funzione di un i-node in un file system Linux?",
        "Quali sono le diferenze tra allocazione contigua e concatenata?"
    ],
    "Gestore delle periferiche": [
        "A cosa serve il controller delle periferiche?",
        "Cosa sono gli interrupt?"
    ]
}
let currentQuestion = "";

// Funzione di setup
function setup(){
    // Creazione del canvas
    let canvas = createCanvas(canvasWidth, canvasHeight);

    // Aggiunta del canvas all'interno dell'HTML
    canvas.parent('game-container');

    // Imposta la modalità di disegno al centro del canvas
    rectMode(CENTER);
    textAlign(CENTER, CENTER);

    // Casella di testo per la risposta
    inputRisposta = createInput('');
    inputRisposta.parent('game-container');
    inputRisposta.hide(); // Nasconde la casella ti testo

    // Bottone di invio della risposta
    btnInvia = createButton('Invia Risposta');
    btnInvia.parent('game-container');
    btnInvia.hide(); // Bottone di invio risposta nascosto

    // Avvia la funzione per gestire la risposta quando viene premuto il bottone
    btnInvia.mousePressed(gestisciRisposta);
}

function draw(){
    // Colore di sfondo
    background(30, 30, 30);

    // Disegna la pista
    drawTrack();

    // Disegna i giocatori
    drawRunners();

    // Disegna la legenda
    drawLegend();

    // Gestione dello stato del gioco
    if (gameState === 'START'){
        fill(255);
        textSize(16);
        text("Premi SPAZIO per iniziare la gara", width / 2, 20);
    }else if (gameState === 'RACING'){
        updateRunners();
    }else if (gameState === 'FINISH'){
        drawQuestion();
    }
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

// Funzione per disegnare i giocatori
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

// Disegno della legenda degli argomenti
function drawLegend(){
    // Formattazione del testo
    textSize(12);
    textAlign(LEFT, CENTER);
    let legendX = 60;
    let legendY = 440;

    // Titolo della legenza
    fill(255);
    text("Legenda degli argomenti di TPSIT: ", legendX - 5, legendY - 20);

    // Ciclo per mostrare gli argomenti di TPSIT
    for (let i = 0; i < runners.length; i++){
        let player = runners[i];
        let posX = legendX + (i * 200);

        // Quadratino del colore del giocatore
        fill(player.color);
        rect(posX, legendY, 12, 12);

        // Nome dell'argomento di TPSIT
        fill(255);
        text(player.topic, posX + 10, legendY);
    }

    // Ripristino dell'allineamento centrale per tutti i testi (esclusa legenda)
    textAlign(CENTER, CENTER);
}

// Funzione per il movimento dei giocatori ad una velocità random
function updateRunners(){
    for (let i = 0; i < runners.length; i++){
        // Avanzamento casuale di ogni giocatore
        runners[i].x += random(1, 4); // random() è presente all'interno di p5.js

        // Controllo del vincitore
        if (runners[i].x > (width - 70) && gameState !== 'FINISH'){
            gameState = 'FINISH';
            winner = runners[i];
            console.log("L'argomento che ha vinto è: " + winner.topic);
            extractQuestion(winner.topic); // Passaggio dell'argomento del vincitore

            // Posizionamento del bottone e del campo di input
            inputRisposta.position(width / 2 - 100, height / 2 + 30);
            btnInvia.position(width / 2 + 80, height / 2 + 30);

            inputRisposta.show();
            btnInvia.show();
            inputRisposta.value(''); // Pulizia del campo di input da vecchie risposte
        }
    }
}

// Funzione per avviare il gioco alla pressione di un tasto della tastiera
function keyPressed(){
    if (key === ' ' && gameState === 'START'){
        gameState = 'RACING';
    }
}

// Funzione per estrarre le domande di un argomento di modo randomico
function extractQuestion(topic){
    let questions = domandeTPSIT[topic];
    let randomIndex = int(random(questions.length));
    currentQuestion = questions[randomIndex];
}

// Funzione per visualizzare la domanda sullo schermo
function drawQuestion(){
    // Sfondo leggermente trasparente
    fill(0, 0, 0, 220);
    rect(width / 2, height / 2, width - 100, 150, 10);

    // Titolo del vincitore
    fill(winner.color);
    textSize(18);
    text("Ha vinto il concorrente " + winner.id + ", " + winner.topic + "!", width / 2, height / 2 - 50);

    // Testo della domanda
    fill(255);
    textSize(14);
    text("Domanda: " + currentQuestion, width / 2, height / 2);
}