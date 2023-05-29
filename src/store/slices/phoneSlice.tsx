import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  phone: "",
};

const phoneSlice = createSlice({
  name: "phone",
  initialState,
  reducers: {
    setPhone(state, action: PayloadAction<string>) {
      state.phone = action.payload;
    },
  },
});

export const { setPhone } = phoneSlice.actions;

export const phoneReducer = phoneSlice.reducer;
