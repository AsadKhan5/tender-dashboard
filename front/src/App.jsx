import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./assets/components/Pages/Login/Login";
import AuthLayout from "./assets/components/Layouts/AuthLayout";
import DashboardLayout from "./assets/components/Layouts/DashboardLayout";

import TenderDashboard from "./assets/components/Pages/TenderDashboard";
import CreateTender from "./assets/components/Pages/CreateTender";
import Signup from "./assets/components/Pages/Signup";
import ManageBids from "./assets/components/Pages/ManageBids";
import UserPanel from "./assets/components/Pages/UserPanel";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* we want to protect these routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/tenderdashboard" element={<TenderDashboard />} />
          <Route path="/create-tender" element={<CreateTender />} />
          <Route path="/manageBids" element={<ManageBids />} />
          <Route path="/userPanel" element={<UserPanel />} />

          {/*  
          <Route path="logout" element={<Logout />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
