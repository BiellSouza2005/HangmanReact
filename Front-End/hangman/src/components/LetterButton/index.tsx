import React from "react";
import './LetterButton.css'

interface LetterButtonProps {
  letter: string;
  onClick: (letter: string) => void;
  disabled: boolean;
}
 
const LetterButton: React.FC<LetterButtonProps> = ({ letter, onClick, disabled }) => {
  return (
<button
      className="letterButton"
      onClick={() => onClick(letter)}
      style={{ margin: "5px" }}
      disabled={disabled}
>
      {letter}
</button>
  );
};

export default LetterButton;