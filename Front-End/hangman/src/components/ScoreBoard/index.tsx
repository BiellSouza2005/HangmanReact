import "./ScoreBoard.css"
import React from "react";

interface ScoreBoardProps {
  score: number;
  dataTestId?: string; 
}

const scoreBoard: React.FC<ScoreBoardProps> = ({score, dataTestId}) => {
    return(
        <div>
            <h3 data-test={dataTestId} >Pontuação: {score}</h3>
        </div>
    )
}

export default scoreBoard;