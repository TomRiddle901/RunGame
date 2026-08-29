// Impostazioni dimensione canvas
let canvasWidth = 900;
let canvasHeight = 500;

// Impostazioni stato del gioco e variabili globali
let gameState = 'START'; // Stato del gioco: 'START', 'RACING', FINISH'
let winner = null;
let inputRisposta; // Testo in input risposta domande
let btnInvia; // Bottone per inviare la risposta

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
        {
            domanda: "Quali sono gli stati di un processo?",
            keywords: ["pronto", "esecuzione", "attesa", "ready", "running", "blocked"]
        },
        {
            domanda: "Qual'è la differenza tra scheduling preemptive e non-preemptive?",
            keywords: ["interruzione", "priorità", "rilascio"]
        }
    ],
    "Memory Manager": [
        {
            domanda: "Cos'è la memoria virtuale e a cosa serve?",
            keywords: ["ram", "disco", "pagine", "estensione", "spazio"]
        },
        {
            domanda: "Differenza tra frammentazione esterna ed interna?",
            keywords: ["blocco", "spazio", "pagine", "segmenti", "inutilizzato"]
        }
    ],
    "File System": [
        {
            domanda: "Qual'è la funzione di un i-node in Linux?",
            keywords: ["metadati", "struttura", "pointer", "informazioni", "file"]
        },
        {
            domanda: "Differenze tra allocazione contigua e concatenata?",
            keywords: ["blocchi", "puntatore", "sequenziale", "frammentazione"]
        }
    ],
    "Gestore delle periferiche": [
        {
            domanda: "A cosa serve il controller delle periferiche?",
            keywords: ["hardware", "interfaccia", "registro", "comunicazione"]
        },
        {
            domanda: "Cosa sono gli interrupt?",
            keywords: ["segnale", "cpu", "interruzione", "hardware", "priorità"]
        }
    ]
};

let currentQuestionObj = null;
let feedbackMessaggio = "";

// Funzione di setup
function setup(){
    // Creazione del canvas
    let canvas = createCanvas(canvasWidth, canvasHeight);

    // Aggiunta del canvas all'interno dell'HTML
    canvas.parent('game-container');

    // Imposta la modalità di disegno al centro del canvas
    rectMode(CENTER);
    textAlign(CENTER, CENTER);

    // Casella di testo
    inputRisposta = createInput('');
    inputRisposta.parent('game-container');
    inputRisposta.id('input-risposta');
    inputRisposta.hide();

    // Bottone
    btnInvia = createButton('Invia');
    btnInvia.parent('game-container');
    btnInvia.id('btn-invia');
    btnInvia.hide();

    // Avvia la funzione per gestire la risposta quando viene premuto il bottone
    btnInvia.mousePressed(gestisciRisposta);
}

function draw(){
    background(18, 20, 29);

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
        textStyle(BOLD);
        text("PREMI SPAZIO PER INIZIARE LA GARA", width / 2, 20);
        textStyle(NORMAL);
    }else if (gameState === 'RACING'){
        updateRunners();
    }else if (gameState === 'FINISH'){
        drawQuestion();
    }
}

// Pista stilizzata con traguardo a scacchi e cordoli
function drawTrack(){
    // Altezza di ogni corsia
    let laneHeight = 90;

    // Posizione iniziale della prima corsia
    let startY = 80;

    // Disegno delle 4 corsie
    for (let i = 0; i < 4; i++){
        let yPos = startY + i * laneHeight;

        // Corsia
        fill(32, 35, 48);
        rect(width / 2, yPos, width - 100, laneHeight - 12, 6);

        // Linea tratteggiata centrale di corsia
        stroke(50, 55, 75);
        strokeWeight(2);
        for(let x = 80; x < width - 80; x += 20) {
            line(x, yPos, x + 10, yPos);
        }
        noStroke();
    }

    // Linea di partenza luminosa
    stroke(255, 255, 255, 180);
    strokeWeight(4);
    line(70, 38, 70, 392);
    noStroke();

    // Traguardo a scacchi
    let checkSize = 10;
    let finishX = width - 70;
    for (let y = 38; y < 392; y += checkSize) {
        let isWhite = (Math.floor(y / checkSize)) % 2 === 0;
        fill(isWhite ? 255 : 30);
        rect(finishX, y + checkSize/2, checkSize, checkSize);
    }
}

