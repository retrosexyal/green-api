import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { DataStatus } from "../../constants/constants";

const initialState = {
  statusInstance: "",
  status: DataStatus.Loading,
  login: {
    id: "",
    token: "",
  },
};

export const fetchAuthData = createAsyncThunk(
  "authData/setAuthData",
  async (payload: { idInstance: string; apiTokenInstance: string }) => {
    const { idInstance, apiTokenInstance } = payload;

    const responce = await axios.get(
      `https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
    );
    const data = await responce.data;
    return data.stateInstance as string;
  }
);

const authData = createSlice({
  name: "authData",
  initialState,
  reducers: {
    setAuthData(
      state,
      action: PayloadAction<{
        id: string;
        token: string;
        status?: string;
      }>
    ) {
      state.login = action.payload;
      state.status = DataStatus.Loaded;
      if (action.payload.status === "") {
        state.statusInstance = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthData.pending, (state) => {
        state.status = DataStatus.Loading;
      })
      .addCase(
        fetchAuthData.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.statusInstance = action.payload;
          state.status = DataStatus.Loaded;
        }
      )
      .addCase(fetchAuthData.rejected, (state, action) => {
        state.status = DataStatus.Error;
      });
  },
});

export const { setAuthData } = authData.actions;

export const authReducer = authData.reducer;
