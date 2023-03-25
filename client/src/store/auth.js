import { createSlice } from "@reduxjs/toolkit";
import { client } from "@/utils/client";
import jwt_decode from "jwt-decode";
import { uid } from "uid";

const initialUser =
  JSON.parse(localStorage.getItem("user")) === null
    ? {}
    : JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: initialUser,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    googleAuth: (state, action) => {
      const decode = jwt_decode(action.payload.credential);

      client.createIfNotExists({
        _id: decode.sub,
        _type: "user",
        userName: decode.name,
        subId: decode.sub,
        email: decode.email,
        buymentStory: [],
        basket: [],
      });

      const newUser = {
        userName: decode.name,
        email: decode.email,
        userId: decode.sub,
      };

      localStorage.setItem("user", JSON.stringify(newUser));
      state.user = newUser;
    },
    login: (state, action) => {
      if (action.payload.res.password === action.payload.password) {
        const newUser = {
          userName: action.payload.res.userName,
          email: action.payload.res.email,
          userId: action.payload.res.subId,
        };

        localStorage.setItem("user", JSON.stringify(newUser));
        state.user = newUser;
      }
    },
    register: (state, action) => {
      if (action.payload.res) {
      } else {
        const userId = uid();
        client.createIfNotExists({
          _id: userId,
          _type: "user",
          userName: action.payload.name,
          subId: userId,
          email: action.payload.email,
          password: action.payload.password,
          buymentStory: [],
          basket: [],
        });

        const newUser = {
          userName: action.payload.name,
          email: action.payload.email,
          userId: userId,
        };

        localStorage.setItem("user", JSON.stringify(newUser));
        state.user = newUser;
      }
    },
    logout: (state) => {
      state.user = {};
      localStorage.removeItem("user");
    },
  },
});

// Action creators are generated for each case reducer function
export const { googleAuth, login, register, logout } = authSlice.actions;

export default authSlice.reducer;