// Disegno dei concorrenti come navicelle/veicoli aerodinamici
function drawRunners(){
    for (let i = 0; i < runners.length; i++){
        let r = runners[i];

        // Scia di movimento durante la gara
        if (gameState === 'RACING') {
            fill(color(r.color));
            ellipse(r.x - 15, r.y, 20, 8);
        }

        // Corpo del veicolo
        fill(r.color);
        rect(r.x, r.y, 36, 22, 6);

        // Cabina di guida
        fill(255, 255, 255, 220);
        ellipse(r.x + 4, r.y, 12, 10);

        // Numero del giocatore
        fill(0);
        textSize(11);
        textStyle(BOLD);
        text(r.id, r.x - 8, r.y);
        textStyle(NORMAL);
    }
}

// Legenda inferiore
function drawLegend(){
    // Formattazione del testo
    textSize(12);
    textAlign(LEFT, CENTER);
    let legendX = 60;
    let legendY = 450;

    fill(160, 165, 192);
    text("Argomenti TPSIT:", legendX - 5, legendY - 20);

    // Ciclo per mostrare gli argomenti di TPSIT
    for (let i = 0; i < runners.length; i++){
        let player = runners[i];
        let posX = legendX + (i * 200);

        // Quadratino del colore del giocatore
        fill(player.color);
        rect(posX, legendY, 12, 12, 3);

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
        runners[i].x += random(1.5, 4.2);

        // Controllo del vincitore
        if (runners[i].x > (width - 70) && gameState !== 'FINISH'){
            gameState = 'FINISH';
            winner = runners[i];
            extractQuestion(winner.topic);

            // Visualizzo il bottone e il campo di input per la risposta
            inputRisposta.show();
            btnInvia.show();
            inputRisposta.value('');
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
    currentQuestionObj = questions[randomIndex];
}

// Modale retro-tech con bordo luminoso
function drawQuestion(){
    // Card di sfondo
    fill(15, 17, 26, 235);
    stroke(color(winner.color));
    strokeWeight(2);
    rect(width / 2, height / 2, width - 140, 190, 12);
    noStroke();

    // Intestazione Vincitore
    fill(winner.color);
    textSize(18);
    textStyle(BOLD);
    text("Ha vinto il Concorrente " + winner.id + " (" + winner.topic + ")!", width / 2, height / 2 - 55);

    // Domanda estratta
    fill(230);
    textSize(14);
    textStyle(NORMAL);
    text(currentQuestionObj.domanda, width / 2, height / 2 - 15);

    // Messaggio Esito
    if (feedbackMessaggio !== ""){
        fill(feedbackMessaggio.includes("esatta") ? "#2A9D8F" : "#E63946");
        textSize(15);
        textStyle(BOLD);
        text(feedbackMessaggio, width / 2, height / 2 + 40);
        textStyle(NORMAL);
    }
}

// Funzione per la gestione delle risposte
function gestisciRisposta(){
    let rispostaUtente = inputRisposta.value().toLowerCase().trim();

    if (rispostaUtente === ""){
        alert("Inserisci una risposta prima di inviare!");
        return;
    }

    let isCorretta = currentQuestionObj.keywords.some(keyword => rispostaUtente.includes(keyword));

    if (isCorretta){
        feedbackMessaggio = "Risposta esatta! Ottimo lavoro.";
    } else {
        feedbackMessaggio = "Risposta sbagliata! Ripassa l'argomento.";
    }

    // Nascodi interfaccia di risposta
    inputRisposta.hide();
    btnInvia.hide();

    // Visualizzazione del messaggio prima del riavvio del gioco
    setTimeout(() => {
        feedbackMessaggio = "";
        resetGame();
    }, 2500);
}

// Funzione per riavviare il gioco
function resetGame(){
    gameState = 'START';
    winner = null;
    currentQuestionObj = null;

    for (let i = 0; i < runners.length; i++){
        runners[i].x = startLineX;
    }
}