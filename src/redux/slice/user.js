import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: 'a@a.com' ,
  data: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    adduser: (state, action) => {
      state.user = action.payload
    },
    adddata: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {
  adduser,
  adddata,
} = userSlice.actions;

export default userSlice.reducer;
