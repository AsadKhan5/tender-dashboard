import React, { useRef } from "react";
import TextInput from "../TextInput/TextInput";
import { Link, useNavigate } from "react-router-dom";
import { SignupUser } from "../../../utils/ENE_Api";

function Signup() {
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const mobile = useRef();

  const navigate = useNavigate();

  const signupHandler = async () => {
    const __userName = userName.current.value;
    const __email = email.current.value;
    const __password = password.current.value;

    const __mobile = mobile.current.value;

    // Call the API to register the user
    SignupUser(__userName, __email, __password, __mobile).then(async (res) => {
      console.log(res);

      if (res.status === 422 || res.status === 401) {
        return res;
      }

      if (!res.ok) {
        throw new Error("Could not register user.");
      }

      const resData = await res.json();
      console.log(resData);
      alert(resData.message);

      // Handle token and user info storage
      const token = resData.token;
      localStorage.setItem("token", token);

      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1); // Setting 1 hour expiration for token
      localStorage.setItem("expiration", expiration.toISOString());

      // Store user info (if provided in the response)
      localStorage.setItem("userInfo", JSON.stringify(resData));
      if (resData.role == "admin") {
        navigate("/tenderdashboard");
      } else {
        navigate("/userPanel");
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
          <h3 className="text-xl text-slate-500 font-bold">Signup</h3>
          <div id="signup-form" className="flex flex-col gap-5">
            <TextInput placeholder="Username" type="text" ref={userName} />
            <TextInput placeholder="Email" type="email" ref={email} />
            <TextInput placeholder="Password" type="password" ref={password} />
            <TextInput placeholder="Mobile" type="tel" ref={mobile} />

            <button
              onClick={signupHandler}
              className="btn btn-primary text-white"
            >
              Sign Up
            </button>
            <p id="error-message" style={{ color: "red" }}></p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Already have an account?</label>
            <label>
              <Link to="/login" className="btn btn-link p-0">
                Login here
              </Link>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
