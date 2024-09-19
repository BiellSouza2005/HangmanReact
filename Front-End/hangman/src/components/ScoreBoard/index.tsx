import "./ScoreBoard.css"
import Score from '../../assets/score.svg'
import React from "react";

interface ScoreBoardProps {
  score: number;
  dataTestId?: string; 
}

const scoreBoard: React.FC<ScoreBoardProps> = ({score, dataTestId}) => {
    return(
            
        <div className="score">
            <img src={Score} />
            <h3 data-test={dataTestId} >{score}</h3>
        </div>
    )
}

export default scoreBoard;