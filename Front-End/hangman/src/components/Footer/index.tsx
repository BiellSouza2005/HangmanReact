import Button from '../Button';
import ScoreBoard from '../ScoreBoard';
import './Footer.css';

interface FooterProps {
  showNewWordButton: boolean;
  initGame: () => void;
  score: number;
}

const Footer: React.FC<FooterProps> = ({ showNewWordButton, initGame, score }) => {
  return (
    <div className='footer'>
      <div className="scoreBoard">
        <ScoreBoard score={score} dataTestId={`score`} />
      </div>
      <div className='newGame'>
        {showNewWordButton && <Button className='newGameButton' onClick={initGame}>{"Jogar\nNovamente"}</Button>}
      </div>

    </div>
  );
};

export default Footer;
