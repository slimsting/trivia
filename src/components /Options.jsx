import React, { useState } from "react";
import Quiz from "./Quiz";

const Options = () => {
  const [options, setOptions] = useState({
    category: "",
    difficulty: "",
    type: "",
    numberOfQuestions: "5",
  });

  const [isQuizStarted, setIsQuizStarted] = useState(false);

  function startQuiz() {
    setIsQuizStarted(!isQuizStarted);
  }

  function handlePlayAgain() {
    setIsQuizStarted(false);
  }

  return (
    <>
      {!isQuizStarted && (
        <form className="flex flex-col bg-yellow-100 h-screen justify-center items-center text-normal p-12">
          <h1 className=" font-Indie font-medium text-5xl mb-8 text-violet-500">
            Settings
          </h1>
          <label className="flex flex-col gap-1 justify-center items-center ">
            <span className="font-semibold">Select Category:</span>
            <select
              className=" rounded-md px-1 py-1 w-[200px]  border border-solid border-violet-400 text-violet-600 md:w-fit"
              name="category"
              id="category"
              value={options.category}
              onChange={(e) =>
                setOptions({ ...options, category: e.target.value })
              }
            >
              <option value=" ">Any Category</option>
              <option value="&category=9">General Knowledge</option>
              <option value="&category=10">Entertainment: Books</option>
              <option value="&category=11">Entertainment: Film</option>
              <option value="&category=12">Entertainment: Music</option>
              <option value="&category=13">
                Entertainment: Musicals & Theatres
              </option>
              <option value="&category=14">Entertainment: Television</option>
              <option value="&category=15">Entertainment: Video Games</option>
              <option value="&category=16">Entertainment: Board Games</option>
              <option value="&category=17">Science & Nature</option>
              <option value="&category=18">Science: Computers</option>
              <option value="&category=19">Science: Mathematics</option>
              <option value="&category=20">Mythology</option>
              <option value="&category=21">Sports</option>
              <option value="&category=22">Geography</option>
              <option value="&category=23">History</option>
              <option value="&category=24">Politics</option>
              <option value="&category=25">Art</option>
              <option value="&category=26">Celebrities</option>
              <option value="&category=27">Animals</option>
              <option value="&category=28">Vehicles</option>
              <option value="&category=29">Entertainment: comics</option>
              <option value="&category=30">Science: Gadgets</option>
              <option value="&category=31">
                Entertainment: Japanese Anime & Manga
              </option>
              <option value="&category=32">
                Entertainment: Cartoon & Animations
              </option>
            </select>
          </label>

          <label className="mt-4 flex flex-col justify-center items-center ">
            <span className="mb-1 font-semibold">Select Difficulty: </span>
            <select
              className="rounded-md px-1 py-1 border border-solid text-violet-600 border-violet-400"
              name="difficulty"
              id="difficulty"
              value={options.difficulty}
              onChange={(e) =>
                setOptions({ ...options, difficulty: e.target.value })
              }
            >
              <option value=" ">Any Difficulty</option>
              <option value="&difficulty=easy">Easy</option>
              <option value="&difficulty=medium">Medium</option>
              <option value="&difficulty=hard">Difficult</option>
            </select>
          </label>

          <label className="mt-4 flex flex-col justify-center items-center">
            <span className="mb-1 font-semibold">Type:</span>
            <select
              className="rounded-md px-1 py-1 border border-solid text-violet-600 border-violet-400 "
              name="type"
              id="type"
              value={options.type}
              onChange={(e) => setOptions({ ...options, type: e.target.value })}
            >
              <option value=" ">Any Type</option>
              <option value="&type=multiple">Multipe Choice</option>
              <option value="&type=boolean">True/False</option>
            </select>
          </label>

          <label className="mt-4 flex flex-col justify-center items-center">
            <span className="mb-1 font-semibold">Number of Questions: </span>

            <input
              className="rounded-md px-1 py-1 border border-solid text-violet-600 border-violet-400 "
              type="number"
              id="numberOfQuestions"
              name="numberOfQuestions"
              min="1"
              max="20"
              placeholder="1-20"
              value={options.numberOfQuestions}
              onChange={(e) =>
                setOptions({ ...options, numberOfQuestions: e.target.value })
              }
            />
          </label>
          <button
            className="mt-4 bg-violet-500 w-36 px- py-2 rounded-md mx-auto text-white font-semibold hover:bg-violet-400 active:bg-violet-600"
            onClick={startQuiz}
          >
            Proceed
          </button>
        </form>
      )}
      {isQuizStarted && (
        <Quiz options={options} handlePlayAgain={handlePlayAgain} />
      )}
    </>
  );
};

export default Options;
