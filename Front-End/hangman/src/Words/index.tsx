const words = [
        { word: "Televisão", clue: "Objeto" },
        { word: "Computador", clue: "Objeto" },
        { word: "Bicicleta", clue: "Objeto" },
        { word: "Mochila", clue: "Objeto" },
        { word: "Pizza", clue: "Comida" },
        { word: "Hamburguer", clue: "Comida" },
        { word: "Brasil", clue: "País" },
        { word: "Elefante", clue: "Animal" },
        { word: "Leão", clue: "Animal" },
        { word: "Tigre", clue: "Animal" },
        { word: "Girafa", clue: "Animal" },
        { word: "Cachorro", clue: "Animal" },
        { word: "Gato", clue: "Animal" },
        { word: "Papagaio", clue: "Animal" },
    ];


export default function getWord() {
    const index = Math.floor(Math.random() * words.length);
    return words[index];
  }