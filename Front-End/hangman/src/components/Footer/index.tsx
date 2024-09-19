import Button from '../Button';
import ScoreBoard from '../ScoreBoard';
import './Footer.css';
import NewGame from '../../assets/newGame.svg'

interface FooterProps {
  showNewWordButton: boolean;
  initGame: () => void;
  score: number;
}

const Footer: React.FC<FooterProps> = ({ showNewWordButton, initGame, score }) => {
  return (
    <div className='footer'>
      <div className="scoreBoard">
        <ScoreBoard score={score} />
      </div>
      <div className='newGame'>
        {showNewWordButton && <Button className='newGameButton' onClick={initGame}>{"Jogar\nNovamente"}</Button>}
      </div>
    </div>
  );
};

export default Footer;
