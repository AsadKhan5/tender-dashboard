import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Logout page visited!");
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userInfo");
    navigate("/");
  }, []);

  return <></>;
}
