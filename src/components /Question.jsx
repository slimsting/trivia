import React from "react";
import Answer from "./Answer";

const Question = ({ question }) => {
  const answersEl = question.allAnswers.map((answer) => {
    return <Answer key={answer} answer={answer} question={question.question} />;
  });
  return (
    <div className="mb-4">
      <h2>{question.question}</h2>
      <div className="mt-2 flex flex-wrap gap-2">{answersEl}</div>
      <hr className="mt-4" />
    </div>
  );
};

export default Question;
