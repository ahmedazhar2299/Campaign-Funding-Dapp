import React, { useState } from "react";
import { BiDonateHeart, BiWallet } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initWeb3 } from "../../store/nobietySlice";
import Wallet from "../Wallet/Wallet";

const Header = () => {
  const navigate = useNavigate();
  const { address } = useSelector((state) => state.nobietyReducer);
  const dispatch = useDispatch();
  const [openWallet, setOpenWallet] = useState(false);
  return (
    <header className=" fixed w-full top-0 z-10 bg-white px-10 flex justify-between py-4 shadow-lg">
      <div
        onClick={() => navigate("/")}
        className="flex uppercase cursor-pointer justify-center items-center gap-2 font-bold text-xl"
      >
        <p>Nobiety</p>
        <BiDonateHeart />
      </div>
      <div className="flex gap-5">
        {address ? (
          <div className="border-0 cursor-pointer bg-gray-600 whitespace-nowrap flex-shrink-0 hover:bg-gray-700 active:bg-gray-700 rounded-full w-36 text-center h-8 flex justify-center items-center">
            <button
              onClick={() => setOpenWallet(true)}
              className="focus:outline-none flex items-center gap-2 font-bold uppercase text-white text-sm"
            >
              <BiWallet className="text-xl" />
              Wallet
            </button>
          </div>
        ) : (
          ""
        )}

        <div className="border-0 cursor-pointer bg-yellow-600 whitespace-nowrap flex-shrink-0 hover:bg-yellow-700 active:bg-yellow-700 rounded-full w-36 text-center h-8 flex justify-center items-center">
          <button
            onClick={() => !address && dispatch(initWeb3())}
            className="focus:outline-none font-bold uppercase text-white text-sm"
          >
            {!address
              ? "Connect Wallet"
              : address.slice(0, 5) + "..." + address.slice(-4)}
          </button>
        </div>
        <Wallet setOpen={openWallet} setClose={() => setOpenWallet(false)} />
      </div>
    </header>
  );
};

export default Header;
