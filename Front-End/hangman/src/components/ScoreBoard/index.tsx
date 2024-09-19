import "./ScoreBoard.css"
import Score from '../../assets/score.svg'

import React from "react";

interface ScoreBoardProps {
  score: number;
}

const scoreBoard: React.FC<ScoreBoardProps> = ({score}) => {
    return(
        <div className="score">
            <img src={Score} />
            <h3>{score}</h3>
        </div>
    )
}

export default scoreBoard;