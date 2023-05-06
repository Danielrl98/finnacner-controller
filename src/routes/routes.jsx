import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import React from "react";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Error from "../pages/Error";
import Dashboard from "../pages/dashboard/dashboard";
import Addrelease  from "../pages/Release/Addrelease/Addrelease";
import ListRelease from "../pages/Release/listRelease/listRelease";
import EditRelease from "../pages/Release/editRelease/editRelease";
import AddClient from "../pages/clients/addClient/addClient";
import ListClient from "../pages/clients/listClient/listClient";
import ReportClient from "../pages/reports/report-client/report-client";

export default function Rotas() {
 
    return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} exact/>
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/release/" element={<ListRelease  />} />
          <Route path="/release/create" element={<Addrelease />} />
          <Route path='/release/edit' element={<EditRelease />} />
          <Route path="/clients/" element={<ListClient />} />
          <Route path="/clients/create" element={<AddClient />} />
          <Route path="/reports" element={<ReportClient />} />

          <Route path="/404" element={<Error />} />
          <Route path="*" element={<Navigate to="/404" />} />
 
        </Routes>
      </Router>
    </React.Fragment>
  );
}
