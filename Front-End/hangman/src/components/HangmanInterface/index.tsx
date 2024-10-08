import React, { useState, useEffect } from "react";
import LetterButton from "../LetterButton";
import Footer from "../Footer";
import { getWordAndClue } from "../../Words";
import './HangmanInterface.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Hangman: React.FC = () => {
  const [word, setWord] = useState<string[]>([]);
  const [clue, setClue] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);
  const [showNewWordButton, setShowNewWordButton] = useState<boolean>(false);
  const [isGameActive, setIsGameActive] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [isScoreLoaded, setIsScoreLoaded] = useState<boolean>(false);
  const [letterStatus, setLetterStatus] = useState<{ [key: string]: string}>({});
  
  console.log(word);

  const maxWrongGuesses = 8;
  const timeout = 100;
 
  useEffect(() => {
    const savedScore = sessionStorage.getItem("score");
    if (savedScore !== null) {
      setScore(Number(savedScore));
    }
    setIsScoreLoaded(true);
  }, []);
 
  useEffect(() => {
    if (isScoreLoaded) {
      sessionStorage.setItem("score", score.toString());
    }
  }, [score, isScoreLoaded]);
 
  useEffect(() => {
    if (isScoreLoaded) {
      initGame();
    }
  }, [isScoreLoaded]);
 
  const initGame = async () => {
    try {
      const { word, clue } = await getWordAndClue();
      const wordWithoutAccent = word
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();
 
      setWord(Array.from(wordWithoutAccent));
      setClue(clue);
      setGuessedLetters([]);
      setLetterStatus({});
      setWrongGuesses(1);
      setWrongGuesses(1);
      setShowNewWordButton(false);
      setIsGameActive(true);
    } catch (error) {
      console.error("Erro ao iniciar o jogo:", error);
    }
  };
 
  const verifyLetter = (letter: string) => {
    if (!isGameActive || guessedLetters.includes(letter)) return;
 
    setGuessedLetters((prev) => [...prev, letter]);
 
    if (!word.includes(letter)) {
      setWrongGuesses((prev) => prev + 1)
      setLetterStatus((prevStatus) => ({
        ...prevStatus,
        [letter]: "wrong"
        }));
 
      if (wrongGuesses + 1 === maxWrongGuesses) {
        setTimeout(() => {
          setScore(score - score);
          toast.error("Perdeu :/");
          setShowNewWordButton(true);
          setIsGameActive(false);
        }, timeout);
      }
    } else {
      const allLettersGuessed = word.every(
        (char) => guessedLetters.includes(char) || char === letter
      )
     
      setLetterStatus((prevStatus) => ({
        ...prevStatus,
        [letter]: "correct"
      }));
 
      if (allLettersGuessed) {
        setTimeout(() => {
          setScore(score + 1);
          toast.success("Ganhou!!!");
          setShowNewWordButton(true);
          setIsGameActive(false);
        }, timeout);
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
   const alphabetLength = 26;
   const asciTableInitialLetter = 65;
    const alphabet = Array.from(Array(alphabetLength)).map((_, i) =>
      String.fromCharCode(asciTableInitialLetter + i)
   );

   return alphabet.map((letter) => (
      <LetterButton
        key={letter}
        letter={letter}
        onClick={verifyLetter}
        disabled={!isGameActive || guessedLetters.includes(letter)}
        dataTestId={`letter-button-${letter}`} 
        status={letterStatus[letter]}
      />
    ));
  };


  return (
    <div>
      <div className="container">
        <div>
          <div className="imagem"><img src={`./public/imagens/forca${wrongGuesses}.png`} alt="Hangman"/></div>
        </div>
        <div className="containerButtons">
          <h2>{clue}</h2>
          <div className="guess-word">{renderWord()}</div>
          <div className="btns">{renderButtons()}</div>
        </div>
      </div>
      <div className="footer">
        <Footer
          showNewWordButton={showNewWordButton}
          initGame={initGame}
          score ={score}
        />
      </div>
      <ToastContainer />
    </div>
   
  );
};
 
export default Hangman;