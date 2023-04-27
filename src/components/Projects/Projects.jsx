import React from "react";
import Identicons from "react-identicons";
import { FaEthereum } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const itemsList = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4];
  return (
    <div className="flex gap-10  justify-center flex-wrap w-full">
      {itemsList.map((e, i) => {
        return <ProjectItem e={e} key={i} />;
      })}
    </div>
  );
};

const ProjectItem = (e) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/project/1")}
      className="cursor-pointer border rounded-lg shadow-lg hover:scale-105 "
    >
      <div className="h-64 w-56 overflow-hidden rounded-lg">
        <img
          className="w-full h-full object-cover"
          src="https://storage.googleapis.com/afs-prod/media/197afa901c1e4170913edd14ec1801f0/400.jpeg"
          alt=""
        />
      </div>
      <div className="flex text-slate-600 text-sm flex-col gap-2 p-4">
        <p className="text-black font-bold">Flood</p>
        <div className="flex text-sm gap-2 items-center">
          <Identicons size={15} string="0x34342" />
          <small>0x24d...69a5</small>
        </div>
        <div>
          <p className="text-sm">Expired</p>
          <div className="w-full bg-slate-300">
            <div className="w-6/12 border-2 border-green-500 "></div>
          </div>
          <div className="flex text-sm font-bold justify-between">
            <small>0.01 ETH Raised</small>
            <small className="flex items-center">
              <FaEthereum /> 2 ETH
            </small>
          </div>
          <div className="flex mt-5 text-sm font-bold justify-between">
            <small>3 Backers</small>
            <small>Open</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
