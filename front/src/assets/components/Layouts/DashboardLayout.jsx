import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { useStore } from "../../../store/Store";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { getAuthToken } from "../../../utils/auth";

function DashboardLayout() {
  // const { isLoggedIn } = useStore();

  const token = getAuthToken();
  const navigate = useNavigate();

  // const actionData = useActionData();

  useEffect(() => {
    console.log("[DASHBOARD LAYOUT] || isLoggedIn:" + token);
    if (!token || token === "EXPIRED") {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="flex w-full h-full bg-base-100">
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <div className="flex w-full">
            <div className="flex w-full">
              <Outlet />
            </div>
          </div>
        </div>

        <Sidebar />
      </div>
    </div>
  );
}

export default DashboardLayout;
