import { create } from "zustand";
import { LoginUser, SignupUser } from "../utils/ENE_Api";

import { redirect } from "react-router-dom";

const Auth = (set, get) => ({
  isLoggedIn: false,
  login: async (username, password) => {
    console.log({ username, password });
    return await LoginUser(username, password)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log({ data });
        if (data?.msg === "success") {
          set({ isLoggedIn: true });
        }
        return data;
      })
      .catch((er) => {
        console.log(er);
        set({ isLoggedIn: false });
        return er;
      });
  },
  signup: async (username, password) => {
    await SignupUser(username, password).then((data) => {
      console.log(data);
    });
  },
});

export const useStore = create((...params) => ({
  ...Auth(...params),
  //   ...createCounterStore(...params),
}));
