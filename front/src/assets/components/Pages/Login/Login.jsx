import React, { useRef } from "react";
import TextInput from "../../TextInput/TextInput";

import { useStore } from "../../../../store/Store";
import { LoginUser } from "../../../../utils/ENE_Api";
import {
  Link,
  useNavigate,
  useLocation,
  json,
  redirect,
} from "react-router-dom";

function Login() {
  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const loginHandler = async () => {
    let __email = email.current.value;
    let __password = password.current.value;

    LoginUser(__email, __password).then(async (res) => {
      try {
        // First, check if the response is ok (status 2xx)
        if (!res.ok) {
          if (res.status === 422 || res.status === 401) {
            alert("Invalid credentials provided.");
            return res; // Return the response for further handling, if needed.
          }

          // Handle other non-success cases
          alert(
            "An error occurred. Please check your credentials and try again."
          );
          throw new Error("Failed to authenticate user.");
        }

        // Parse the response data
        const resData = await res.json();

        // Check if the API returned a success status
        if (!resData?.status) {
          alert(resData?.message || "Authentication failed.");
          throw new Error(resData?.message || "Failed to authenticate user.");
        }

        // Extract token and save it
        const token = resData.token;
        localStorage.setItem("token", token);

        // Set expiration for the token (1 hour from now)
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem("expiration", expiration.toISOString());

        // Store additional user info in localStorage
        delete resData.msg; // Clean up response data if necessary
        localStorage.setItem("userInfo", JSON.stringify(resData));
        localStorage.setItem("userRole", resData.role);

        // Redirect user based on role
        if (resData.role === "user") {
          navigate("/userPanel");
        } else {
          console.log("going to admin");
          navigate("/tenderdashboard");
        }
      } catch (error) {
        // Handle any additional errors
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again later.");
      }
    });
  };

  return (
    <div>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="flex gap-5 flex-col rounded-2xl shadow-2xl p-10 w-96 border-r-2 border-t-2 border-primary">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold">Tender</h2>
            <h2 className="text-sm">Management System</h2>
          </div>
          {/* <br /> */}
          <h3 className="text-xl text-slate-500 font-bold">Signin</h3>
          <div id="login-form" className="flex flex-col gap-5">
            <TextInput placeholder=" Email/Username" type="email" ref={email} />
            <TextInput placeholder=" Password" type="password" ref={password} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ flexWrap: "wrap" }}>
                <Link to="/forgetPassword" className="btn btn-link p-0 m-0">
                  Forget Password?
                </Link>
              </label>
            </div>
            <button
              onClick={loginHandler}
              className="btn btn-primary text-white"
            >
              Login
            </button>
            <p id="error-message" style={{ color: "red" }}></p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ flexWrap: "wrap" }}>Don't have an account?</label>
            <label style={{ flexWrap: "wrap" }}>
              You can{" "}
              <Link to="/signup" className="btn btn-link p-0">
                Sign up
              </Link>{" "}
              to create an account
            </label>
          </div>

          {/* <label>© Alpha Engineering Pvt Ltd 2018-2025</label> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
