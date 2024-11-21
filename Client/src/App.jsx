import React from "react";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./routes/ErrorPage";
import Home from "./pages/Home";
import Navbar from "./layout/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
