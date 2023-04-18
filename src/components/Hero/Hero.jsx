import React from "react";

const Hero = () => {
  return (
    <div className="pt-24 m-10 text-center">
      <div>
        <p className="text-4xl md:text-5xl lg:text-6xl font-bold leading-snug ">
          Bring Creative Projects to Life on{" "}
          <p className="text-green-600 uppercase my-2">Genesis.</p>{" "}
        </p>
      </div>
      <div className="my-10 flex flex-shrink-0 gap-2 justify-center">
        <button className="rounded-full shrink-0 focus:outline-none uppercase text-sm text-white bg-green-600 hover:bg-green-700 w-36 h-8">
          Add Project
        </button>
        <button className=" border shrink-0 border-green-600 rounded-full focus:outline-none uppercase text-sm text-green-600 bg-white hover:text-white hover:bg-green-700 w-36 h-8">
          Back Projects
        </button>
      </div>
      <div className="flex justify-evenly shadow-lg whitespace-nowrap">
        <div className="border w-full p-4 ">
          <p className="font-bold">151</p>
          <p>Projects</p>
        </div>
        <div className="border w-full p-4 ">
          <p className="font-bold">69</p>
          <p>Backings</p>
        </div>
        <div className="border w-full p-4 ">
          <p className="font-bold">1.846 ETH</p>
          <p>Donated</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
