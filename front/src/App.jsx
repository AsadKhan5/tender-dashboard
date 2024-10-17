import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./assets/components/Pages/Login/Login";
import AuthLayout from "./assets/components/Layouts/AuthLayout";
import DashboardLayout from "./assets/components/Layouts/DashboardLayout";
import ManageDevice from "./assets/components/Pages/ManageDevices";

import "./App.css";
import TenderDashboard from "./assets/components/Pages/TenderDashboard";
import CreateTender from "./assets/components/Pages/CreateTender";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        {/* public routes */}
        <Route path="/login" element={<Login />} />

        {/* we want to protect these routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/tenderdashboard" element={<TenderDashboard />} />
          <Route path="/create-tender" element={<CreateTender />} />
          <Route path="/manageBids" element={<ManageDevice />} />
          {/*  
          <Route path="logout" element={<Logout />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
