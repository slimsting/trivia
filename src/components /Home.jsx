import React from "react";

const Home = ({ handleStart }) => {
  return (
    <div className=" flex flex-col h-screen justify-center items-center ">
      <h1 className=" text-3xl mb-2 font-bold ">Quizzical</h1>
      <p className="w-[300px] text-center text-sm">
        Solve trivia questions of your chosen category, difficulty, and type!
      </p>
      <button
        onClick={handleStart}
        className=" mt-2 bg-blue-800 py-1 px-4 rounded-full font-semibold text-white hover:bg-blue-700 hover:shadow-md"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default Home;
