import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Project from "../pages/Project/Project";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initWeb3 } from "../store/nobietySlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initWeb3());
  }, [dispatch]);

  return (
    <div className="font-montserrat">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="project/:title" element={<Project />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
