import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { DataStatus } from "../../constants/constants";
import { IReceiveNotification } from "../../interfaces/interfaces";
const initialState = {
  receiveNotification: undefined as undefined | IReceiveNotification,
  status: DataStatus.Loaded,
};

export const fetchGetData = createAsyncThunk(
  "getDat/setGetData",
  async (payload: { idInstance: string; apiTokenInstance: string }) => {
    const { idInstance, apiTokenInstance } = payload;
    const responce = await axios(
      `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
    );
    const data = await responce.data;
    return data as IReceiveNotification;
  }
);

const getData = createSlice({
  name: "getData",
  initialState,
  reducers: {
    setGetData(state, action: PayloadAction<IReceiveNotification>) {
      state.receiveNotification = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetData.pending, (state) => {
        state.status = DataStatus.Loading;
      })
      .addCase(
        fetchGetData.fulfilled,
        (state, action: PayloadAction<IReceiveNotification>) => {
          if (action.payload) {
            state.receiveNotification = action.payload;
          }
          state.status = DataStatus.Loaded;
        }
      )
      .addCase(fetchGetData.rejected, (state) => {
        state.status = DataStatus.Error;
      });
  },
});

export const { setGetData } = getData.actions;

export const getReducer = getData.reducer;
