import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import React from "react";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Error from "../pages/Error";

export default function Rotas() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} exact/>
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<Error />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}
