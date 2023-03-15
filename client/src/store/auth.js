import { createSlice } from "@reduxjs/toolkit";
import { client } from "@/utils/client";
import jwt_decode from "jwt-decode";
import { uid } from "uid";
const initialState = {
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    googleAuth: (state, action) => {
      const decode = jwt_decode(action.payload.credential);

      client
        .createIfNotExists({
          _id: decode.sub,
          _type: "user",
          userName: decode.name,
          subId: decode.sub,
          email: decode.email,
          buymentStory: [],
        })
        .then((res) => (state.user = res));
    },
    login: (state, action) => {
      const query = `*[_type == "user" && email == "${action.payload.email}"][0]`;
      client.fetch(query).then((res) => {
        if (res.password === action.payload.password) {
          console.log(res);
        } else {
          console.log("olmadi");
        }
      });
    },
    register: (state, action) => {
      const query = `*[_type == "user" && email == "${action.payload.email}"][0]`;
      client.fetch(query).then((res) => {
        if (res) {
          console.log("var yapaman");
        } else {
          const userId = uid();
          client
            .createIfNotExists({
              _id: userId,
              _type: "user",
              userName: action.payload.name,
              subId: userId,
              email: action.payload.email,
              password: action.payload.password,
              buymentStory: [],
            })
            .then((res) => (state.user = res));
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { googleAuth, login, register } = authSlice.actions;

export default authSlice.reducer;
