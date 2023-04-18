import React from "react";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Projects from "../../components/Projects/Projects";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Projects />
    </div>
  );
};

export default Home;
