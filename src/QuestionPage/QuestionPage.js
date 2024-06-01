import { useState, useEffect, useRef } from "react";
import { getQuestions } from "./getQuestions";
import { postAnswers } from "./postAnswers";
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
  const [restartCounter, setRestartCounter] = useState(0);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const svgRef = useRef(null);

  useEffect(() => {
    setQuestions(getQuestions());
  }, []);

  const startOver = () => {
    if (answers.length > 0) {
      return;
    }
    if (restartCounter > 1) {
      setIsEnlarged(false);
      setCurrentQuestion(0);
      setRestartCounter(0);
    } else {
      setRestartCounter(restartCounter + 1);
    }
  };

  const finishedQuestionaire = async (answers) => {
    // Push answer to database and show end screen, or reset questionaire.
    console.log(answers);
    try {
      await postAnswers(answers);
      setAnswers([]);
    } catch (error) {
      console.error("An error occured while trying to post answers", error);
      setAnswers([]);
    }
    setIsEnlarged(true);
    setTimeout(() => {
      setCurrentQuestion(currentQuestion + 1);
    }, 800);
    // setCurrentQuestion(0);
  };

  const selectAnswer = async (e, answer) => {
    e.preventDefault();
    if (answers.length === 5) return;
    const newAnswers = [...answers, answer];
    await setAnswers(newAnswers);

    if (currentQuestion + 2 > questions.length) {
      await finishedQuestionaire(newAnswers);
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
        {(() => {
          if (currentQuestion === 0) {
            return (
              <h2
                className={`${styles.questionOne} ${styles.questionDescription}`}
              >
                Hvad forbinder du{" "}
                <strong>
                  <u>mest</u>
                </strong>{" "}
                med duften af Citron?
              </h2>
            );
          }
          if (currentQuestion === 1) {
            return (
              <h2
                className={`${styles.questionTwo} ${styles.questionDescription}`}
              >
                Hvilken af de to dufte på bordet foretrækker du?
              </h2>
            );
          }
          if (currentQuestion === 2) {
            return (
              <h2
                className={`${styles.questionThree} ${styles.questionDescription}`}
              >
                Hvornår bruger du levende lys?
              </h2>
            );
          }
          if (currentQuestion === 3) {
            return (
              <h2
                className={`${styles.questionFour} ${styles.questionDescription}`}
              >
                Hvad er det{" "}
                <strong>
                  <u>vigtigste</u>
                </strong>{" "}
                for dig når du køber lys?
              </h2>
            );
          }
          if (currentQuestion === 4) {
            return (
              <h2
                className={`${styles.questionFive} ${styles.questionDescription}`}
              >
                Hvad gør du for at slappe af?
              </h2>
            );
          }
        })()}
        {/* <h2
          className={styles.questionDescription}
        >{`${questions[currentQuestion].description}`}</h2> */}
        <div
          className={`${styles.optionBox} ${styles.optionOne}`}
          onClick={(event) => {
            if (currentQuestion === 4) setIsEnlarged(true);
            selectAnswer(event, 1);
          }}
        >
          {`${questions[currentQuestion].optionOne}`}
        </div>
        <div
          className={`${styles.optionBox} ${styles.optionTwo}`}
          onClick={(event) => {
            if (currentQuestion === 4) setIsEnlarged(true);
            selectAnswer(event, 2);
          }}
        >
          {`${questions[currentQuestion].optionTwo}`}
        </div>

        {(() => {
          if (questions[currentQuestion].optionThree) {
            return (
              <div
                className={`${styles.optionBox} ${styles.optionThree}`}
                onClick={(event) => {
                  if (currentQuestion === 4) setIsEnlarged(true);
                  selectAnswer(event, 3);
                }}
              >
                {`${questions[currentQuestion].optionThree}`}
              </div>
            );
          }
        })()}
        {(() => {
          if (questions[currentQuestion].optionFour) {
            return (
              <div
                className={`${styles.optionBox} ${styles.optionFour}`}
                onClick={(event) => {
                  if (currentQuestion === 4) setIsEnlarged(true);
                  selectAnswer(event, 4);
                }}
              >
                {`${questions[currentQuestion].optionFour}`}
              </div>
            );
          }
        })()}
        {(() => {
          if (questions[currentQuestion].optionFive) {
            return (
              <div
                className={`${styles.optionBox} ${styles.optionFive}`}
                onClick={(event) => {
                  if (currentQuestion === 4) setIsEnlarged(true);
                  selectAnswer(event, 5);
                }}
              >
                {`${questions[currentQuestion].optionFive}`}
              </div>
            );
          }
        })()}

        <svg
          // width="58"
          // height="58"
          ref={svgRef}
          viewBox="0 0 58 58"
          fill="none"
          className={`${styles.logoSVG} ${
            isEnlarged ? `${styles.enlarged}` : ""
          }`}
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
      <div className={styles.endContainer} onClick={() => startOver()}>
        <img
          className={`${styles.endLogo} ${styles.endAnimation}`}
          src="endLogo.png"
          alt="lealux logo"
        />
        <h1 className={`${styles.endTitle} ${styles.endAnimation}`}>TAK!</h1>
        <div className={`${styles.seperaterBar2} ${styles.endAnimation}`}></div>
        <h2 className={`${styles.endText} ${styles.endAnimation}`}>
          Din besvarelse er sendt
        </h2>
      </div>
    );
  }
}

export default QuestionPage;
