# RunGame - Esercitazione 1 TPSIT
**RunGame** è un gioco web interattivo e ludico sviluppato con la libreria **p5.js** per ripassare i concetti fondamentali del programma di **TPSIT** (Tecnologie e Progettazione di Sistemi Informatici e di Telecomunicazioni)

---

## Come funziona il gioco

1. **La gara**: Premendo `SPAZIO`, 4 concorrenti (rappresentanti 4 argomenti diversi di TPSIT) gareggiano in una pista retro con una velocità casuale.
2. **Il traguardo**: Il primo concorrente che taglia il traguardo vince ma manche.
3. **La domanda**: Alla vittoria del concorrente, viene estratta una domanda casuale relativa al suo argomento
4. **La risposta**: L'utente inserisce la risposta nella casella di testo. Il sistema analizza la presenza di parole chiave (*keywords*) per verificare la correttezza del questio e mostra un feedback visivo prima di riavviare la gara.

---

## Argomenti trattati
* **Concorrente 1**: CPU Scheduler
* **Concorrente 2**: Memory Manager
* **Concorrente 3**: File System
* **Concorrente 4**: Gestore delle periferiche

---

## Tecnologie utilizzate
* **HTML5 & CSS3**: Struttura del layout, font personalizzati e componenti UI.
* **JavaScript**: Logica di gioco, gestione degli stati, estrazione delle domande e verifica delle risposte.
* **p5.js**: Rendering grafico della pista, animazione dei veicoli, rilevamento collisioni e interfaccia di gioco.
* **Google Fonts**: Tipografia dell'interfaccia.

---

## Struttura della repository
```text
.
|---index.html      # Pagina iniziale dell'applicazione
|---style.css       # Stile e posizionamento UI
|---game.js         # Logica di gioco e canvas p5.js
|---CHANGELOG.md    # Storico delle versioni e modifiche
|---README.md       # Documentazione del progetto
```

---

## Esecuzione del progetto
### Opzione 1 (consigliato)
* GitHub Pages website: https://tomriddle901.github.io/RunGame/
### Opzione 2
1. Clona o scarica il repository: `git clone https://github.com/TomRiddle901/RunGame.git` o (https://github.com/TomRiddle901/RunGame.git)
2. Apri il file `index.html` in un qualsiasi browser web ***moderno e aggiornato*** (oppure utilizza un server locale come l'estensione Live Server di VSCode o utilizzando WebStorm).