import React, { useState, useEffect } from "react";
import LetterButton from "../LetterButton";
import getWord from "../../Words";
import './HangmanInterface.css'
import Button from "../Button";

const Hangman: React.FC = () => {
  const [word, setWord] = useState<string[]>([]);
  const [clue, setClue] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);
  const [showNewWordButton, setShowNewWordButton] = useState<boolean>(false);
  const [isGameActive, setIsGameActive] = useState<boolean>(true);
 
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
    setShowNewWordButton(false);
    setIsGameActive(true);
  };
 
  const verifyLetter = (letter: string) => {
    if (!isGameActive || guessedLetters.includes(letter)) return; 
 
    setGuessedLetters((prev) => [...prev, letter]);
 
    if (!word.includes(letter)) {
      setWrongGuesses((prev) => prev + 1);
 
      if (wrongGuesses + 1 === 8) {
        setTimeout(() => {
          alert("Perdeu :/");
          setShowNewWordButton(true);
          setIsGameActive(false);
        },100)
      }
    } else {
      const allLettersGuessed = word.every(
        (char) => guessedLetters.includes(char) || char === letter
      );
 
      if (allLettersGuessed) {
        setTimeout(() => {
          alert("Ganhou!!!");
          setShowNewWordButton(true);
          setIsGameActive(false);
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
      <LetterButton
        key={letter}
        letter={letter}
        onClick={verifyLetter}
        disabled={!isGameActive || guessedLetters.includes(letter)}
      />
    ));
  };

  return (
    <div className="container">
      <div>
        <div className="imagem"><img src={`./public/imagens/forca${wrongGuesses}.png`} alt="Hangman"/></div>
      </div>
      <div className="containerButtons">
        <h2>{clue}</h2>
        <div className="guess-word">{renderWord()}</div>
        <div className="btns">{renderButtons()}</div>
        {showNewWordButton && <Button onClick={initGame}>Jogar novamente</Button>}
      </div>
    </div>
  );
};

export default Hangman;