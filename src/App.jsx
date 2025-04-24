import React from "react";
import Questions from "./Components/Questions";
import Start from "./Components/Start";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import VanillaTilt from "vanilla-tilt";

export default function App() {
  const [quiz, setQuiz] = React.useState([]);
  const [start, setStart] = React.useState(false);
  const [clickedAnswers, setClickedAnswers] = React.useState({});
  const [score, setScore] = React.useState(null);
  const [correctAnswerColor, setCorrectAnswerColor] = React.useState(false);
  const [answersChecked, setAnswersChecked] = React.useState(false);
  const [play, setPlay] = React.useState(false);

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
      isClicked: false,
    }));

    for (let i = all_answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answerObjects[i], answerObjects[j]] = [
        answerObjects[j],
        answerObjects[i],
      ];
    }

    return {
      question: question,
      correct_answer: correct_answer,
      answers: answerObjects,
      userAnswer: "",
      score: null,
      id: nanoid(),
    };
  }

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => setQuiz(data.results.map(getQuestions)));
  }, []);

  React.useEffect(() => {
    // Initialize particle background
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 50 : 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.01;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = "rgba(165, 243, 252, 0.8)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.size <= 0.2) {
          particles.splice(index, 1);
          particles.push(new Particle());
        }
      });
      requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    // Initialize VanillaTilt
    const tiltElements = document.querySelectorAll(".quiz-div, .question-main");
    VanillaTilt.init(tiltElements, {
      max: 8, // Reduced from 10 for subtler tilt
      speed: 400,
      glare: true,
      "max-glare": 0.3,
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
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

  function compareAnswers() {
    const correct_answer = quiz.map((item) => item.correct_answer);
    const user_answer = quiz.map((item) => item.userAnswer);

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
            userAnswer: answer.id === answerId ? value : answer.userAnswer,
          }));

          return {
            ...item,
            answers: updateAnswers,
            userAnswer: value,
          };
        }
        return item;
      })
    );
    setClickedAnswers((prevClickedAnswers) => ({
      ...prevClickedAnswers,
      [questionId]: answerId,
    }));
  }

  return (
    <div className="app-container">
      <canvas id="particle-canvas"></canvas>
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
        />
      ) : (
        <Start onClick={handleStart} />
      )}
    </div>
  );
}
