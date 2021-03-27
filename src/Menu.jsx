import React from 'react';
import './Menu.css';

function Menu(props) {
  const {
    amountFunc, selectFunc, startFunc, amount,
  } = props;

  return (
    <div className="menu">
      <h1 className="header">Select options for your quiz:</h1>
      <div className="cont">
        <div className="container">
          <h4 className="header1">Number of Questions:</h4>
          <input className="options" type="number" min="1" max="50" value={amount} onChange={amountFunc} />
        </div>

        <div className="container">
          <h4 className="header1">Select category:</h4>
          <select className="options" name="category" onChange={selectFunc}>
            <option value="1">Any Category</option>
            <option value="1 9">General knowledge</option>
            <option value="1 10">Entertainment: Books</option>
            <option value="1 11">Entertainment: Film</option>
            <option value="1 12">Entertainment: Music</option>
            <option value="1 13">Entertainment: Musicals and Theatres</option>
            <option value="1 14">Entertainment: Television</option>
            <option value="1 15">Entertainment: Video Games</option>
            <option value="1 16">Entertainment: Board Games</option>
            <option value="1 17">Science & Nature</option>
          </select>
        </div>

        <div className="container">
          <h4 className="header1">Select Difficulty:</h4>
          <select className="options" name="difficulty" onChange={selectFunc}>
            <option value="2">Any Difficulty</option>
            <option value="2 easy">Easy</option>
            <option value="2 medium">Medium</option>
            <option value="2 hard">Hard</option>
          </select>
        </div>

        <div className="container">
          <h4 className="header1">Select Type:</h4>
          <select className="options" name="type" onChange={selectFunc}>
            <option value="3">Any Type</option>
            <option value="3 multiple">Multiple Choice</option>
            <option value="3 boolean">True / False</option>
          </select>
        </div>
      </div>

      <button className="menu-btn" type="button" onClick={startFunc}>Start</button>
    </div>
  );
}

export default Menu;
