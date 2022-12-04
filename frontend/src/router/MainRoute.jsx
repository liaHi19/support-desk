import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NewTicket from "../pages/NewTicket";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";

const MainRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="new-ticket" element={<PrivateRoute />} >
            <Route index element={<NewTicket />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoute;
