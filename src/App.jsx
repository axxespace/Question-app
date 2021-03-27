import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import Questions from './Questions';
import Error from './Error';
import Restart from './Restart';
import './App.css';

function App() {
  const [error, setError] = useState(null); // error state
  const [response, setResponse] = useState(); // state of API response (custom negative value)
  const [items, setItems] = useState([]); // state of API data(type, correct_answer, etc.)
  const [amount, setAmount] = useState(); // state amount of questions
  const [category, setCategory] = useState(''); // state of category
  const [difficulty, setDifficulty] = useState(''); // state of difficulty
  const [type, setType] = useState(''); // state of type
  const [currentValue, setCurrentValue] = useState(); // state value of our chosen answer
  const [score, setScore] = useState(0); // state of score
  const [currentQuestion, setCurrentQuestion] = useState(); // state of current question number

  // we need following states to keep saved quiz option values without starting an app before we press start button
  const [amount1, setAmount1] = useState(10);
  const [category1, setCategory1] = useState('');
  const [difficulty1, setDifficulty1] = useState('');
  const [type1, setType1] = useState('');

  // we manipulate on our API using amount, category, difficulty, type properties
  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result.results[currentQuestion]);
          setResponse(result.response_code);
        },
        // eslint-disable-next-line no-shadow
        (error) => {
          setError(error);
        },
      );
  }, [currentQuestion, amount, category, difficulty, type]);

  const amountFunc = (event) => { // this function is called when number of questions is changed in menu
    setAmount1(event.target.value);
  };

  const selectFunc = (event) => { // this function is called when category, difficulty, or type is changed in menu
    const a = event.target.value.split(' ');
    if (a[0] === '1') setCategory1(a[1]);
    if (a[0] === '2') setDifficulty1(a[1]);
    if (a[0] === '3') setType1(a[1]);
  };

  const nextQuestion = () => { // we call this function when we click next button
    // if question isn't last in a row and value is selected, we increase state of current question and move to next question
    if (currentQuestion < amount - 1 && currentValue) {
      setCurrentQuestion((prev) => prev + 1);
    }
    // if current question is last in a row, we change response to -1. (negative response calls Restart components
    if (currentQuestion === amount - 1 && currentValue) {
      setTimeout(() => {
        setResponse(-1);
      }, 1500);
    }
    // if current value is true we increase score and than delete current value
    if (currentValue === items.correct_answer) setScore((prev) => prev + 1);
    setCurrentValue('');
  };

  const startFunc = () => { // we call this function when we click on menu page start button
    // our api depends on amount parameter. if amount parameter exists, we can get get data from API
    if (amount1 > 0 && amount1 <= 50) {
      setCurrentQuestion(0);
      setAmount(amount1);
      setCategory(category1);
      setDifficulty(difficulty1);
      setType(type1);
    }
  };

  const playAgain = () => { // we call this function when we press restart button in Restart components
    // we set everything default
    setTimeout(() => {
      setAmount(0);
      setResponse(2);
      setScore(0);
      setAmount1(10);
      setCategory1('');
      setDifficulty1('');
      setType1('');
    }, 1000);
  };

  if (error) { // in case of API error our application return Error component
    return (
      <Error error={error} />
    );
  }

  if (response < 0) { // if response is negative app return Restart page
    return (
      <Restart
        score={score}
        playAgain={playAgain}
      />
    );
  }

  if (response !== 0) { // if api can't return any data app returns Menu component
    return (
      <Menu
        amountFunc={amountFunc}
        selectFunc={selectFunc}
        startFunc={startFunc}
        amount={amount1}
      />
    );
  }

  // by default app return Questions component
  return (
    <Questions
      items={items}
      setCurrentValue={setCurrentValue}
      currentValue={currentValue}
      currentQuestion={currentQuestion}
      amount={amount}
      nextQuestion={nextQuestion}
    />
  );
}

export default App;
