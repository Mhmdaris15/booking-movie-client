import React from "react";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { ToastContainer } from "react-toastify";
const Home = () => {
  return (
    <div>
      <Cards />
      <ToastContainer />
    </div>
  );
};

export default Home;
