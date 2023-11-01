import React from "react";
import { nanoid } from "nanoid";


export default function Question(props) {
  const answerElements = props.answers.map((answer) => {
    const isClicked = answer.id === props.clickedAnswer;
    const isCorrect = answer.answer === props.correct_answer;

    const styles = {
      backgroundColor:
        isClicked && props.answersChecked
          ? "#94D7A2"
          : isCorrect && props.correctAnswerColor
          ? "#F8BCBC"
          : isClicked
          ? "#D6DBF5"
          : "#f5f7fb",
      pointerEvents: props.answersChecked ? "none" : "auto",
      color : props.toggle ? "black" : ""
    };

    return (
      <button
        key={answer.id}
        className="button-label"
        style={styles}
        onClick={() => props.handleChange(props.id, answer.id, answer.answer)}
      >
        {answer.answer}
      </button>
    );
  });

  return (
    <div>
      <p className="questions" style={{ color: props.toggle ? "white" : "" }}>
        {props.question}
      </p>
      <div className="answers">{answerElements}</div>
      <hr />
    </div>
  );
}
