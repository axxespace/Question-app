import React, { useState, useEffect } from 'react';
import { decode } from 'html-entities';
import './Questions.css';
import { QuestionIndicator, style } from './styling';

function Questions(props) {
  const [prevWidth, setPrevWidth] = useState(); // state of previous width of number indicator (is used for animation)
  const [lineWidth, setLineWidth] = useState(); // this state defines width of our number indicator

  const {
    items, setCurrentValue, nextQuestion, currentValue, currentQuestion, amount,
  } = props;

  useEffect(() => {
    setPrevWidth((currentQuestion / amount) * 100);
    setLineWidth(((currentQuestion + 1) / amount) * 100);
  }, [items]);

  const optionSelect = (event) => { // when we click on different answer button current value changes
    setCurrentValue(event.target.value);
  };

  const spliceFunc = () => { // we need this func to randomly put correct_answer in incorrect_answer array
    const a = items.incorrect_answers;
    if (!a.includes(items.correct_answer)) { a.splice(Math.floor(Math.random() * a.length), 0, items.correct_answer); }
    return a;
  };

  return (
    <div className="questionContainer">
      <div className="content">
        <h1 className="question">{decode(items.question)}</h1>
        <div className="option">
          {/* following code generates buttons with values */}
          {spliceFunc().map((aaa) => (
            <button
              style={currentValue === aaa ? style : null}
              className="answerButton"
              type="button"
              value={aaa}
              onClick={optionSelect}
              key={aaa}
            >
              {decode(aaa)}
            </button>
          ))}
        </div>
        <div className="buttonProgress">
          <div className="line">
            <QuestionIndicator width={lineWidth} prevWidth={prevWidth} />
          </div>
          <button className="nextButton" type="button" onClick={nextQuestion}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Questions;
