import React from "react";

const Answer = ({ answer, question }) => {
  console.log(answer);
  return (
    <label className=" bg-gray-300 py-1 px-3 rounded-full hover:bg-gray-200">
      <input className="hidden" type="radio" name={question} id="heat sink" value={}/>
      {answer}
    </label>
  );
};

export default Answer;
