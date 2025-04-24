/* eslint-disable react/prop-types */

export default function Start(props) {
  return (
    <>
      <div className="quiz-div">
        <div className="quiz-icon">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
              fill="var(--accent-color)"
            />
          </svg>
        </div>
        <h1 className="quiz-head">Quizzical</h1>
        <p className="quiz-subtitle">
          Test your knowledge with fun and challenging questions!
        </p>
        <button className="quiz-button" onClick={props.onClick}>
          Start Quiz
        </button>
      </div>
    </>
  );
}
