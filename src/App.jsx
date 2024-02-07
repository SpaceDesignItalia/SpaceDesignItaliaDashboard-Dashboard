//Utils
import React from "react";
import { Route, Routes } from "react-router-dom";

//Layout
import Sidebar from "./Components/Global/Sidebar";

//Pages
import Error404 from "./Pages/Errors/Error404";

function App() {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route exact path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
