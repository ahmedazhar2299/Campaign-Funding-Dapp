import React from "react";
import { TbBusinessplan } from "react-icons/tb";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className=" fixed w-full top-0 bg-white px-10 flex justify-between py-4 shadow-lg">
      <Link
        to={"/"}
        className="flex cursor-pointer justify-center items-center gap-2 font-bold text-xl"
      >
        <p>Genesis</p>
        <TbBusinessplan />
      </Link>
      <div className="border-0 cursor-pointer bg-green-600 whitespace-nowrap flex-shrink-0 hover:bg-green-700 active:bg-green-700 rounded-full w-36 text-center h-8 flex justify-center items-center">
        <button className="focus:outline-none uppercase text-white text-sm">
          Connect Wallet
        </button>
      </div>
    </header>
  );
};

export default Header;
