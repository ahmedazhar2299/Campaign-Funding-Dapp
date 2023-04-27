import React, { useState } from "react";
import { BiDonateHeart, BiWallet } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Wallet from "../../Wallet/Wallet";

const Header = () => {
  const navigate = useNavigate();
  const [openWallet, setOpenWallet] = useState(false);
  return (
    <header className=" fixed w-full top-0 z-10 bg-white px-10 flex justify-between py-4 shadow-lg">
      <div
        onClick={() => navigate("/")}
        className="flex cursor-pointer justify-center items-center gap-2 font-bold text-xl"
      >
        <p>Nobiety</p>
        <BiDonateHeart />
      </div>
      <div className="flex gap-5">
        <div className="border-0 cursor-pointer bg-gray-500 whitespace-nowrap flex-shrink-0 hover:bg-gray-700 active:bg-secondary rounded-full w-36 text-center h-8 flex justify-center items-center">
          <button
            onClick={() => setOpenWallet(true)}
            className="focus:outline-none flex items-center gap-2 font-bold uppercase text-white text-sm"
          >
            <BiWallet className="text-xl" />
            Wallet
          </button>
        </div>
        <div className="border-0 cursor-pointer bg-green-600 whitespace-nowrap flex-shrink-0 hover:bg-green-700 active:bg-green-800 rounded-full w-36 text-center h-8 flex justify-center items-center">
          <button className="focus:outline-none font-bold uppercase text-white text-sm">
            Connect Wallet
          </button>
        </div>
        <Wallet setOpen={openWallet} setClose={() => setOpenWallet(false)} />
      </div>
    </header>
  );
};

export default Header;
