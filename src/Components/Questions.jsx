/* eslint-disable react/prop-types */
import Question from "./Question";
import { nanoid } from "nanoid";

export default function Questions(props) {
  const elements = props.questions.map((qn, index) => {
    const id = nanoid();
    return (
      <Question
        key={id}
        question={qn.question}
        answers={qn.answers}
        correct_answer={qn.correct_answer}
        id={qn.id}
        handleChange={props.handleChange}
        isClicked={qn.isClicked}
        clickedAnswer={props.clickedAnswers[qn.id]}
        correctAnswerColor={props.correctAnswerColor}
        answersChecked={props.answersChecked}
        questionNumber={index + 1}
        totalQuestions={props.questions.length}
      />
    );
  });

  const answeredQuestions = Object.keys(props.clickedAnswers).length;
  const totalQuestions = props.questions.length;

  return (
    <main className="question-main">
      <div className="progress-indicator">
        Progress: {answeredQuestions}/{totalQuestions}
      </div>
      {elements}
      {props.score === null && (
        <button className="check-answers" onClick={props.compareAnswers}>
          Check Answers
        </button>
      )}
      {props.score !== null && (
        <>
          <p className="result">
            You scored {props.score}/{props.questions.length}
          </p>
          <button className="check-answers" onClick={props.playAgain}>
            Play Again
          </button>
        </>
      )}
    </main>
  );
}
