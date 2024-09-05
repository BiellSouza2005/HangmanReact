import React from "react";
import './LetterButton.css'

interface LetterButtonProps {
  letter: string;
  onClick: (letter: string) => void;
}

const LetterButton: React.FC<LetterButtonProps> = ({ letter, onClick }) => {
  return (
    <button
      className="letterButton"
      onClick={() => onClick(letter)}
      style={{ margin: "5px" }}
    >
      {letter}
    </button>
  );
};

export default LetterButton;