import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { getAuthToken, getTokenDuration } from "../../../utils/auth";

function AuthLayout() {
  const token = getAuthToken();
  // const submit = useSubmit();
  const navigation = useNavigate();
  useEffect(() => {
    if (!token || token === "EXPIRED") {
      navigation("/login");
      // return;
    } else {
      navigation("/tenderdashboard");
      // return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      navigation("/login");
    }, tokenDuration);
  }, [token]);

  return (
    <div className="layout-center">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
