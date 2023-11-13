import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./Pages/Home/Home";
import ParentDashboard from "./Pages/ParentDashboard/ParentDashboard";

function App() {


  return (
    <React.Fragment>
        <Routes>
        <Route path="/dashboard" element={<ParentDashboard />} />
        <Route path="/" element={<Home />} />
        </Routes>
    </React.Fragment>
  );
}

export default App;
