/* eslint-disable react/prop-types */
import { nanoid } from "nanoid";

export default function Question(props) {
  const answersElements = props.answers.map((item) => {
    let className = "button-label";
    if (props.clickedAnswer === item.id) {
      className += " selected";
    }
    if (props.correctAnswerColor && item.answer === props.correct_answer) {
      className += " correct";
    }
    if (
      props.correctAnswerColor &&
      props.clickedAnswer === item.id &&
      item.answer !== props.correct_answer
    ) {
      className += " incorrect";
    }

    return (
      <label
        key={nanoid()}
        className={className}
        onClick={() =>
          !props.answersChecked &&
          props.handleChange(props.id, item.id, item.answer)
        }
      >
        {item.answer}
      </label>
    );
  });

  return (
    <div>
      <p className="question-number">
        Question {props.questionNumber} of {props.totalQuestions}
      </p>
      <h3 className="questions">{props.question}</h3>
      <div className="answers">{answersElements}</div>
    </div>
  );
}
