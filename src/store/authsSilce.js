import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: {},
};
const authsSilce = createSlice({
  name: "auths",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state, action) => {
      state.status = false;
    },
  },
});

export const { login, logout } = authsSilce.actions;
export default authsSilce.reducer;
