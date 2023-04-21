import React from "react";
import { TbBusinessplan } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initWeb3 } from "../../store/nobietySlice";

const Header = () => {
  const navigate = useNavigate();
  const { address } = useSelector((state) => state.nobietyReducer);
  const dispatch = useDispatch();
  return (
    <header className=" fixed w-full top-0 z-10 bg-white px-10 flex justify-between py-4 shadow-lg">
      <div
        onClick={() => navigate("/")}
        className="flex cursor-pointer justify-center items-center gap-2 font-bold text-xl"
      >
        <p>Genesis</p>
        <TbBusinessplan />
      </div>
      <div className="border-0 cursor-pointer bg-green-600 whitespace-nowrap flex-shrink-0 hover:bg-green-700 active:bg-green-700 rounded-full w-36 text-center h-8 flex justify-center items-center">
        <button
          onClick={() => !address && dispatch(initWeb3())}
          className="focus:outline-none font-bold uppercase text-white text-sm"
        >
          {!address
            ? "Connect Wallet"
            : address.slice(0, 5) + "..." + address.slice(-4)}
        </button>
      </div>
    </header>
  );
};

export default Header;
