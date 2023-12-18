import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { decode } from "he";
import { QuizCompletedContext } from "./QuizCompletedContext";
import Question from "./Question";

const Quiz = ({ options, handlePlayAgain }) => {
  const link = `https://opentdb.com/api.php?amount=${options.numberOfQuestions}${options.category}${options.difficulty}${options.type}`;

  console.log(link);

  const [quizData, setQuizdata] = useState([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  useEffect(() => {
    try {
      async function initializeQuiz() {
        const res = await fetch(link);
        const data = await res.json();

        const reformattedData = data.results.map((question) => {
          //decode incorrect answers in the array in each question object
          const decodedIncorrectAnswers = question.incorrect_answers.map(
            (answer) => {
              return decode(answer);
            }
          );

          // initialize array for all answers with the incorrect answers
          let allAnswers = decodedIncorrectAnswers;
          const randomIndex = Math.floor(
            Math.random() * (allAnswers.length + 1)
          );

          // add the correct answer to a random index in the array for all answers
          allAnswers.splice(randomIndex, 0, decode(question.correct_answer));

          return {
            question: decode(question.question),
            correctAnswer: decode(question.correct_answer),
            allAnswers: allAnswers,
            selectedAnswer: "",
            id: nanoid(),
          };
        });

        setQuizdata(reformattedData);
      }

      initializeQuiz();
    } catch (err) {
      console.log("An error has occured while trying to retrieve data" + err);
    }
  }, []);

  function handleChange(e, questionID) {
    const value = e.target.value;

    const newQuizData = quizData.map((question) => {
      if (questionID === question.id) {
        return { ...question, selectedAnswer: value };
      } else {
        return { ...question };
      }
    });

    setQuizdata(newQuizData);
    console.table(quizData);
    console.log(value);
  }

  function handleCheckAnswers() {
    setIsQuizCompleted(!isQuizCompleted);

    let score = 0;

    for (let question of quizData) {
      if (question.correctAnswer === question.selectedAnswer) {
        score++;
      }
    }
    setScore(score);
  }

  const questionsEl = quizData.map((question) => {
    return (
      <Question
        key={question.id}
        question={question}
        handleChange={handleChange}
      />
    );
  });

  return (
    <QuizCompletedContext.Provider value={isQuizCompleted}>
      <div className="bg-yellow-100 min-h-screen flex items-center justify-center">
        <div className=" min-h-screen p-8 flex flex-col max-w-[800px] mx-auto bg-yellow-100">
          {questionsEl}
          {!isQuizCompleted && quizData.length > 0 && (
            <button
              onClick={handleCheckAnswers}
              className="bg-violet-500 w-36 px- py-2 rounded-md mx-auto text-white font-semibold hover:bg-violet-400 active:bg-violet-600"
            >
              Check Answers
            </button>
          )}
          {isQuizCompleted && (
            <>
              <h1 className="mx-auto mb-3 text-xl text-center text-violet-800 font-semibold">
                You scored {score}/{options.numberOfQuestions} correct answers!
              </h1>
              <button
                onClick={handlePlayAgain}
                className="bg-violet-500 w-36 py-2 rounded-md mx-auto text-white font-semibold hover:bg-violet-400 active:bg-violet-600"
              >
                Play Again
              </button>
            </>
          )}
        </div>
      </div>
    </QuizCompletedContext.Provider>
  );
};

export default Quiz;
