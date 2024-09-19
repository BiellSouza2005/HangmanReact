import React from "react";
import './LetterButton.css'

interface LetterButtonProps {
  letter: string;
  onClick: (letter: string) => void;
  disabled: boolean;
  dataTestId?: string;
}
 
const LetterButton: React.FC<LetterButtonProps> = ({ letter, onClick, disabled, dataTestId }) => {
  return (
<button
      className="letterButton"
      onClick={() => onClick(letter)}
      style={{ margin: "5px" }}
      disabled={disabled}
      data-test={dataTestId}
>
      {letter}
</button>
  );
};

export default LetterButton;