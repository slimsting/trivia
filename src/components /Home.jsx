import React from "react";

const Home = ({ handleStart }) => {
  return (
    <div className=" bg-yellow-100 flex flex-col h-screen justify-center items-center ">
      <h1 className=" text-7xl mb-2 font-semibold font-Indie bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Trivia
      </h1>
      <p className="w-[200px] text-center text-sm font-Indie  font-semibold md:w-[300px]">
        Solve trivia questions of your chosen category, difficulty, and type!
      </p>
      <button
        onClick={handleStart}
        className=" mt-2 bg-violet-500 w-36 py-2 rounded-md mx-auto text-white font-semibold hover:bg-violet-400 active:bg-violet-600"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default Home;
