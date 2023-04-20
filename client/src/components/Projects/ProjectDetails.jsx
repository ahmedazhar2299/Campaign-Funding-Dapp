import React, { useState } from "react";
import Identicons from "react-identicons";
import { FaEthereum } from "react-icons/fa";
import ProjectBackers from "./ProjectBackers";
import CreateProject from "./CreateProject";
import DeleteProject from "./DeleteProject";
import BackProject from "./BackProject";

const ProjectDetails = () => {
  const [openProject, setOpenProject] = useState({
    update: false,
    delete: false,
    back: false,
  });

  return (
    <div className="mt-24 lg:mx-40 md:mx-16 mx-10 ">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex justify-center items-center">
          <div className=" overflow-hidden rounded-lg md:w-full w-56 h-56 ">
            <img
              className="w-full h-full object-cover"
              src="https://assets.materialup.com/uploads/d6caaaf9-44d3-4035-9ee4-5ba5130211e0/preview.png"
              alt=""
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="font-bold text-lg">Flood</p>
          <p className="text-xs text-slate-400">Expired</p>
          <div className="flex justify-between w-full">
            <div className="flex text-sm gap-2 items-center">
              <Identicons size={15} string="0x34342" />
              <p>0x24d...69a5</p>
            </div>
            <p className="text-sm font-bold text-red-500">Expired</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">
              User interface (UI) design is the process designers use to build
              interfaces in software or computerized devices, focusing on looks
              or style. Designers aim to create interfaces which users find easy
              to use and pleasurable. UI design refers to graphical user
              interfaces and other forms—e.g., voice-controlled interfaces.
            </p>
          </div>
          <div className="w-full mt-5">
            <div className="w-full bg-slate-300">
              <div className="w-6/12 border-2 border-green-600 "></div>
            </div>
            <div className="flex text-sm font-bold justify-between">
              <p>0.01 ETH Raised</p>
              <p className="flex items-center">
                <FaEthereum /> 2 ETH
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 w-full whitespace-nowrap flex gap-2 justify-center">
        <button
          onClick={() =>
            setOpenProject((e) => {
              return { ...e, back: true };
            })
          }
          className="px-4 py-2 bg-green-500 hover:bg-green-700 text-xs text-white uppercase rounded-full"
        >
          Back Project
        </button>
        <button
          onClick={() =>
            setOpenProject((e) => {
              return { ...e, update: true };
            })
          }
          className="px-4 py-2 bg-stone-500 hover:bg-stone-700 text-xs text-white uppercase rounded-full"
        >
          Edit
        </button>
        <button
          onClick={() =>
            setOpenProject((e) => {
              return { ...e, delete: true };
            })
          }
          className="px-4 py-2 bg-red-500 hover:bg-red-700 text-xs text-white uppercase rounded-full"
        >
          Delete
        </button>
        <button className="px-4 py-2 bg-orange-500 hover:bg-orange-700 text-xs text-white uppercase rounded-full">
          Payout
        </button>
        <CreateProject
          Operation={"Update"}
          setOpen={openProject.update}
          setClose={() =>
            setOpenProject((e) => {
              return { ...e, update: false };
            })
          }
        />
        <DeleteProject
          setOpen={openProject.delete}
          setClose={() =>
            setOpenProject((e) => {
              return { ...e, delete: false };
            })
          }
        />
        <BackProject
          setOpen={openProject.back}
          setClose={() =>
            setOpenProject((e) => {
              return { ...e, back: false };
            })
          }
        />
      </div>
      <div>
        <ProjectBackers />
      </div>
    </div>
  );
};

export default ProjectDetails;
