import { useState, useEffect } from "react";
import styles from "./QuestionPage.module.css";

function QuestionPage() {
  const [questions, setQuestions] = useState([
    {
      description: "Placeholder",
      optionOne: "Placeholder",
      optionTwo: "Placeholder",
      optionThree: "Placeholder",
    },
  ]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    const respond = [
      {
        description: "Hvilken af de tre dufte på bordet foretrækker du?",
        optionOne: "Lavendel (Relaxing)",
        optionTwo: "Rose (Self-Love)",
        optionThree: "Citron (Motivation)",
      },

      {
        description: "This is question 2",
        optionOne: "test 2.1",
        optionTwo: "test 2.2",
        optionThree: "test 2.3",
      },
      {
        description: "This is question 3",
        optionOne: "test 3.1",
        optionTwo: "test 3.2",
        optionThree: "test 3.3",
      },
      {
        description: "This is question 4",
        optionOne: "test 4.1",
        optionTwo: "test 4.2",
        optionThree: "test 4.3",
      },
      {
        description: "This is question 5",
        optionOne: "test 5.1",
        optionTwo: "test 5.2",
        optionThree: "test 5.3",
      },
    ];
    setQuestions(respond);
  };

  const finishedQuestionaire = (newAnswers) => {
    console.log(newAnswers);
    // Push answer to database and show end screen, or reset questionaire.
    // setCurrentQuestion(0);
    // setAnswers([]);
    setCurrentQuestion(currentQuestion + 1);
  };

  const selectAnswer = (e, answer) => {
    e.preventDefault();
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion + 2 > questions.length) {
      finishedQuestionaire(newAnswers);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  if (currentQuestion < questions.length) {
    return (
      <div className={styles.mainContainer}>
        <img className={styles.logo} src="logo.png" alt="lealux logo" />

        <h1 className={styles.questionNumber}>
          {`SPØRGSMÅL ${currentQuestion + 1}/${questions.length}`}
        </h1>
        <div className={styles.seperaterBar}></div>
        <h2
          className={styles.questionDescription}
        >{`${questions[currentQuestion].description}`}</h2>
        <div
          className={`${styles.optionBox} ${styles.optionOne}`}
          onClick={(event) => selectAnswer(event, 1)}
        >
          {`${questions[currentQuestion].optionOne}`}
        </div>
        <div
          className={`${styles.optionBox} ${styles.optionTwo}`}
          onClick={(event) => selectAnswer(event, 2)}
        >
          {`${questions[currentQuestion].optionTwo}`}
        </div>
        <div
          className={`${styles.optionBox} ${styles.optionThree}`}
          onClick={(event) => selectAnswer(event, 3)}
        >
          {`${questions[currentQuestion].optionThree}`}
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="58"
          height="58"
          viewBox="0 0 58 58"
          fill="none"
          className={styles.logoSVG}
        >
          <path
            d="M29.1226 1.01318C29.1226 1.01318 23.7654 29.0066 0.887878 29.0066C23.7654 29.0066 29.1226 57.0001 29.1226 57.0001C29.1226 57.0001 34.4799 29.0066 57.3574 29.0066C34.489 29.0066 29.1226 1.01318 29.1226 1.01318Z"
            fill="#6B93AB"
            stroke="#6B93AB"
            stroke-width="0.120661"
            stroke-miterlimit="10"
          />
        </svg>
      </div>
    );
  } else if (currentQuestion === questions.length) {
    return (
      <div className={styles.endContainer}>
        <img className={styles.endLogo} src="endLogo.png" alt="lealux logo" />
        <h1 className={styles.endTitle}>TAK!</h1>
        <div className={styles.seperaterBar2}></div>
        <h2 className={styles.endText}>Din besvarelse er sendt</h2>
      </div>
    );
  }
}

export default QuestionPage;
