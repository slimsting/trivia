import React, { useContext } from "react";
import Answer from "./Answer";

const Question = ({ question, handleChange }) => {
  const answersEl = question.allAnswers.map((answer) => {
    return (
      <Answer
        key={answer}
        answer={answer}
        question={question}
        handleChange={handleChange}
      />
    );
  });
  return (
    <div className="mb-4">
      <h2 className="font-semibold">{`${question.questionNumber}. ${question.question}`}</h2>
      <div className="mt-2 flex flex-wrap gap-2">{answersEl}</div>
      <hr className="mt-4 border-t border-violet-300" />
    </div>
  );
};

export default Question;
