import React from 'react';
import './Restart.css';
import thumb from './media/pngwing.com.png';

function Restart(props) {
  const { score, playAgain } = props;

  return (
    <div className="restart">
      <div className="restartCont">
        <h5 className="score">
          Your score is:
          {` ${score}`}
        </h5>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <img className="image" onClick={playAgain} src={thumb} alt="" key="7" />
      </div>
    </div>
  );
}

export default Restart;
