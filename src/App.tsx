import { useState } from "react";
import { Route, Routes } from "react-router-dom";
// import List from "./components/List";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Routes>
        <Route key="home" path="/" element={<Home />}></Route>
        {/* <Route key="list" path="/list" element={<List />}></Route> */}
      </Routes>
    </>
  );
}

export default App;
