import React, { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import Projects from "../../components/Projects/Projects";
import { MdAdd } from "react-icons/md";
import MainLayout from "../../components/layouts/MainLayout";
import CreateProject from "../../components/Projects/CreateProject";
import { useSelector } from "react-redux";

const Home = () => {
  const [openAddProject, setOpenAddProject] = useState(false);
  const { totalCampaigns, totalEtherDonated } = useSelector(
    (state) => state.nobietyReducer
  );

  return (
    <MainLayout>
      <Hero
        totalCampaigns={totalCampaigns}
        totalEtherDonated={totalEtherDonated}
      />
      <Projects />
      <div className="fixed bottom-0 right-0 m-10">
        <button
          onClick={() => setOpenAddProject(true)}
          className="uppercase focus:outline-none text-sm text-white bg-primary items-center flex justify-center h-12 w-12 rounded-full hover:bg-secondary"
        >
          <MdAdd size={25} />
        </button>
        <CreateProject
          Operation={"Add"}
          setOpen={openAddProject}
          setClose={() => setOpenAddProject(false)}
        />
      </div>
    </MainLayout>
  );
};

export default Home;
