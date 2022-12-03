import React from "react";
import { ToastContainer } from "react-toastify";

import MainRoute from "./router/MainRoute";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <MainRoute />
      <ToastContainer />
    </>
  );
};

export default App;
