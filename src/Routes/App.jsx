import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Project from "../pages/Project/Project";

const App = () => {
  return (
    <div className="font-montserrat">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="project/1" element={<Project />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
