import React, { useState, useEffect } from "react";
import LetterButton from "../LetterButton";
import Footer from "../Footer";
import { getWordAndClue } from "../../Words";
import './HangmanInterface.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
 
const Hangman: React.FC = () => {
  const [word, setWord] = useState<string[]>([]); // Palavra mascarada
  const [clue, setClue] = useState<string>(""); // Dica
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]); // Letras adivinhadas
  const [wrongGuesses, setWrongGuesses] = useState<number>(0); // Número de erros
  const [showNewWordButton, setShowNewWordButton] = useState<boolean>(false); // Mostrar botão de nova palavra
  const [isGameActive, setIsGameActive] = useState<boolean>(true); // Estado do jogo
  const [score, setScore] = useState<number>(0); // Pontuação
  const [isScoreLoaded, setIsScoreLoaded] = useState<boolean>(false); // Estado da pontuação carregada
  const [letterStatus, setLetterStatus] = useState<{ [key: string]: string }>({}); // Status das letras
 
  const maxWrongGuesses = 7;
  const timeout = 100;
 
  // Carrega pontuação do sessionStorage
  useEffect(() => {
    const savedScore = sessionStorage.getItem("score");
    if (savedScore !== null) {
      setScore(Number(savedScore));
    }
    setIsScoreLoaded(true);
  }, []);
 
  // Salva pontuação no sessionStorage
  useEffect(() => {
    if (isScoreLoaded) {
      sessionStorage.setItem("score", score.toString());
    }
  }, [score, isScoreLoaded]);
 
  // Inicia o jogo após a pontuação estar carregada
  useEffect(() => {
    if (isScoreLoaded) {
      initGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScoreLoaded]); // Adicionado comentário para ignorar a dependência 'initGame'
 
  // Função que inicia o jogo, buscando palavra e dica
  const initGame = async () => {
    try {
      const { word: fetchedWord, clue } = await getWordAndClue();
      const wordWithoutAccent = fetchedWord
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();
 
      // Inicializa a palavra mascarada com "_" para cada letra
      const maskedWord = Array.from(wordWithoutAccent).map(() => "_");
 
      setWord(maskedWord);
      setClue(clue);
      setGuessedLetters([]);
      setLetterStatus({});
      setWrongGuesses(0);
      setShowNewWordButton(false);
      setIsGameActive(true);
    } catch (error) {
      console.error("Erro ao iniciar o jogo:", error);
      toast.error("Erro ao iniciar o jogo. Tente novamente.");
    }
  };
 
  // Função ajustada para verificar a letra
  const verifyLetter = async (letter: string) => {
    if (!isGameActive || guessedLetters.includes(letter)) return;
 
    try {
      // Adiciona a letra às letras já adivinhadas
      setGuessedLetters((prev) => [...prev, letter]);
 
      // Envia a letra para a API
      const response = await axios.post(
        "http://localhost:5155/api/hangman/guessLetter",
        letter,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log(response.data); // Verificar o que a API está retornando

      const result = response.data;

      console.log(result.gameWon);
      console.log(result.gameLost);
      console.log(result.currentGuess);
      console.log(result.updatedWord);
      
 
      // Atualiza o estado da palavra
      if (result.updatedWord) {
        setWord(result.updatedWord.split("")); 
      } else {
        console.error("UpdatedWord não está definido.");
      }
      
 
      if (result.currentGuess) {
        // Atualiza o status da letra como "correta"
        setLetterStatus((prevStatus) => ({
          ...prevStatus,
          [letter]: "correct",
        }));
 
        // Verifica se o jogo foi vencido
        if (result.gameWon) {
          setTimeout(() => {
            setScore((prevScore) => prevScore + 1);
            toast.success("Ganhou!!!");
            setShowNewWordButton(true);
            setIsGameActive(false);
          }, timeout);
        }
      } else {
        // Atualiza o status da letra como "errada"
        setLetterStatus((prevStatus) => ({
          ...prevStatus,
          [letter]: "wrong",
        }));
 
        // Incrementa o número de erros
        setWrongGuesses((prev) => prev + 1);
 
        // Verifica se o jogo foi perdido
        if (result.gameLost) {
          setTimeout(() => {
            setScore(0); // Reseta a pontuação
            toast.error("Perdeu :/");
            setShowNewWordButton(true);
            setIsGameActive(false);
          }, timeout);
        }
      }
    } catch (error) {
      console.error("Erro ao verificar a letra:", error);
      toast.error("Ocorreu um erro ao processar a tentativa. Tente novamente.");
    }
  };
 
  // Renderiza a palavra com as letras adivinhadas
  const renderWord = () => {
    return word.map((letter, index) => (
<span key={index} className="letter">
        {letter !== "_" ? letter : "_ "}
</span>
    ));
  };
 
  // Renderiza os botões das letras do alfabeto
  const renderButtons = () => {
    const alphabet = Array.from(Array(26)).map((_, i) =>
      String.fromCharCode(65 + i)
    );
 
    return alphabet.map((letter) => (
<LetterButton
        key={letter}
        letter={letter}
        onClick={() => verifyLetter(letter)} // Ajustado para a nova assinatura
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
<div className="imagem">
<img
              src={`./public/imagens/forca${wrongGuesses}.png`}
              alt="Hangman"
            />
</div>
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
          score={score}
        />
</div>
<ToastContainer />
</div>
  );
};
 
export default Hangman;