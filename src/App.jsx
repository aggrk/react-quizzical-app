import React from "react";
import Questions from "./Components/Questions";
import Start from "./Components/Start";
import { nanoid } from "nanoid";
import { decode } from "html-entities";


export default function App() {
  const [quiz, setQuiz] = React.useState([]);
  const [start, setStart] = React.useState(false);
  const [clickedAnswers, setClickedAnswers] = React.useState({});
  const [score, setScore] = React.useState(null);
  const [correctAnswerColor, setCorrectAnswerColor] = React.useState(false);
  const [answersChecked, setAnswersChecked] = React.useState(false);
  const [play, setPlay] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);

  function getQuestions(qn) {
    const question = decode(qn.question);
    const correct_answer = decode(qn.correct_answer);
    const incorrect_answers = qn.incorrect_answers.map((answer) =>
      decode(answer)
    );

    const all_answers = [...incorrect_answers, correct_answer];
    const answerObjects = all_answers.map((answer) => ({
      id: nanoid(),
      answer: answer,
      isClicked: false
    }));

    for (let i = all_answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answerObjects[i], answerObjects[j]] = [
        answerObjects[j],
        answerObjects[i]
      ];
    }

    return {
      question: question,
      correct_answer: correct_answer,
      answers: answerObjects,
      userAnswer: "",
      score: null,
      id: nanoid()
    };
  }

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => setQuiz(data.results.map(getQuestions)));
  }, []);

  function handleStart() {
    setStart((prevStart) => !prevStart);
  }

  function playAgain() {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        const newQuiz = data.results.map(getQuestions);

        setQuiz(newQuiz);
        setPlay((prevState) => !prevState);
        setAnswersChecked(false);
        setCorrectAnswerColor(false);
        setScore(null);
        setClickedAnswers({});
      });
  }

  function toggleFunc() {
    setToggle((prevState) => !prevState);
  }

  function compareAnswers() {
    const correct_answer = quiz.map((item) => item.correct_answer);
    const user_answer = quiz.map((item) => item.userAnswer);

    // console.log(correct_answer, user_answer)
    let score = 0;
    for (let i = 0; i < quiz.length; i++) {
      if (correct_answer[i] === user_answer[i]) {
        score += 1;
      }
    }

    setScore(score);
    setCorrectAnswerColor((prevState) => !prevState);
    setAnswersChecked((prevState) => !prevState);
  }

  function handleChange(questionId, answerId, value) {
    setQuiz((prevState) =>
      prevState.map((item) => {
        if (item.id === questionId) {
          const updateAnswers = item.answers.map((answer) => ({
            ...answer,
            isClicked: answer.id === answerId,
            userAnswer: answer.id === answerId ? value : answer.userAnswer
          }));

          return {
            ...item,
            answers: updateAnswers,
            userAnswer: value
          };
        }
        return item;
      })
    );
    setClickedAnswers((prevClickedAnswers) => ({
      ...prevClickedAnswers,
      [questionId]: answerId
    }));
  }

  // console.log(quiz);

  return (
    <div>
      {start ? (
        <Questions
          questions={quiz}
          handleChange={handleChange}
          clickedAnswers={clickedAnswers}
          compareAnswers={compareAnswers}
          score={score}
          playAgain={playAgain}
          correctAnswerColor={correctAnswerColor}
          answersChecked={answersChecked}
          toggle={toggle}
          toggleFunc={toggleFunc}
        />
      ) : (
        <Start onClick={handleStart} />
      )}
    </div>
  );
}
