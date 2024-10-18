import { postData, getData } from "./common";
import { getAuthToken } from "./auth";

const BASE_URL = "http://localhost:8000/";

export const LoginUser = async (email, password) => {
  try {
    return postData(`${BASE_URL}auth/login`, { email, password });
  } catch (er) {
    console.log("ENE_API [LOGIN]: ", er);
  }
};

export const SignupUser = async (userName, email, password, mobile) => {
  try {
    return postData(`${BASE_URL}auth/register`, {
      userName,
      email,
      password,
      mobile,
    });
  } catch (er) {
    console.log("ENE_API [REGISTER]: ", er);
  }
};

export const createNewTenderApi = async (
  name,
  description,
  startTime,
  endTime,
  bufferTime
) => {
  try {
    return postData(`${BASE_URL}tender/tenders-create`, {
      name,
      description,
      startTime,
      endTime,
      bufferTime,
    });
  } catch (error) {
    console.error("Error creating tender:", error);
    throw error; // Re-throwing the error to handle it elsewhere if needed
  }
};
