import React, { memo, useState } from "react";
import CreateProject from "../Projects/CreateProject";

const Hero = memo(({ totalCampaigns, totalEtherDonated }) => {
  const [openAddProject, setOpenAddProject] = useState(false);
  const handleAddProjectOpen = () => setOpenAddProject(true);
  const handleAddProjectClose = () => setOpenAddProject(false);
  return (
    <div className="pt-24 m-10 text-center">
      <div>
        <p className="text-4xl md:text-5xl lg:text-6xl font-bold leading-snug ">
          Unleash the power of generosity with{" "}
          <p className="text-yellow-600 uppercase my-2">Nobeity.</p>{" "}
        </p>
      </div>
      <div className="my-10 flex flex-shrink-0 gap-2 justify-center">
        <button
          onClick={handleAddProjectOpen}
          className="rounded-full shrink-0 focus:outline-none uppercase text-sm text-white bg-yellow-600 hover:bg-yellow-700 w-36 h-8"
        >
          Add Project
        </button>
        <button className=" border shrink-0 border-yellow-600 rounded-full focus:outline-none uppercase text-sm text-yellow-600 bg-white hover:text-white hover:bg-yellow-700 w-36 h-8">
          Back Projects
        </button>
        <CreateProject
          Operation={"Add"}
          setOpen={openAddProject}
          setClose={handleAddProjectClose}
        />
      </div>
      <div className="flex justify-evenly shadow-lg whitespace-nowrap">
        <div className="border w-full p-4 ">
          <p className="font-bold">{totalCampaigns ? totalCampaigns : 0}</p>
          <p>Projects</p>
        </div>
        <div className="border w-full p-4 ">
          <p className="font-bold">
            {totalEtherDonated ? totalEtherDonated : 0} ETH
          </p>
          <p>Donated</p>
        </div>
      </div>
    </div>
  );
});

export default Hero;
