import React from "react";
import Header from "../Header/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="relative ">
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
