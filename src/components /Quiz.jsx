import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Question from "./Question";
import { decode } from "he";

const Quiz = ({ options }) => {
  console.log(options);
  const link = `https://opentdb.com/api.php?amount=${options.numberOfQuestions}${options.category}${options.difficulty}${options.type}`;

  console.log(link);
  const [quizData, setQuizdata] = useState([]);
  useEffect(() => {
    async function initializeQuiz() {
      const res = await fetch(link);
      const data = await res.json();
      // console.table(data.results);

      const reformattedData = data.results.map((question) => {
        const decodedIncorrectAnswers = question.incorrect_answers.map(
          (answer) => {
            return decode(answer);
          }
        );
        let allAnswers = decodedIncorrectAnswers;
        const randomIndex = Math.floor(Math.random() * (allAnswers.length + 1));

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
  }, []);

  const questionsEl = quizData.map((question) => {
    return <Question key={question.id} question={question} />;
  });

  return (
    <div className=" h-screen p-11 flex flex-col max-w-[800px] mx-auto bg-white">
      {questionsEl}
    </div>
  );
};

export default Quiz;
