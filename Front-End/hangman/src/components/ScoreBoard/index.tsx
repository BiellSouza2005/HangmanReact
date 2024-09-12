import "./ScoreBoard.css"

import React from "react";

interface ScoreBoardProps {
  score: number;
}

const scoreBoard: React.FC<ScoreBoardProps> = ({score}) => {
    return(
        <div>
            <h3>Pontuação: {score}</h3>
        </div>
    )
}

export default scoreBoard;