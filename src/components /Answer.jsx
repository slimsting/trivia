import React, { useContext, useState } from "react";
import { QuizCompletedContext } from "./QuizCompletedContext";

const Answer = ({ answer, question, handleChange }) => {
  const isQuizCompleted = useContext(QuizCompletedContext);

  let className = null;

  if (!isQuizCompleted) {
    className =
      answer === question.selectedAnswer
        ? "bg-violet-400 leading-4 py-1 px-3 rounded-md border border-solid border-violet-300"
        : "bg-gray-100 leading-4 py-1 px-3 rounded-md border border-solid border-violet-300 hover:bg-violet-200 active:bg-violet-500";
  } else {
    if (answer === question.correctAnswer) {
      className =
        "bg-green-500 leading-4 py-1 px-3 rounded-md pointer-events-none border border-solid border-violet-300 ";
    } else {
      className =
        answer === question.selectedAnswer
          ? "bg-red-500 leading-4 py-1 px-3 rounded-md opacity-40 pointer-events-none  border border-solid border-violet-300"
          : "bg-gray-300 leading-4 py-1 px-3 rounded-md opacity-40 pointer-events-none  border border-solid border-violet-300";
    }
  }

  return (
    <label className={className}>
      <input
        className="hidden"
        type="radio"
        name={question.id}
        id="heat sink"
        value={answer}
        onChange={(e) => handleChange(e, question.id)}
      />
      {answer}
    </label>
  );
};

export default Answer;
