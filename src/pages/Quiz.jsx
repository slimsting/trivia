import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { decode } from "he";
import { QuizCompletedContext } from "../components /QuizCompletedContext";
import Question from "../components /Question";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components /Loading";

const Quiz = () => {
  const { data } = useParams();

  const options = JSON.parse(data);

  const link = `https://opentdb.com/api.php?amount=${options.numberOfQuestions}${options.category}${options.difficulty}${options.type}`;

  const [again, setAgain] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [database, setDatabase] = useState(null)

  const questionsQuery = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const res = await axios.get(link);
      return res.data;
    },
  });

  if (questionsQuery.isLoading) {
    return <Loading />;
  }

  let questionNumber = 0;

  let quizData = questionsQuery.data.results.map((question) => {
    let allAnswers = question.incorrect_answers.map((answer) => decode(answer));
    const randomIndex = Math.floor(Math.random() * (allAnswers.length + 1));

    console.log(randomIndex);

    allAnswers.splice(randomIndex, 0, decode(question.correct_answer));

    questionNumber++;
    return {
      question: decode(question.question),
      correctAnswer: decode(question.correct_answer),
      allAnswers: allAnswers,
      selectedAnswer: "",
      id: nanoid(),
      questionNumber: questionNumber,
    };
  });

  // setDatabase(quizData)

  function handleChange(e, questionID) {
    const value = e.target.value;

    const newQuizData = quizData.map((question) => {
      if (questionID === question.id) {
        return { ...question, selectedAnswer: value };
      } else {
        return { ...question };
      }
    });

    quizData = newQuizData;
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

  function handlePlayAgain() {
    console.log("play again clicked");
    setIsQuizCompleted(!isQuizCompleted);
    setAgain(!again);
    setScore(0);
  }

  console.table(quizData);
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
          {quizData.length > 0 && (
            <h1 className="mx-auto text-5xl mb-4 font-Indie text-violet-500">
              Questions
            </h1>
          )}

          {questionsEl}

          {!isQuizCompleted && quizData.length > 0 && (
            <button
              onClick={handleCheckAnswers}
              className="bg-violet-500 w-36 px-2 py-2 rounded-md mx-auto text-white font-semibold hover:bg-violet-400 active:bg-violet-600"
            >
              Check Answers
            </button>
          )}
          {isQuizCompleted && (
            <>
              <h1 className="mx-auto mb-3 text-xl text-center text-violet-800 font-semibold">
                You got {score}/{options.numberOfQuestions} right!
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
