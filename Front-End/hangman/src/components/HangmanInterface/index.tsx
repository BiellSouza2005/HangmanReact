import React, { useState, useEffect } from "react";
import LetterButton from "../LetterButton";
import getWord from "../../Words";
import './HangmanInterface.css'
import Button from "../Button";

const Hangman: React.FC = () => {
  const [word, setWord] = useState<string[]>([]);
  const [clue, setClue] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<number>(1);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const { word, clue } = getWord();
    const wordWithoutAccent = word
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();

    setWord(Array.from(wordWithoutAccent));
    setClue(clue);
    setGuessedLetters([]);
    setWrongGuesses(1);
  };

  const verifyLetter = (letter: string) => {
    if (!word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);

      if (wrongGuesses + 1 === 7) {
        alert("Perdeu :/");
        initGame();
      }
    } else {
      setGuessedLetters([...guessedLetters, letter]);

      const allLettersGuessed = word.every((char) =>
        guessedLetters.includes(char) || char === letter
      );

      if (allLettersGuessed) {
        setTimeout(() => {
          alert("Ganhou!!!");
          initGame();
        }, 100);
      }
    }
  };

  const renderWord = () => {
    return word.map((letter, index) =>
      guessedLetters.includes(letter) ? (
        <span key={index}>{letter}</span>
      ) : (
        <span key={index}>_ </span>
      )
    );
  };

  const renderButtons = () => {
    const alphabet = Array.from(Array(26)).map((_, i) =>
      String.fromCharCode(65 + i)
    );
    return alphabet.map((letter) => (
      <LetterButton key={letter} letter={letter} onClick={verifyLetter} />
    ));
  };

  return (
    <div className="container">
      <div>
        <div className="imagem"><img src={`img${wrongGuesses}.png`} alt="Hangman"/></div>
      </div>
      <div className="containerButtons">
        <h2>{clue}</h2>
        <div className="guess-word">{renderWord()}</div>
        <div className="btns">{renderButtons()}</div>
        <Button onClick={initGame}>Nova Palavra</Button> 
      </div>
    </div>
  );
};

export default Hangman;