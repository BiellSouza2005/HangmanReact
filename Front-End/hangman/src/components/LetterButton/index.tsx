// LetterButton.tsx
import React from "react";
import './LetterButton.css';
 
interface LetterButtonProps {
  letter: string;
  onClick: () => void; // Função sem parâmetros
  disabled: boolean;
  dataTestId?: string;
  status?: string;
}
 
const LetterButton: React.FC<LetterButtonProps> = ({ letter, onClick, disabled, dataTestId, status }) => {
  const buttonClass = status === "correct" ? "correct" : status === "wrong" ? "wrong" : "";
 
  return (
<button
      className={`letterButton ${buttonClass}`}
      onClick={onClick} // Chama a função diretamente
      style={{ margin: "5px" }}
      disabled={disabled}
      data-test={dataTestId}
>
      {letter}
</button>
  );
};
 
export default LetterButton;