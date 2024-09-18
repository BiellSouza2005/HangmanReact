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
    <div>
      <div>
        {showNewWordButton && <Button onClick={initGame}>Jogar novamente</Button>}
      </div>
      <div className="scoreBoard">
        <ScoreBoard score={score} />
      </div>
    </div>
  );
};

export default Footer;
