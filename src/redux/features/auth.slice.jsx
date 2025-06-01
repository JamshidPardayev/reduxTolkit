import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeName: (state) => {
      state.value = "Laylo";
    },
    deleteName: (state) => {
      state.value = "";
    },
  },
});
export const { changeName, deleteName } = authSlice.actions;
export default authSlice.reducer;
