import React, { useState } from "react";
import Hero from "../../components/Hero/Hero";
import Projects from "../../components/Projects/Projects";
import { MdAdd } from "react-icons/md";
import MainLayout from "../../components/layouts/MainLayout";
import CreateProject from "../../components/Projects/CreateProject";

const Home = () => {
  const [openAddProject, setOpenAddProject] = useState(false);
  return (
    <MainLayout>
      <Hero />
      <Projects />
      <div className="my-10 w-full text-center ">
        <button className="uppercase focus:outline-none text-sm text-white bg-primary w-32 h-8 rounded-full hover:bg-secondary">
          Load More
        </button>
      </div>
      <div className="fixed bottom-0 right-0 m-10">
        <button className="uppercase focus:outline-none text-sm text-white bg-primary items-center flex justify-center h-12 w-12 rounded-full hover:bg-secondary">
          <MdAdd onClick={() => setOpenAddProject(true)} size={25} />
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
