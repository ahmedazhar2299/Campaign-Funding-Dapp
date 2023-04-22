import React, { useEffect, useState } from "react";
import Identicons from "react-identicons";
import { FaEthereum } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCampaigns, getBackers } from "../../store/nobietySlice";

const Projects = () => {
  const { allCampaignList } = useSelector((state) => state.nobietyReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getAllCampaigns());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="flex gap-10  justify-center flex-wrap w-full">
      {allCampaignList.map((data, i) => {
        return <ProjectItem data={data} key={i} />;
      })}
    </div>
  );
};

const ProjectItem = (data) => {
  const navigate = useNavigate();
  const { backerList } = useSelector((state) => state.nobietyReducer);
  const percentageRaised =
    (parseInt(data.data.raisedAmount) / parseInt(data.data.amount)) * 100;
  const progressBarWidth = Math.ceil((percentageRaised / 100) * 12);
  return (
    <div
      onClick={() =>
        navigate("/project/1", {
          state: data.data,
        })
      }
      className="cursor-pointer border rounded-lg shadow-lg hover:scale-105 "
    >
      <div className="h-64 w-56 overflow-hidden rounded-lg">
        <img
          className="w-full h-full object-cover"
          src={data.data.url}
          alt=""
        />
      </div>
      <div className="flex text-slate-600 text-sm flex-col gap-2 p-4">
        <p className="text-black font-bold">{data.data.title}</p>
        <div className="flex text-sm gap-2 items-center">
          <Identicons size={15} string="0x34342" />
          <small>
            {data.data.owner.slice(0, 5) + " ... " + data.data.owner.slice(-6)}
          </small>
        </div>
        <div>
          <p className="text-sm">{data.data.status}</p>
          <div className="w-full bg-slate-300">
            <div
              className={`border-2 border-green-600 ${
                progressBarWidth === 0 ? "w-0" : "w-" + progressBarWidth + "/12"
              }`}
            ></div>
          </div>
          <div className="flex text-sm font-bold justify-between">
            <small>{data.data.raisedAmount} ETH Raised</small>
            <small className="flex items-center">
              <FaEthereum /> {data.data.amount} ETH
            </small>
          </div>
          <div className="flex mt-5 text-sm font-bold justify-between">
            <small>{backerList.length} Backers</small>
            <small>Open</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
