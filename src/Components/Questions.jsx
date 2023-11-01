import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";


export default function Questions(props) {
  const elements = props.questions.map((qn) => {
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
        toggle={props.toggle}
      />
    );
  });

  const styles = {
    backgroundColor: props.toggle ? "#616161" : ""
  };

  const buttonStyles = {
    backgroundColor : props.toggle ? "white" : "",
    color : props.toggle ? "#616161" : ""
  }

  // console.log(props.score)

  return (
    <>
      <span>Dark/Light Mode</span>
      <div
        className="toggle-container"
        onClick={props.toggleFunc}
        style={{
          backgroundColor: props.toggle ? "black" : "white",
          marginTop: "5px"
        }}
      >
        <div
          className="toggle-button"
          style={{
            transform: props.toggle ? "rotateY(180deg)" : "",
            backgroundColor: props.toggle ? "white" : "black"
          }}
        ></div>
      </div>
      <main style={styles} className="question-main">
        {elements}
        {props.score === null && (
          <button className="check-answers" onClick={props.compareAnswers} style={buttonStyles}>
            Check Answers
          </button>
        )}

        {props.score !== null && (
          <>
            <p
              className="result"
              style={{ color: props.toggle ? "white" : "" }}
            >
              You scored {props.score}/{props.questions.length}
            </p>
            <button className="check-answers" onClick={props.playAgain} style={buttonStyles}>
              Play again
            </button>
          </>
        )}
      </main>
    </>
  );
}
